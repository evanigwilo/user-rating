// React
import { useRef, useState } from "react";
// Polkadot
import { HexString } from "@polkadot/util/types";
import { ApiPromise } from "@polkadot/api";
import { KeyringInstance } from "@polkadot/keyring/types";
// Styled Component
import { useTheme } from "styled-components";
// Styles
import { Text } from "../styles/Text";
import { Flex, Row } from "../styles/Containers";
// Components
import RateButton from "./RateButton";
// Services
import { hexToAccount, rateUser } from "../services/polkadot";

const Candidate = ({
  candidate,
  account,
  votes,
  keyring,
  requestAPI,
}: {
  candidate: HexString;
  account: HexString;
  votes: HexString[];
  requestAPI: ApiPromise;
  keyring: KeyringInstance;
}) => {
  const theme = useTheme();
  const [ratings, setRatings] = useState(votes);
  const status = useRef<HTMLSpanElement | null>(null);

  return (
    <Row
      margin={theme.spacing.top("1em")}
      align="center"
      padding="1em"
      border={{
        radius: "1em",
        width: "0",
      }}
      highlight
    >
      <Flex direction="column" padding="0 0.5em" overflow="hidden">
        <Flex align="center" justify="space-between">
          <Flex
            direction="column"
            margin={theme.spacing.right("1em")}
            overflow="hidden"
          >
            <Flex align="center">
              <Text padding="0.25em 0" margin={theme.spacing.right("auto")}>
                {hexToAccount[candidate]}
              </Text>
            </Flex>

            <Text dim padding="0.25em 0" font="small">
              {"Total Ratings: " + ratings.length}
            </Text>
          </Flex>
          <RateButton
            initial={ratings.includes(account) ? "Rated" : "Rate"}
            callback={async () => {
              // create keypaair
              const authorizer = keyring.createFromUri(
                `//${hexToAccount[account]}`
              );
              const user = keyring.createFromUri(
                `//${hexToAccount[candidate]}`
              );
              const element = status.current!;
              element.textContent = "";
              element.style.color = "";
              element.style.textShadow = "";
              element.style.padding = "1em 0";
              try {
                // authorizer rates user
                await rateUser(requestAPI, authorizer, user, (value) => {
                  element.textContent = `${value}`;
                });
                setRatings([...ratings, account]);
                return true;
              } catch (error) {
                element.style.color = "rgb(255 128 128)";
                element.style.textShadow = "0px 0px 1px black";
                element.textContent = `🚫 ${error}`;
                return false;
              }
            }}
            properties={{
              container: {
                position: "absolute",
                right: "0",
              },
            }}
          />
        </Flex>
        {ratings.map((user, index) => (
          <Text
            key={index}
            dim
            font="small"
            padding={theme.spacing.left("0.5em")}
          >
            {hexToAccount[user]}
          </Text>
        ))}
        <Text ref={status} font="smaller"></Text>
      </Flex>
    </Row>
  );
};

export default Candidate;
