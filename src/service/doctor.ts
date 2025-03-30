import { get } from '@/app/api/api';
import { IGetDoctorByClinicForPatientResponse } from '@/types/ApiResponse';
import { IParamGetDoctorByClinicForPatient } from '@/types/paramTypes';

export async function getDoctorByClinicForPatient(
  params: IParamGetDoctorByClinicForPatient
) {
  return await get<IGetDoctorByClinicForPatientResponse>(
    '/patient/clinic/' + params.id + '/doctor',
    {
      params,
    }
  ).then((res) => res.data);
}
