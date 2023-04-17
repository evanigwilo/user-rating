// React
import { useLayoutEffect, useRef, useCallback } from "react";
// Polkadot
import { HexString } from "@polkadot/util/types";
// Styled Component
import { useTheme } from "styled-components";
// Services
import { hexToAccount } from "../services/polkadot";
// Styles
import { Flex, ToolTip } from "../styles/Containers";
import { Text } from "../styles/Text";
// Icons
import { ArrowRepeatIcon } from "./Icons";
// Components
import { Spinner } from "./Loader";
// Constants, Helpers & Types
import { updateProperty, updateStyle } from "../utils/helpers";

const Header = ({
  accountState,
}: {
  accountState: {
    account?: HexString;
    setAccount: React.Dispatch<React.SetStateAction<HexString | undefined>>;
  };
}) => {
  const theme = useTheme();
  const header = useRef<HTMLDivElement | null>(null);
  const accountsContainer = useRef<HTMLDivElement | null>(null);
  const accountSelected = useRef(-1);

  useLayoutEffect(() => {
    toggleAccountSelector(true);

    updateProperty(accountsContainer.current, {
      "transform-origin": "top",
      "pointer-events": "var(--pointer)",
      transform: "perspective(20cm) rotateX(var(--angle))",
      transition: "transform 0.25s linear 0.25s",
    });

    const accountNodes = accountsContainer.current?.childNodes;

    if (accountSelected.current >= 0) {
      updateStyle(accountNodes?.[accountSelected.current], {
        backgroundColor: "var(--hoverColor)",
      });
    } else if (accountState.account) {
      const account = hexToAccount[accountState.account];
      accountNodes?.forEach((child, index) => {
        if (child.textContent === account) {
          accountSelected.current = index;
          updateStyle(child, {
            backgroundColor: "var(--hoverColor)",
          });
          return;
        }
      });
    }
  }, [accountState.account]);

  const toggleAccountSelector = useCallback(
    (reset = false) => {
      const selector = accountsContainer.current;
      const angle = selector?.style.getPropertyValue("--angle");
      const is90deg = reset ? false : angle === "90deg";
      updateProperty(selector, {
        "--angle": is90deg ? "0deg" : "90deg",
        "--pointer": is90deg ? "unset" : "none",
      });
    },
    [accountState.account]
  );

  return (
    <Flex
      index={2}
      ref={header}
      align="center"
      justify="space-between"
      padding="1em 2em"
    >
      <Text transform="uppercase" font="1.5em">
        Rate Users
      </Text>
      {!accountState.account ? (
        <Spinner />
      ) : (
        <Flex width="unset" align="center">
          <ToolTip hover={false} onClick={() => toggleAccountSelector()}>
            <ArrowRepeatIcon />
            <Text transform="capitalize" padding="0.5em" preserve>
              {`Switch account [${
                hexToAccount[accountState.account as HexString]
              }]`}
            </Text>
          </ToolTip>
          <Flex
            ref={accountsContainer}
            border
            overflow="hidden"
            direction="column"
            position="absolute"
            top="100%"
            filter={theme.blur.min}
          >
            {Object.keys(hexToAccount).map((hex, index) => (
              <ToolTip
                key={index}
                onBlur={() => toggleAccountSelector()}
                onClick={() => {
                  const selector = accountsContainer.current;

                  updateStyle(selector?.childNodes[accountSelected.current], {
                    backgroundColor: "",
                  });

                  updateStyle(selector?.childNodes[index], {
                    backgroundColor: "var(--hoverColor)",
                  });

                  accountSelected.current = index;

                  accountState.setAccount(hex as HexString);

                  toggleAccountSelector();
                }}
              >
                <Text transform="capitalize" padding="0.5em 0">
                  {hexToAccount[hex as HexString]}
                </Text>
              </ToolTip>
            ))}
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};
export default Header;
