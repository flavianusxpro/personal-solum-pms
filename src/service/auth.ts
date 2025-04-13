import { post } from '@/app/api/api';
import { ApiResponseWithMessage } from '@/types/ApiResponse';
import {
  IPayloadPostForgotPassword,
  IPayloadRegisterForPatient,
} from '@/types/paramTypes';

export async function registerForClient(payload: IPayloadRegisterForPatient) {
  return await post<any>('/patient/auth/register', payload);
}

export async function postForgotPassword(payload: IPayloadPostForgotPassword) {
  return await post<ApiResponseWithMessage>(
    '/patient/auth/login/forgot-password',
    payload
  );
}
