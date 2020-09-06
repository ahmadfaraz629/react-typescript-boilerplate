import axios from 'axios';
import isFunction from 'lodash/isFunction';
import size from 'lodash/size';
import { LOGOUT_ON_API_401 } from 'config';
import getRoute from 'api/apiRoutes';
import { IError } from 'api/types';
// import { getRefreshToken } from 'utils/user';

const initVal = {
  _cancelToken: null
};

class API {
  _cancelToken: any = initVal._cancelToken;

  requestTokens: any = {};
  CancelToken: any = axios.CancelToken;
  failedResponse = (error: IError, callback?: Function): Promise<any> => {
    if (LOGOUT_ON_API_401 && error.response && error.response.status && error.response.status === 401) {
    }
    const data = error.response && error.response.data ? error.response.data : {};
    if (callback && isFunction(callback)) {
      callback(data);
    }
    return Promise.reject(data);
  };

  fetch = (route: string, callback?: Function, config?: Record<string, any>): Promise<any> => {
    let axiosConfig = {};
    if (!route) {
      return Promise.reject();
    }
    if (config && size(config) > 0) {
      axiosConfig = {
        ...config
      };
    }

    return axios
      .get(route, { ...axiosConfig })
      .then(response => {
        this._cancelToken = initVal._cancelToken;
        if (callback && isFunction(callback)) {
          callback(response.data);
        }
        return response.data;
      })
      .catch(error => {
        if (axios.isCancel(error)) {
          console.log('Request canceled', error);
        }
        return this.failedResponse(error, callback);
      });
  };

  postRequest = (route: string, data = {}, callback?: Function): Promise<any> => {
    this.requestTokens[route] = this.CancelToken.source();
    const config: any = { cancelToken: this.requestTokens[route].token };
    return axios
      .post(route, data, config)
      .then(response => {
        if (callback && isFunction(callback)) {
          callback(response.data);
        }
        return response.data;
      })
      .catch(error => {
        return this.failedResponse(error, callback);
      });
  };

  patchRequest = (route: string, data: any, callback?: Function): Promise<any> => {
    return axios
      .patch(route, data)
      .then(response => {
        if (callback && isFunction(callback)) {
          callback(response.data);
        }
        return response.data;
      })
      .catch(error => {
        return this.failedResponse(error, callback);
      });
  };
  putRequest = (route: string, data = {}, config?: any, callback?: Function): Promise<any> => {
    return axios
      .put(route, data, config)
      .then(response => {
        if (callback && isFunction(callback)) {
          callback(response.data);
        }
        return response.data;
      })
      .catch(error => {
        return this.failedResponse(error, callback);
      });
  };

  deleteRequest = (route: string, callback?: Function) => {
    return axios
      .delete(route)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        return this.failedResponse(error, callback);
      });
  };

  cancelRequest = (type: string) => {
    const route = getRoute(type as any);
    if (this.requestTokens[route]) this.requestTokens[route].cancel();
  };

  login = (email: string, password: string): Promise<any> => {
    const route = getRoute('login');
    return this.postRequest(route, { email, password });
  };

  signup = (user: { email: string; password: string }): Promise<any> => {
    const route = getRoute('signup');
    return this.postRequest(route, { ...user });
  };

  forgotPassword = (email: string): Promise<any> => {
    const route = getRoute('forgotPassword');
    return this.postRequest(route, { email });
  };

  resetPassword = (password: string, token: string): Promise<any> => {
    const route = getRoute('resetPassword');
    return this.postRequest(route, { password, token });
  };

  resetPasswordTokenCheck = (token: string): Promise<any> => {
    const route = getRoute('resetPasswordTokenCheck');
    return this.postRequest(route, { token });
  };

  test = (): Promise<any> => {
    const route = getRoute('test');
    return this.fetch(route);
  };

  refresh = (refresh_token: string): Promise<any> => {
    // const route = getRoute('refresh');
    const route = '';
    return this.postRequest(route, { refresh_token });
  };
}

const Api = new API();

// axios.interceptors.response.use(undefined, error => {
// if (error.config && error.response && error.response.status === 401) {
//   const refresh_token = getRefreshToken();
//   return Api.refresh(refresh_token as string)
//     .then(session => {
//       // saveUserSession(session);
//       // setAxiosToken();
//       // error.config.headers.Authorization = axios.defaults.headers.common['Authorization'];
//       // return axios.request(error.config);
//     })
//     .catch(e => {
//       // deleteSession();
//       // history.push('');
//     });
// }
// return Promise.reject(error);
// });
export default Api;
