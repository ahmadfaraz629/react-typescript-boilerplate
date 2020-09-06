import React, { useEffect, Suspense } from "react";
import map from "lodash/map";
import find from "lodash/find";
import each from "lodash/each";
import replace from "lodash/replace";
import { Route, Switch, Redirect } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { CloseButton, Fade } from "components/common/Toast";
import { IPrivateRoute } from "routes/types";
import PrivateRoute from "routes/PrivateRoute";
import loadable from "@loadable/component";
const LandingRoutes = loadable(() => import("pages/Landing"));
// const AuthRoutes = loadable(() => import('pages/Auth'));

const RoutesHOC = (routes: any, DEFAULT_PATH: any) => {
  return function Component() {
    useEffect(() => {
      LandingRoutes.preload();
    }, []);

    return (
      <Suspense fallback={<div />}>
        <Switch>
          {map(routes, (route) => {
            if (route.isPrivate) {
              return (
                <PrivateRoute
                  key={route.title}
                  title={route.title}
                  path={route.path}
                  component={route.component}
                  defaultPath={DEFAULT_PATH}
                />
              );
            }
            return (
              <Route
                key={route.title}
                title={route.title}
                path={route.path}
                component={route.component}
              />
            );
          })}
          <Redirect to="/auth/login" />
        </Switch>
        <ToastContainer
          transition={Fade}
          closeButton={<CloseButton />}
          position={toast.POSITION.BOTTOM_LEFT}
        />
      </Suspense>
    );
  };
};

export const dashboardRoutes = {};

export const routes = {
  // AUTH: {
  //   path: "/auth",
  //   title: "Login",
  //   component: AuthRoutes,
  //   isPrivate: false,
  // },
  LANDING: {
    path: "/",
    title: "Kinetic MarketPlace",
    component: LandingRoutes,
    isPrivate: false,
  },
};

const AppRoutes = RoutesHOC(routes, "/");
export default AppRoutes;

export const DEFAULT_PATH = "auth/login";
export const USER_LANDING_PAGE = "/";

export const getTitleByPath = (path: string) => {
  const route = find(routes, (route: IPrivateRoute) => route.path === path);
  return route && route.title ? route.title : "";
};

export const createRoute = (url: string, params = {}): string => {
  each(params, (val: string, key: string) => {
    val = Array.isArray(val) ? val.join(",") : val;
    url = replace(url, new RegExp(`:${key}`, "g"), val);
  });
  return url;
};

export const isLandingPage = (history: any) => {
  const { pathname } = history.location;
  if (pathname) {
    const path = find(dashboardRoutes, (route) => route.path === pathname);
    return path === USER_LANDING_PAGE || typeof path === "undefined";
  }
  return true;
};
