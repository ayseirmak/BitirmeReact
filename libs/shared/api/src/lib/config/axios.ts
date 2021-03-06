import axiosStatic, { AxiosRequestConfig } from 'axios';
import {
  loginInterceptor,
  tokenInterceptor,
  refreshTokenInterceptor,
  errorInterceptor,
  successInterceptor,
} from './interceptors';


const baseUrl = 'http://localhost:8080';

const defaultConfig: AxiosRequestConfig = {
  baseURL: `${baseUrl}/api/`,
};

export function createAxios(baseConfig: AxiosRequestConfig) {
  const instance = axiosStatic.create(baseConfig);

  // Request Interceptors
  instance.interceptors.request.use(tokenInterceptor);

  // Response Interceptors
  instance.interceptors.response.use(loginInterceptor);

  instance.interceptors.response.use((c) =>c, refreshTokenInterceptor);
  instance.interceptors.response.use((c) =>c, errorInterceptor);
  instance.interceptors.response.use(successInterceptor);
  return instance;
}

export default createAxios(defaultConfig);
