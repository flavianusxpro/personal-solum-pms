import { del, get, post, put } from '@/config/base-api';
import {
  IGetAllDoctorsResponse,
  IGetAnalyticReportBillingByDoctorIdResponse,
  IGetDoctorByClinicResponse,
  IGetDoctorByIdResponse,
  IGetDoctorCostByIdResponse,
  IGetSpecialistResponse,
  IGetTreatmentResponse,
  IPostGetDoctorAvailabilityByClinicResponse,
} from '@/types/ApiResponse';
import {
  IParamGetAllDoctor,
  IParamGetDoctorByClinic,
  IParamGetSpecialists,
  IParamGetTreatments,
  IParamsGetDoctorAvailability,
  IPayloadAssignDoctorToClinic,
  IPayloadCreateEditDoctor,
  IPayloadCreateEditTreatment,
  IPayloadDoctorCost,
  IPayloadPostCreateEditSpecialist,
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

export async function postGetDoctorAvailabilityByClinic(
  payload: IParamsGetDoctorAvailability
) {
  return await post<IPostGetDoctorAvailabilityByClinicResponse>(
    '/patient/clinic/' + payload.clinicId + '/doctor/availability',
    payload
  );
}

export async function getDoctorList(params: IParamGetAllDoctor) {
  return await get<IGetAllDoctorsResponse>('/admin/doctor', {
    params,
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

export async function putUpdateDoctor(payload: IPayloadCreateEditDoctor) {
  return await put<any>('/admin/doctor/' + payload.doctor_id, payload);
}

export async function deleteDoctor(id: number[]) {
  return await del<any>(`/admin/doctor/`, {
    data: {
      ids: id,
    },
  });
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

export async function putSettingAppointmentDoctor(
  payload: IPayloadSettingBillingDoctor
) {
  return await put<any>(
    '/admin/doctor/setting/appointment/' + payload.doctor_id,
    payload
  );
}

export async function postAssignDoctorToClinic(
  payload: IPayloadAssignDoctorToClinic
) {
  return await post(`/admin/doctor/${payload.id}/assign-to-clinic`, payload);
}

export async function getAnalyticReportBillingByDoctorId(id: string) {
  return await get<IGetAnalyticReportBillingByDoctorIdResponse>(
    `/admin/doctor/analytics/billing/${id}`
  ).then((res) => {
    return res.data;
  });
}

export async function getSpecialists(params: IParamGetSpecialists) {
  return await get<IGetSpecialistResponse>('/admin/doctor/specialist', {
    params,
  });
}

export async function postCreateSpecialist(
  payload: IPayloadPostCreateEditSpecialist
) {
  return await post<any>('/admin/doctor/specialist', payload);
}

export async function putUpdateSpecialist(
  payload: IPayloadPostCreateEditSpecialist
) {
  return await put<any>('/admin/doctor/specialist/' + payload.id, payload);
}

export async function deleteSpecialist(id: string) {
  return await del<any>(`/admin/doctor/specialist/${id}`);
}

export async function getTreatments(params: IParamGetTreatments) {
  return await get<IGetTreatmentResponse>('/admin/doctor/treatment', {
    params,
  });
}

export async function postCreateTreatment(
  payload: IPayloadCreateEditTreatment
) {
  return await post<any>('/admin/doctor/treatment', payload);
}

export async function putUpdateTreatment(payload: IPayloadCreateEditTreatment) {
  return await put<any>('/admin/doctor/treatment/' + payload.id, payload);
}

export async function deleteTreatment(id: string) {
  return await del<any>(`/admin/doctor/treatment/${id}`);
}

export async function getDoctorCostById(id: number) {
  return await get<IGetDoctorCostByIdResponse>(`/admin/doctor/cost/${id}`);
}

export async function postCreateDoctorCost(payload: IPayloadDoctorCost) {
  return await post('/admin/doctor/cost', payload);
}

export async function putUpdateDoctorCost(payload: IPayloadDoctorCost) {
  return await put('/admin/doctor/cost/' + payload.id, payload);
}

export async function deleteDoctorCost(ids: number[]) {
  return await del<any>(`/admin/doctor/cost/`, { data: { ids } });
}
