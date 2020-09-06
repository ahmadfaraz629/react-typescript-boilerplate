import each from 'lodash/each';
import replace from 'lodash/replace';
import { API_BASE_PATH } from 'config';

const ROUTES_OBJ = {
  login: `${API_BASE_PATH}/token/`,
  signup: `${API_BASE_PATH}/signup/`,
  forgotPassword: `${API_BASE_PATH}/password/reset/`,
  resetPassword: `${API_BASE_PATH}/password/reset/confirm/`,
  resetPasswordTokenCheck: `${API_BASE_PATH}/password/change/`,
  test: `${API_BASE_PATH}/test/`
};

export type ROUTES = keyof typeof ROUTES_OBJ;
/**
 * getRoute creates the URL through provided routeName & params arguments
 * @param  {string} routeName   any object name of ROUTES_OBJ e.g. login
 * @param  {Object} [params={}] param values replace with strings present <...>.
 * @return {string}             URL
 */
const getRoute = (routeName: ROUTES, params = {}): string => {
  let url: string = ROUTES_OBJ[routeName];
  each(params, (val: string, key: string) => {
    val = Array.isArray(val) ? val.join(',') : val;
    url = replace(url, new RegExp(`<${key}>`, 'g'), val);
  });
  return url;
};

export default getRoute;
