import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import toast from 'react-hot-toast';

export const axiosSubClinicApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CLINIC_MAIN_CLINIC_API_URL,
});

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

export async function getSubClinicApi<T>(
  url: string,
  config: AxiosRequestConfig = {}
): Promise<T> {
  return await axiosSubClinicApi
    .get<T>(url, config)
    .then((response: any) => response.data);
}

export async function postSubClinicApi<T>(
  url: string,
  data: any,
  config: AxiosRequestConfig = {}
): Promise<T> {
  return await axiosSubClinicApi
    .post<T>(url, data, config)
    .then((response: any) => response.data);
}

export async function putSubClinicApi<T>(
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

export async function delSubClinicApi<T>(
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
