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
  useGetAllDoctorsFromMain,
  useGetSpecialists,
  useGetTreatments,
} from '@/hooks/useDoctor';
import { useMemo } from 'react';
import SelectLoader from '@/core/components/loader/select-loader';
import dynamic from 'next/dynamic';
import { useGetRoles } from '@/hooks/useRole';
import { useGetAllClinics } from '@/hooks/useClinic';
import { PhoneNumber } from '@/core/ui/phone-input';
import FormHeader from '@/core/components/form-header';
import QuillLoader from '@/core/components/loader/quill-loader';
import {
  pickDoctorFormSchema,
  PickDoctorFormTypes,
} from '@/validators/pick-doctor.schema';
import { useAtom } from 'jotai';
import { connectionAtom } from '@/store/connection';

const QuillEditor = dynamic(() => import('@core/ui/quill-editor'), {
  ssr: false,
  loading: () => <QuillLoader className="col-span-full h-[143px]" />,
});

const MultySelect = dynamic(
  () => import('rizzui').then((mod) => mod.MultiSelect),
  {
    ssr: false,
    loading: () => <SelectLoader />,
  }
);

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
  } = useGetAllDoctorsFromMain({
    page: 1,
    perPage: 100,
    xSessionId: connectionValue?.x_session_id,
    xtoken: connectionValue?.x_token,
  });

  const doctorsOptions = useMemo(() => {
    if (!dataGetAllDoctorsFromMain) return [];
    return dataGetAllDoctorsFromMain.data.map((doctor) => ({
      label: doctor.first_name + ' ' + doctor.last_name,
      value: doctor.id.toString(),
    }));
  }, [dataGetAllDoctorsFromMain]);

  const onSubmit: SubmitHandler<PickDoctorFormTypes> = (data) => {
    const findDoctorRole = doctorRole?.find((role) => role.name === 'doctor');

    const findDoctor = dataGetAllDoctorsFromMain?.data.find(
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

    const payload: IPayloadCreateDoctorUser = {
      name: findDoctor.first_name + ' ' + findDoctor.last_name,
      email: findDoctor.email,
      password: findDoctor.password as string,
      roleId: findDoctorRole.id,
      clinic_ids: [1],
      doctor: {
        ...findDoctor,
        description: findDoctor.description || '',
        mobile_number: '+' + findDoctor.mobile_number,
        specialist_type: Array.isArray(findDoctor?.specialist_type)
          ? findDoctor.specialist_type.map((item) => parseInt(item as string))
          : [],
        treatment_type: Array.isArray(findDoctor?.treatment_type)
          ? findDoctor.treatment_type.map((item) => parseInt(item as string))
          : [],
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
