// Styled Component
import styled from "styled-components";
// Icons
import { ArrowRepeat } from "@styled-icons/bootstrap/ArrowRepeat";
// Styles
import { IconCSS } from "../styles/Icon";
// Constants, Helpers & Types
import { Spacing } from "../utils/types";

export const ArrowRepeatIcon = styled(ArrowRepeat)<Spacing>`
  ${IconCSS};
  --dimension: 1.5em;
`;
