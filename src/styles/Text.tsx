// Styled Component
import styled, { css } from "styled-components";
// Styles
import { HoverCSS } from "./Interactions";

export const Text = styled.span<{
  hide?: boolean;
  dim?: boolean;
  paragraph?: boolean;
  margin?: string;
  padding?: string;
  font?: string;
  color?: string;
  bold?: boolean;
  transform?: "uppercase" | "lowercase" | "capitalize";
  align?: "center" | "right";
  preserve?: boolean;
  hover?: boolean;
  border?:
    | boolean
    | Partial<{
        width: string;
        radius: string;
      }>;
}>`
  color: ${({ dim, theme, color }) =>
    dim ? theme.color.textColor : color || "white"};
  text-align: ${({ align }) => align};
  white-space: ${({ preserve }) => (preserve ? "pre" : "pre-line")};
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
  display: ${({ paragraph }) => paragraph && "block"};
  font-size: ${({ font }) => font};
  font-weight: ${({ bold }) => bold && "bold"};
  /* vertical-align: middle; */
  text-transform: ${({ transform }) => transform};
  overflow-wrap: break-word;
  transition: inherit;

  ${({ border, theme }) =>
    border &&
    css`
      border: ${border === true ? "0.25em" : border.width} solid
        ${theme.color.transparentLight};
      border-radius: ${border === true ? "10px" : border.radius};
    `}

  ${({ hover }) =>
    hover &&
    css`
      ${HoverCSS};
      --hoverColor: none;
    `};

  /* mobile */
  @media (max-width: 575px) {
    display: ${({ hide }) => hide && "none"};
  }
`;
