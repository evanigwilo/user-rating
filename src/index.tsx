// React
import React from "react";
import ReactDOM from "react-dom";
// Styled Component
import { ThemeProvider } from "styled-components";
// Components
import App from "./App";
// Styles
import GlobalStyle from "./styles/GlobalStyle";
import theme from "./styles/Theme";
// Performance
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
