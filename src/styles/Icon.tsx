// Styled Component
import { css } from "styled-components";
// Constants, Helpers & Types
import { Spacing } from "../utils/types";

export const IconCSS = css<Spacing>`
  fill: white;
  opacity: ${({ theme }) => theme.opacity.dim};
  --dimension: ${({ theme }) => theme.sizing.icon};
  width: var(--dimension);
  height: var(--dimension);
  overflow: unset;
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
`;
