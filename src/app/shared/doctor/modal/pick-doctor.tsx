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
import { useGetSpecialists, useGetTreatments } from '@/hooks/useDoctor';
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

  // const { mutate: mutateCreateDoctor, isPending } = usePostCreateDoctorUser();

  // const clinicsOptions = useMemo(() => {
  //   if (!dataClinics) return [];
  //   return dataClinics.data.map((clinic) => ({
  //     label: clinic.name,
  //     value: clinic.id.toString(),
  //   }));
  // }, [dataClinics]);

  const onSubmit: SubmitHandler<PickDoctorFormTypes> = (data) => {
    // if (!doctorRole) {
    //   toast.error('Doctor Role not found');
    //   return;
    // }
    // const payload: IPayloadCreateDoctorUser = {
    //   name: data.first_name + ' ' + data.last_name,
    //   email: data.email,
    //   password: data.password as string,
    //   roleId: doctorRole.id,
    //   clinic_ids: data.clinic_ids.map((item) => parseInt(item)),
    //   doctor: {
    //     ...data,
    //     description: data.about,
    //     mobile_number: '+' + data.mobile_number,
    //     specialist_type: data.specialist_type.map((item) => parseInt(item)),
    //     treatment_type: data.treatment_type.map((item) => parseInt(item)),
    //   },
    // };
    // mutateCreateDoctor(payload, {
    //   onSuccess: () => {
    //     toast.success('Doctor created successfully');
    //     closeModal();
    //   },
    //   onError: (error) => {
    //     const errorMessage =
    //       (error as any)?.response?.data?.message || 'An error occurred';
    //     toast.error(errorMessage);
    //   },
    // });
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
                      options={[] /* Replace with actual options */}
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
