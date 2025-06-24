import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import toast from 'react-hot-toast';
import { defaultConnection } from '@/store/connection';

export const axiosSubClinicApi = axios.create({
  baseURL: defaultConnection.hostname,
});

async function attachToken(
  config: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig> {
  if (defaultConnection) {
    config.headers.set('X-Token', defaultConnection.x_token);
    config.headers.set('X-Session-ID', defaultConnection.x_session_id);
  }
  return config;
}

axiosSubClinicApi.interceptors.request.use(attachToken, (error) =>
  Promise.reject(error)
);

axiosSubClinicApi.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: any) => {
    // if (error.response?.status === 401) {
    //   await signOut({ redirect: true, callbackUrl: routes.auth.signIn });
    // }

    if (error.response?.status === 500) {
      toast.error('Server error. Please try again later or contact support.');
    }

    return Promise.reject(error);
  }
);

export async function get<T>(
  url: string,
  config: AxiosRequestConfig = {}
): Promise<T> {
  return await axiosSubClinicApi
    .get<T>(url, config)
    .then((response: any) => response.data);
}

export async function post<T>(
  url: string,
  data: any,
  config: AxiosRequestConfig = {}
): Promise<T> {
  return await axiosSubClinicApi
    .post<T>(url, data, config)
    .then((response: any) => response.data);
}

export async function put<T>(
  url: string,
  data: any,
  config: AxiosRequestConfig = {}
): Promise<T> {
  return await axiosSubClinicApi
    .put<T>(url, data, config)
    .then((response: any) => response.data);
}

export async function postFormData<T>(
  url: string,
  data: FormData,
  config: AxiosRequestConfig = {}
): Promise<T> {
  return await axiosSubClinicApi
    .post<T>(url, data, config)
    .then((response: any) => response.data);
}

export async function del<T>(
  url: string,
  config: AxiosRequestConfig = {}
): Promise<T> {
  return await axiosSubClinicApi
    .delete<T>(url, config)
    .then((response: any) => response.data);
}

export async function download(
  url: string,
  filename: string,
  config: AxiosRequestConfig = { responseType: 'blob' }
): Promise<void> {
  return await axiosSubClinicApi.get(url, config).then((response: any) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
  });
}
