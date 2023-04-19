// Styled Component
import { createGlobalStyle, css } from "styled-components";
// Styles
import { BackgroundCSS } from "./Background";

const scrollbarStyle = css`
  body {
    ::-webkit-scrollbar-track {
      border-radius: unset;
    }
  }
  ::-webkit-scrollbar {
    width: 1em;
  }
  /* Track */
  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.color.scrollTrack};
    box-shadow: ${({ theme }) =>
      `inset 0 0 1px 1px ${theme.color.transparentLight}`};
    border-radius: 10px;
    /* cursor:pointer; */
  }
  /* Handle */
  ::-webkit-scrollbar-thumb {
    /* transition: background 0.5s; */
    background: ${({ theme }) => theme.color.scrollThumb};
    border-radius: 10px;
  }
  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: rgb(164 175 191 / 1);
  }
`;

const fontSizes = css`
  /* 
    X-Small devices (portrait phones, less than 576px)
    No media query for 'xs' since this is the default in Bootstrap
  */
  @media screen and (max-width: 575px) {
    body {
      font-size: 0.8em !important;
    }
  }
  /* 
    Small devices (landscape phones, 576px and up)
  */
  @media screen and (min-width: 576px) and (max-width: 767px) {
    body {
      font-size: 0.9em !important;
    }
  }
  /* 
    Medium devices (tablets, 768px and up)
  */
  @media screen and (min-width: 768px) and (max-width: 991px) {
    body {
      font-size: 1em !important;
    }
  }
  /* 
    Large devices (desktops, 992px and up)
  */
  @media screen and (min-width: 992px) and (max-width: 1200px) {
    body {
      font-size: 1.1em !important;
    }
  }
  /* 
    X-Large devices (large desktops, 1200px and up)
  */
  @media screen and (min-width: 1201px) and (max-width: 1400px) {
    body {
      font-size: 1.2em !important;
    }
  }
  /* 
    XX-Large devices (larger desktops, 1400px and up)
  */
  @media screen and (min-width: 1401px) {
    body {
      font-size: 1.3em !important;
    }
  }
`;

export default createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    overflow-x: hidden;
    font-family: 'Oxygen', sans-serif;
    max-width: 1000px;
    margin: auto;
    background-color: ${({ theme }) => theme.color.scrollTrack};
    // set variables for 'BackgroundCSS' below
    --position: fixed;
    --attachment: fixed;
    ${BackgroundCSS}
  }

  input, textarea {
    font-size: inherit;
    font-family: inherit;
  }

  ${scrollbarStyle}

  ${fontSizes}
`;
