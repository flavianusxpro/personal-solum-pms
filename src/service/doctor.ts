import { get, post, put } from '@/app/api/api';
import {
  IGetAllDoctorsResponse,
  IGetAnalyticReportBillingByDoctorIdResponse,
  IGetDoctorByClinicResponse,
  IGetDoctorByIdResponse,
  IGetSpecialistResponse,
} from '@/types/ApiResponse';
import {
  IParamGetAllDoctor,
  IParamGetDoctorByClinic,
  IParamGetSpecialists,
  IPayloadAssignDoctorToClinic,
  IPayloadCreateEditDoctor,
  IPayloadSettingBillingDoctor,
  IPayloadSettingMeetingDoctor,
} from '@/types/paramTypes';

export async function getDoctorByClinic(params: IParamGetDoctorByClinic) {
  return await get<IGetDoctorByClinicResponse>(
    '/patient/clinic/' + params.id + '/doctor',
    {
      params,
    }
  ).then((res) => res.data);
}

export async function getDoctorList(params: IParamGetAllDoctor) {
  return await get<IGetAllDoctorsResponse>('/admin/doctor', {
    params,
  }).then((res) => {
    return res.data;
  });
}

export async function getDoctorById(id: string) {
  return await get<IGetDoctorByIdResponse>(`/admin/doctor/detail/${id}`).then(
    (res) => {
      return res.data;
    }
  );
}
export async function postCreateDoctor(payload: IPayloadCreateEditDoctor) {
  return await post<any>('/admin/doctor', payload);
}

export async function putCreateDoctor(payload: IPayloadCreateEditDoctor) {
  return await put<any>('/admin/doctor/' + payload.doctor_id, payload);
}

export async function putSettingMeetingDoctor(
  payload: IPayloadSettingMeetingDoctor
) {
  return await put<any>(
    '/admin/doctor/setting/meeting/' + payload.doctor_id,
    payload
  );
}

export async function putSettingBillingDoctor(
  payload: IPayloadSettingBillingDoctor
) {
  return await put<any>(
    '/admin/doctor/setting/billing/' + payload.doctor_id,
    payload
  );
}

export async function postAssignDoctorToClinic(
  payload: IPayloadAssignDoctorToClinic
) {
  return await post(`/admin/doctor/${payload.id}/assign-to-clinic`, payload);
}

export async function getSpecialists(params: IParamGetSpecialists) {
  return await get<IGetSpecialistResponse>('/admin/doctor/specialist', {
    params,
  }).then((res) => {
    return res.data;
  });
}

export async function getAnalyticReportBillingByDoctorId(id: string) {
  return await get<IGetAnalyticReportBillingByDoctorIdResponse>(
    `/admin/doctor/analytics/billing/${id}`
  ).then((res) => {
    return res.data;
  });
}
