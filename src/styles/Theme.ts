const dim = 0.65;

// Theming
const theme = {
  spacing: {
    top: (value: string) => `${value} 0 0 0`,
    right: (value: string) => `0 ${value} 0 0`,
    bottom: (value: string) => `0 0 ${value} 0`,
    left: (value: string) => `0 0 0 ${value}`,
  },
  color: {
    transparentLight: "rgb(255 255 255 / 10%)",
    scrollTrack: "rgb(66 80 102)",
    scrollThumb: "rgb(164 175 191 / 0.56)",
    loading: `rgba(0, 0, 0, ${dim})`,
    textColor: "hsl(210deg 15% 70%)",
  },
  blur: {
    min: "blur(10px)",
    mid: "blur(7px)",
    max: "blur(40px)",
  },
  opacity: {
    dim,
  },
  sizing: {
    icon: "16px",
  },
  // transition,
};

export default theme;
