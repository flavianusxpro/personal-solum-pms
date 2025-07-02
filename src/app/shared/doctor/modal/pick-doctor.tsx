'use client';

import { Controller, SubmitHandler } from 'react-hook-form';
import FormGroup from '@/app/shared/ui/form-group';
import FormFooter from '@core/components/form-footer';
import { Form } from '@core/ui/form';
import { FieldError, Input } from 'rizzui';
import CSelect from '@/core/ui/select';
import { genderOption, languageOption, stateOption } from '@/config/constants';
import { IPayloadCreateDoctorUser } from '@/types/paramTypes';
import {
  doctorDetailsFormSchema,
  DoctorDetailsFormTypes,
} from '@/validators/create-doctor.schema';
import toast from 'react-hot-toast';
import { useModal } from '../../modal-views/use-modal';
import { usePostCreateDoctorUser } from '@/hooks/useUser';
import {
  useGetAllDoctors,
  useGetAllDoctorsFromMain,
  useGetDoctorSharingFromMain,
} from '@/hooks/useDoctor';
import { useMemo } from 'react';
import { useGetRoles } from '@/hooks/useRole';
import { useGetAllClinics } from '@/hooks/useClinic';
import FormHeader from '@/core/components/form-header';
import {
  pickDoctorFormSchema,
  PickDoctorFormTypes,
} from '@/validators/pick-doctor.schema';
import { useAtom } from 'jotai';
import { connectionAtom } from '@/store/connection';
import { useGetDoctorScheduleByIdFromMainClinic } from '@/hooks/useSchedule';

export default function PickDoctorModal() {
  const { closeModal } = useModal();
  const [connectionValue] = useAtom(connectionAtom);

  const { mutate: mutateCreateDoctor, isPending } = usePostCreateDoctorUser();

  const { data: doctorRole } = useGetRoles({
    page: 1,
    perPage: 100,
  });

  const {
    data: dataGetAllDoctorsFromMain,
    isLoading: isLoadingGetAllDoctorsFromMain,
  } = useGetDoctorSharingFromMain({
    page: 1,
    perPage: 100,
  });

  const { data: dataDoctors } = useGetAllDoctors({
    page: 1,
    perPage: 100,
    isEnable: true,
  });

  const { data: dataClinics } = useGetAllClinics({
    page: 1,
    perPage: 100,
    role: 'admin',
  });

  const doctorsOptions = useMemo(() => {
    const doctors = dataDoctors?.data;
    if (!dataGetAllDoctorsFromMain) return [];
    // Build a set of existing doctor full names using reduce
    const existingDoctorNames = (doctors || []).reduce(
      (acc: Set<string>, doctor: any) => {
        if (doctor?.first_name && doctor?.last_name) {
          acc.add((doctor.first_name + ' ' + doctor.last_name).toLowerCase());
        }
        return acc;
      },
      new Set<string>()
    );

    // Filter out doctors that already exist by full name
    return (dataGetAllDoctorsFromMain?.data || [])
      .filter(
        (doctor) =>
          !existingDoctorNames.has(
            (doctor.first_name + ' ' + doctor.last_name).toLowerCase()
          )
      )
      .map((doctor) => ({
        label: doctor.first_name + ' ' + doctor.last_name,
        value: doctor.id.toString(),
      }));
  }, [dataGetAllDoctorsFromMain, dataDoctors]);

  const onSubmit: SubmitHandler<PickDoctorFormTypes> = (data) => {
    const findDoctorRole = doctorRole?.find((role) => role.name === 'doctor');

    const findDoctor = dataGetAllDoctorsFromMain?.data?.find(
      (doctor) => doctor.id === parseInt(data.doctorId)
    );

    if (!findDoctor) {
      toast.error('Doctor not found');
      return;
    }

    if (!findDoctorRole) {
      toast.error('Doctor role not found');
      return;
    }

    if (!dataClinics?.data?.[0]?.id) {
      toast.error('Clinic not found');
      return;
    }

    const specialistTypeDefaultValues = () => {
      const parsedSpecialistType = JSON.parse(
        findDoctor.specialist_type
      ) as number[];
      if (Array.isArray(parsedSpecialistType)) {
        return parsedSpecialistType.map((item) => item);
      }
      return [];
    };

    const payload: IPayloadCreateDoctorUser = {
      name: findDoctor.first_name + ' ' + findDoctor.last_name,
      email: findDoctor.email,
      password: '12345678',
      roleId: findDoctorRole.id,
      clinic_ids: [dataClinics?.data?.[0]?.id],
      doctor: {
        ...findDoctor,
        description: findDoctor.description || '',
        mobile_number: '+' + findDoctor.mobile_number,
        specialist_type: specialistTypeDefaultValues(),
        treatment_type: (() => {
          if (Array.isArray(findDoctor.treatment_type)) {
            return (findDoctor.treatment_type as (string | number)[]).map(
              (item) => parseInt(item as string)
            );
          }
          if (typeof findDoctor.treatment_type === 'string') {
            // Handles string like '{"7","8","9"}'
            const cleaned = findDoctor.treatment_type.replace(/[{}\"]+/g, '');
            if (!cleaned) return [];
            return cleaned
              .split(',')
              .map((item) => parseInt(item.trim()))
              .filter((n) => !isNaN(n));
          }
          return [];
        })(),
        date_of_birth: findDoctor.date_of_birth || '',
        gender: findDoctor.gender || '',
        emergency_first_name: findDoctor.emergency_first_name || '',
        emergency_last_name: findDoctor.emergency_last_name || '',
        emergency_mobile_number: findDoctor.emergency_mobile_number || '',
        emergency_email: findDoctor.emergency_email || '',
        state: findDoctor.state || '',
        language: Array.isArray(findDoctor.language)
          ? (findDoctor.language as string[])
          : typeof findDoctor.language === 'string'
            ? (JSON.parse(findDoctor.language) as string[])
            : [],
      },
    };
    mutateCreateDoctor(payload, {
      onSuccess: () => {
        toast.success('Doctor picked successfully');
        closeModal();
      },
      onError: (error) => {
        const errorMessage =
          (error as any)?.response?.data?.message || 'An error occurred';
        toast.error(errorMessage);
      },
    });
  };

  return (
    <Form<PickDoctorFormTypes>
      validationSchema={pickDoctorFormSchema}
      // resetValues={reset}
      onSubmit={onSubmit}
      className="max-h-[90vh] overflow-y-auto rounded-xl bg-white @container"
      useFormProps={{
        mode: 'onChange',
      }}
    >
      {({ register, control, formState: { errors } }) => {
        return (
          <div className="flex flex-col gap-6 pt-2">
            <FormHeader title="Pick Doctor" />

            <div className="grid grid-cols-1 gap-x-7 gap-y-4 px-6">
              <FormGroup title="Doctor" className="col-span-full">
                <Controller
                  name="doctorId"
                  control={control}
                  render={({ field }) => (
                    <CSelect
                      {...field}
                      options={doctorsOptions}
                      placeholder="Select Doctor"
                      className="w-full"
                      isLoading={isLoadingGetAllDoctorsFromMain}
                    />
                  )}
                />
                <FieldError error={errors.doctorId?.message} />
              </FormGroup>
            </div>

            <FormFooter
              className="rounded-b-xl"
              // isLoading={isPending}
              altBtnText="Cancel"
              submitBtnText="Save"
            />
          </div>
        );
      }}
    </Form>
  );
}
