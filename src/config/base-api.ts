import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { getSession, signOut } from 'next-auth/react';
import toast from 'react-hot-toast';
import { routes } from './routes';

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const axiosApi = axios.create({
  baseURL: API_URL,
});

async function attachToken(
  config: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig> {
  const session = await getSession();
  if (session?.accessToken) {
    config.headers.set('Authorization', `Bearer ${session.accessToken}`);
  }
  config.headers.set('X-Identity-ID', process.env.NEXT_PUBLIC_X_IDENTITY_ID);
  config.headers.set('X-Secret-Key', process.env.NEXT_PUBLIC_X_SECRET_KEY);
  return config;
}

axiosApi.interceptors.request.use(attachToken, (error) =>
  Promise.reject(error)
);

axiosApi.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: any) => {
    if (error.response?.status === 401) {
      await signOut({ redirect: true, callbackUrl: routes.auth.signIn });
    }

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
  return await axiosApi
    .get<T>(url, config)
    .then((response: any) => response.data);
}

export async function post<T>(
  url: string,
  data: any,
  config: AxiosRequestConfig = {}
): Promise<T> {
  return await axiosApi
    .post<T>(url, data, config)
    .then((response: any) => response.data);
}

export async function put<T>(
  url: string,
  data: any,
  config: AxiosRequestConfig = {}
): Promise<T> {
  return await axiosApi
    .put<T>(url, data, config)
    .then((response: any) => response.data);
}

export async function postFormData<T>(
  url: string,
  data: FormData,
  config: AxiosRequestConfig = {}
): Promise<T> {
  return await axiosApi
    .post<T>(url, data, config)
    .then((response: any) => response.data);
}

export async function del<T>(
  url: string,
  config: AxiosRequestConfig = {}
): Promise<T> {
  return await axiosApi
    .delete<T>(url, config)
    .then((response: any) => response.data);
}

export async function download(
  url: string,
  filename: string,
  config: AxiosRequestConfig = { responseType: 'blob' }
): Promise<void> {
  return await axiosApi.get(url, config).then((response: any) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
  });
}
