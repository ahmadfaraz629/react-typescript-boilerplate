import { hot } from "react-hot-loader";

export default (_module, Component) => {
  return process.env.NODE_ENV === "development"
    ? hot(_module)(Component)
    : Component;
};
