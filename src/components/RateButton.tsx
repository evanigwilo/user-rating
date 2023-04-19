// React
import { useRef, useState } from "react";
// Styled Component
import { useTheme } from "styled-components";
// Styles
import { Text } from "../styles/Text";
import { Flex, ToolTip } from "../styles/Containers";
// Components
import { Spinner } from "./Loader";

const RateButton = ({
  initial, // initial value
  callback,
  properties, // styles update
}: {
  initial: "Rated" | "Rate";
  callback: () => Promise<boolean>;
  properties?: Partial<{
    container: typeof Flex.defaultProps;
    text: typeof Text.defaultProps;
  }>;
}) => {
  const theme = useTheme();
  const text = useRef<HTMLSpanElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(initial);

  return loading ? (
    <Flex width="unset" {...properties?.container}>
      <Spinner />
    </Flex>
  ) : (
    <ToolTip
      padding="0.5em"
      border={{
        radius: "0.75em",
        width: "0.125em",
      }}
      disabled={value === "Rated"}
      scale={1.03}
      filter={theme.blur.min}
      onMouseEnter={() => {
        if (value === "Rate") {
          const element = text.current;
          if (element) {
            element.textContent = "Rate?";
          }
        }
      }}
      onMouseLeave={() => {
        const element = text.current;
        if (element) {
          element.textContent = value;
        }
      }}
      onClick={async () => {
        if (value === "Rate") {
          setLoading(true);
          const result = await callback();
          setLoading(false);

          // rated successfully
          result && setValue("Rated");
        }
      }}
      {...properties?.container}
    >
      <Text ref={text} dim font="smaller" {...properties?.text}>
        {value}
      </Text>
    </ToolTip>
  );
};

export default RateButton;
