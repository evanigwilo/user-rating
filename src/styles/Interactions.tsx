// Styled Component
import { css } from "styled-components";

export const HoverCSS = css`
  --duration: 0.05s;
  --hoverColor: ${({ theme }) => theme.color.transparentLight};
  transition: opacity var(--duration) ease-out,
    transform var(--duration) ease-out,
    background-color var(--duration) ease-out;
  cursor: pointer;

  ${() => {
    const hover = css`
      &,
      span:not(.color-keep) {
        color: white !important;
      }
      svg,
      .hover-opacity {
        opacity: 1 !important;
      }
      transform: scale(var(--scale)) !important;
      background-color: var(--hoverColor) !important;
    `;

    return css`
      &:hover {
        ${hover};
      }
      &:hover:active {
        transform: scale(1) !important;
      }
      /* mobile */
      @media (max-width: 575px) {
        &:active {
          ${hover};
        }
      }
    `;
  }}
`;
