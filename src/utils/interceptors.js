import { getToken, setToken, removeToken } from "./tokenApi";

export const interceptor = (instance) => {
  instance.interceptors.request.use(
    function (config) {
      const token = getToken() || false;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    function (response) {
      const token =
        response?.data?.token || response?.data?.data?.token || null;
      if (token) {
        // console.log("verify", jwt.verify(token));

        removeToken();
        setToken(token);
      }
      return response;
    },
    function (error) {
      // console.error(error);
      // if (error.response.status === 403 || error.response.status === 410) {

      // }
      return Promise.reject(error);
    }
  );
};
