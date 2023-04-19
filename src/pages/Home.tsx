// React
import { useState, useLayoutEffect } from "react";
// Polkadot
import { ApiPromise } from "@polkadot/api";
import { KeyringInstance } from "@polkadot/keyring/types";
import { HexString } from "@polkadot/util/types";
// Components
import Candidate from "../components/Candidate";
import Header from "../components/Header";
import { Spinner } from "../components/Loader";
// Services
import {
  accountsToHex,
  addCandidate,
  connectAPI,
  getCandidates,
} from "../services/polkadot";
// Styles
import { Flex } from "../styles/Containers";
import { Text } from "../styles/Text";
// Constants, Helpers & Types
import { Candidates } from "../utils/types";
import { rateCandidates } from "../utils/constants";

const Home = () => {
  const [candidates, setCandidates] = useState<Candidates | null>(null);
  const [account, setAccount] = useState<HexString | undefined>();
  const [requestAPI, setRequestAPI] = useState<ApiPromise | undefined>();
  const [keyring, setKeyring] = useState<KeyringInstance | undefined>();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");

  useLayoutEffect(() => {
    //  console.error = () => {};
    return () => {
      console.log("Disconnecting API");
      requestAPI?.disconnect();
    };
  }, []);

  useLayoutEffect(() => {
    setLoading(true);

    if (account && requestAPI) {
      getCandidates(requestAPI).then((candidates) => {
        setCandidates(candidates);
        setLoading(false);
      });
    } else {
      setStatus("Connecting to API...");
      connectAPI().then(async ({ api, keyring }) => {
        //  add candidates to vote
        for (let i = 0, count = rateCandidates.length; i < count; i++) {
          const candidate = rateCandidates[i];
          const status = `Adding candidate ${candidate} (${i + 1} of ${count})`;
          setStatus(status);
          await addCandidate(
            api,
            keyring.createFromUri(`//${candidate}`),
            (value) => {
              setStatus(`${status}\n${value}`);
            }
          );
        }

        const candidates = await getCandidates(api);
        setCandidates(candidates);
        setAccount(accountsToHex.Charlie);
        setRequestAPI(api);
        setKeyring(keyring);
        setLoading(false);
      });
    }
  }, [account]);

  return (
    <>
      <Header
        accountState={{
          account,
          setAccount,
        }}
      />
      <Flex
        width="50%"
        align="center"
        justify="center"
        direction="column"
        margin="auto"
      >
        {loading ? (
          <>
            <Spinner />
            <Text padding="1em">{status}</Text>
          </>
        ) : (
          <>
            {Object.keys(candidates!).map((candidate, index) => (
              <Candidate
                key={index}
                candidate={candidate as HexString}
                account={account!}
                requestAPI={requestAPI!}
                keyring={keyring!}
                votes={candidates![candidate as HexString]}
              />
            ))}
          </>
        )}
      </Flex>
    </>
  );
};

export default Home;
