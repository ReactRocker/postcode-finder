import axios from "axios";

import { interceptor } from "./interceptors";

const instance = axios.create({
  // baseURL: "http://App.psengine.co.uk",
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

interceptor(instance);

const request = async ({ method, url, data, headers, skipAuth }) => {
  if (method === "delete") {
    data = { data };
  }
  const promise = instance[method](url, data);
  try {
    const response = await promise;
    // const payload = response.data;
    return response;
    // if (headers) {
    //   return {
    //     data: payload,
    //     headers: response.headers,
    //   };
    // }

    // return payload;
  } catch (e) {
    console.error(e)
    const status = e?.response?.data?.status || "error";
    const message =
      e?.response?.data?.message ||
      `${e?.response?.status} ${e?.response?.statusText}`;
    e.response.data = {
      status,
      message,
    };
    return Promise.reject(e);
  }
};

export const get = (url, params) => request({ method: "get", url, ...params });
export const post = (url, data, params) =>
  request({ method: "post", url, data, ...params });
export const put = (url, data, params) =>
  request({ method: "put", url, data, ...params });
export const del = (url, data) => request({ method: "delete", url, data });
