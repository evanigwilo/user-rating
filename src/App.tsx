// React
import { useLayoutEffect } from "react";
// Pages
import Home from "./pages/Home";

const App = () => {
  useLayoutEffect(() => {
    document.title = "Rate Users";
  }, []);

  return <Home />;
};

export default App;
