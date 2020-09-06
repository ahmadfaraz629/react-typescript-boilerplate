import React from "react";
import { Route, Switch } from "react-router-dom";
import { Landing } from "components/Landing";

interface ILandingProps {
  match: {
    url: String;
  };
}

const LandingRoutes = ({ match: { url } }: ILandingProps) => (
  <Switch>
    <Route path={`${url}/`} exact component={Landing} />
  </Switch>
);

export default LandingRoutes;
