// Polkadot
import { ApiPromise, WsProvider } from "@polkadot/api";
import { SubmittableExtrinsic } from "@polkadot/api/types";
import { Raw } from "@polkadot/types-codec";
import { Keyring } from "@polkadot/keyring";
import { KeyringPair } from "@polkadot/keyring/types";
import { u8aToHex } from "@polkadot/util";
import { HexString } from "@polkadot/util/types";
import { decodeAddress } from "@polkadot/util-crypto";
// Constants, Helpers & Types
import { AccountType, Candidates } from "../utils/types";
import { devAccounts, rateCandidates } from "../utils/constants";

// account to address hex mapper
export const hexToAccount: Record<HexString, AccountType> = {};
export const accountsToHex: Partial<Record<AccountType, HexString>> = {};

export const connectAPI = async () => {
  // Initialize the provider to connect to the local node
  const provider = new WsProvider("ws://127.0.0.1:9944");

  // Create the API and wait until ready
  const api = await ApiPromise.create({
    provider,
  });

  // Retrieve the chain & node information information via rpc calls
  const [chain, nodeName, nodeVersion] = await Promise.all([
    api.rpc.system.chain(),
    api.rpc.system.name(),
    api.rpc.system.version(),
  ]);

  // Create a keyring instance
  const keyring = new Keyring({ type: "sr25519" });

  devAccounts.forEach((account) => {
    const keyPair = keyring.createFromUri(`//${account}`);
    // convert to account address to hex
    const hex = u8aToHex(decodeAddress(keyPair.address));
    hexToAccount[hex] = account;
    accountsToHex[account] = hex;
  });

  console.log(
    `You are connected to chain ${chain} using ${nodeName} v${nodeVersion}`
  );

  return { api, keyring };
};

const submitTransaction = (
  authorizer: KeyringPair,
  transaction: SubmittableExtrinsic<"promise">,
  callback?: (status: string) => void
) =>
  new Promise<void>(async (resolve, reject) => {
    try {
      const unsubscribe = await transaction.signAndSend(
        authorizer,
        ({ events = [], status }) => {
          // console.log(`\nCurrent status is ${status}`);

          if (status.isInBlock) {
            callback?.(
              `Transaction included at blockHash: ${status.asInBlock}`
            );
          } else if (status.isFinalized) {
            callback?.(
              `Transaction finalized at blockHash: ${status.asFinalized}`
            );
            unsubscribe();
            resolve();
          }

          /*
            console.log("Status of transfer: " + status.type);

            events.forEach(({ phase, event: { data, method, section } }) => {
              callback?.(
                "Event: " +
                  phase.toString() +
                  " : " +
                  section +
                  "." +
                  method +
                  " " +
                  data.toString()
              );
            });
        */
        }
      );
    } catch (error) {
      reject(error);
    }
  });

// Gets ratings for a user
export const getRatings = async (api: ApiPromise, user: HexString | string) => {
  const query = (await api.query.phragmenElection.voting(
    user
  )) as unknown as Record<string, Array<Raw>>;
  const ratings = query.votes.map((value) => value.toHex());
  return ratings;
};

// Gets users and their ratings
export const getCandidates = async (api: ApiPromise) => {
  const candidates =
    (await api.query.phragmenElection.candidates()) as unknown as Array<Raw[]>;
  const result: Candidates = {};

  for (const candidate of candidates) {
    const candidateToHex = candidate[0].toHex();
    result[candidateToHex] = [];
  }

  for (const account in hexToAccount) {
    const ratings = await getRatings(api, account as HexString);

    // console.log({ [hexToAccount[ratedBy]]: query.votes.map(value => hexToAccount[value.toHex()]) });
    ratings.forEach((candidate) => {
      result[candidate].push(account as HexString);
    });
  }

  return result;
};

// Adds a user for ratting
export const addCandidate = async (
  api: ApiPromise,
  authorizer: KeyringPair,
  callback: (status: string) => void
) => {
  const candidates =
    (await api.query.phragmenElection.candidates()) as unknown as Array<Raw[]>;

  if (candidates.length === rateCandidates.length) {
    return;
  }

  const transaction = api.tx.phragmenElection.submitCandidacy(
    candidates.length
  );

  await submitTransaction(authorizer, transaction, callback);
};

// Rates a uses
export const rateUser = async (
  api: ApiPromise,
  authorizer: KeyringPair,
  user: KeyringPair,
  callback: (status: string) => void
) => {
  const authorizerHex = u8aToHex(decodeAddress(authorizer.address));
  const userHex = u8aToHex(decodeAddress(user.address));

  const ratings = await getRatings(api, authorizerHex);
  for (const rate of ratings) {
    if (rate === userHex) {
      callback(
        `${hexToAccount[userHex]} already rated by ${hexToAccount[authorizerHex]}!`
      );
      return;
    }
  }
  ratings.push(userHex);

  await submitTransaction(
    authorizer,
    api.tx.phragmenElection.vote(ratings, 10 ** 14),
    callback
  );

  callback(
    `${hexToAccount[authorizerHex]} rated ${hexToAccount[userHex]} successfully!`
  );
};
