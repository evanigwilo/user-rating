/*
  https://loading.io/css/
*/

// Styled Component
import styled, { keyframes } from "styled-components";

const animOpacitySpinner = keyframes`
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  `;

const LoadSpinner = styled.div`
  cursor: progress;
  color: white;
  display: inline-block;
  position: relative;
  /* transform: scale(0.25); */
  --dimension: 1.5em;
  --velocity: 0.5;
  --origin: calc(var(--dimension) / 2);
  width: var(--dimension);
  height: var(--dimension);

  div {
    transform-origin: var(--origin) var(--origin);
    animation: ${animOpacitySpinner} calc(1.2s * var(--velocity)) infinite;
  }
  div:after {
    content: " ";
    display: block;
    position: absolute;
    top: calc(var(--dimension) * 3 / 80);
    left: calc(var(--dimension) * 37 / 80);
    width: calc(var(--dimension) * 6 / 80);
    height: calc(var(--dimension) * 18 / 80);
    border-radius: 20%;
    background: #fff;
  }
  div:nth-child(1) {
    transform: rotate(0deg);
    animation-delay: calc(-1.1s * var(--velocity));
  }
  div:nth-child(2) {
    transform: rotate(30deg);
    animation-delay: calc(-1s * var(--velocity));
  }
  div:nth-child(3) {
    transform: rotate(60deg);
    animation-delay: calc(-0.9s * var(--velocity));
  }
  div:nth-child(4) {
    transform: rotate(90deg);
    animation-delay: calc(-0.8s * var(--velocity));
  }
  div:nth-child(5) {
    transform: rotate(120deg);
    animation-delay: calc(-0.7s * var(--velocity));
  }
  div:nth-child(6) {
    transform: rotate(150deg);
    animation-delay: calc(-0.6s * var(--velocity));
  }
  div:nth-child(7) {
    transform: rotate(180deg);
    animation-delay: calc(-0.5s * var(--velocity));
  }
  div:nth-child(8) {
    transform: rotate(210deg);
    animation-delay: calc(-0.4s * var(--velocity));
  }
  div:nth-child(9) {
    transform: rotate(240deg);
    animation-delay: calc(-0.3s * var(--velocity));
  }
  div:nth-child(10) {
    transform: rotate(270deg);
    animation-delay: calc(-0.2s * var(--velocity));
  }
  div:nth-child(11) {
    transform: rotate(300deg);
    animation-delay: calc(-0.1s * var(--velocity));
  }
  div:nth-child(12) {
    transform: rotate(330deg);
    animation-delay: 0s;
  }
`;

export const Spinner = () => (
  <LoadSpinner>
    {Array.from({ length: 12 }).map((_, index) => (
      <div key={index}></div>
    ))}
  </LoadSpinner>
);
