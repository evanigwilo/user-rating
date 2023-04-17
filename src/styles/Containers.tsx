// Styled Component
import styled, { css, keyframes } from "styled-components";
//Styles
import { BackgroundCSS } from "./Background";
import { HoverCSS } from "./Interactions";
//Constants, Helpers & Types
import { RowType } from "../utils/types";

export const Flex = styled.div<{
  align?: "flex-start" | "flex-end" | "center";
  justify?:
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
  direction?: "column" | "column-reverse" | "row-reverse";
  wrap?: "wrap" | "wrap-reverse";
  width?: string;
  height?: string;
  margin?: string;
  padding?: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  position?: "absolute" | "sticky" | "static" | "fixed";
  index?: number;
  ratio?: number;
  opacity?: number | "dim";
  filter?: string;
  border?:
    | boolean
    | Partial<{
        width: string;
        radius: string;
      }>;
  disabled?: boolean;
  background?: boolean | "blurMin" | "blurMax" | "loading";
  cursor?: string;
  overflow?: "hidden" | "scroll";
  max?: Partial<{
    height: string;
    width: string;
  }>;
}>`
  display: flex;
  aspect-ratio: ${({ ratio }) => ratio};
  opacity: ${({ opacity, theme }) =>
    opacity === "dim" ? theme.opacity.dim : opacity};
  flex-wrap: ${({ wrap }) => wrap || "nowrap"};
  position: ${({ position }) => position || "relative"};
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  bottom: ${({ bottom }) => bottom};
  right: ${({ right }) => right};
  z-index: ${({ index }) => index || 0};
  flex-direction: ${({ direction }) => direction || "row"};
  align-items: ${({ align }) => align || "stretch"};
  justify-content: ${({ justify }) => justify || "flex-start"};
  width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height};
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
  overflow: ${({ overflow }) => overflow};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "unset")};
  cursor: ${({ cursor }) => (cursor ? cursor + " !important" : "default")};
  max-height: ${({ max }) => max?.height};
  max-width: ${({ max }) => max?.width};

  ${({ border, theme }) =>
    border &&
    css`
      border: ${border === true ? "0.25em" : border.width || "0.25em"} solid
        ${theme.color.transparentLight};
      border-radius: ${border === true ? "10px" : border.radius || "10px"};
    `}

  ${({ background }) =>
    background &&
    (background === "loading"
      ? css`
          background-color: ${({ theme }) => theme.color.loading};
        `
      : background === true
      ? css`
          --position: absolute;
          --attachment: local; /* use local for box-shadow to work well separate from background image */
          ${BackgroundCSS}
        `
      : css`
          backdrop-filter: ${({ theme }) =>
            background === "blurMax" ? theme.blur.max : theme.blur.min};
        `)}

  /* backdrop-filter didn't work on Mac Chrome unless with pseudo element */
  ${({ filter }) => {
    return (
      filter &&
      css`
        &::before {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          backdrop-filter: ${filter};
          z-index: -1;
          border-radius: inherit;
        }
      `
    );
  }}
`;

export const ToolTip = styled(Flex)<{
  badge?: string | number;
  tip?: string;
  tipPosition?: "top" | "bottom" | "left" | "right";
  tipOffset?: string;
  scale?: 1.1 | 1.05 | 1.03;
  badgeTipPadding?: string;
  ignoreMobile?: boolean;
  hover?: boolean;
}>`
  ${HoverCSS}
  --scale : ${({ scale }) => scale || 1};
  --tipOffset: ${({ tipOffset, border }) =>
    tipOffset || border ? "1em" : "0.5em"};
  --backgroundColor: ${({ hover, theme }) =>
    hover !== false && theme.color.transparentLight};
  //update the default hovering color from 'HoverCSS' above
  --hoverColor: var(--backgroundColor);
  --badgeTipPadding: ${({ badgeTipPadding }) =>
    badgeTipPadding || "0.25em 0.5em"};
  --blur: ${({ theme }) => theme.blur.mid};

  box-sizing: content-box;
  /* flex-direction: column; */
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  width: ${({ width }) => width || "unset"};

  ${({ border, padding }) =>
    border &&
    css`
      border-radius: ${border === true ? "50%" : border.radius};
      padding: ${padding || "6px"};
      border: ${`${
        border === true ? "2px" : border.width || "2px"
      } solid var(--backgroundColor)`};
      /* background-color: var(--backgroundColor); */
      /* margin-right: 0.5em; */
    `};

  ${({ badge }) =>
    badge !== undefined &&
    css`
      &:before {
        content: ${`"${badge}"`};
        position: absolute;
        padding: var(--badgeTipPadding);
        background-color: var(--backgroundColor);
        backdrop-filter: var(--blur);
        color: white;
        font-size: xx-small;
        border-radius: 10px;
        top: 0;
        transform: translate(75%, -80%);
      }
    `};

  ${({ tip, tipPosition, ignoreMobile }) => {
    if (!tip) {
      return;
    }

    const tipLocation =
      tipPosition === "left"
        ? css`
            right: 100%;
            margin-right: var(--tipOffset);
          `
        : tipPosition === "right"
        ? css`
            left: 100%;
            margin-left: var(--tipOffset);
          `
        : tipPosition === "top"
        ? css`
            top: 0;
            transform: translateY(calc(-100% - var(--tipOffset)));
          `
        : css`
            bottom: 0;
            transform: translateY(calc(100% + var(--tipOffset)));
          `;

    const style = css`
      &:hover:after {
        --opacity: 1;
        --pointer: unset;
      }
      &:after {
        --opacity: 0;
        --pointer: none;

        //list type display
        ${tip.includes("A") &&
        css`
          display: flex;
          justify-content: center;
          text-align-last: left;
          white-space: pre;
          align-items: center;
        `}
        transition: inherit;
        opacity: var(--opacity);
        pointer-events: var(--pointer);
        content: ${`"${tip}"`};
        position: absolute;
        background-color: ${({ theme }) => theme.color.transparentLight};
        backdrop-filter: var(--blur);
        color: white;
        font-size: xx-small;
        padding: var(--badgeTipPadding);
        border-radius: 10px;
        z-index: 2;
        ${tipLocation};
      }
    `;
    return ignoreMobile
      ? style
      : css`
          @media (min-width: 576px) {
            ${style}
          }
        `;
  }}
`;

export const Row = styled(Flex)<RowType>`
  ${({ hover }) =>
    hover &&
    css`
      ${HoverCSS};
      width: calc(100% / 1.02);
      align-self: center;
    `}

  --rowBackground: ${({ theme }) => theme.color.transparentLight};
  background: ${({ highlight }) => highlight && "var(--rowBackground)"};
  ${({ backgroundLoading }) => {
    if (!backgroundLoading) {
      return;
    }
    const animBackground = keyframes`
      0% {
        background: rgb(255 255 255 / 5%);
      }
      100% {
        background: var(--rowBackground);
      }
      `;

    return css`
      animation: ${animBackground};
      animation-iteration-count: infinite;
      animation-direction: alternate;
      animation-duration: 1s;
    `;
  }}
`;
