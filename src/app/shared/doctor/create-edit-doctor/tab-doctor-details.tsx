'use client';

import { Controller, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import FormGroup from '@/app/shared/ui/form-group';
import FormFooter from '@core/components/form-footer';
import { Form } from '@core/ui/form';
import { Flex, Input, Loader } from 'rizzui';
import AvatarUpload from '@core/ui/file-upload/avatar-upload';
import CSelect from '@/core/ui/select';
import { genderOption, languageOption, stateOption } from '@/config/constants';
import { IPayloadCreateEditDoctor } from '@/types/paramTypes';
import { useParams } from 'next/navigation';
import {
  doctorDetailsFormSchema,
  DoctorDetailsFormTypes,
} from '@/validators/doctor-details.schema';
import {
  useGetDoctorById,
  useGetSpecialists,
  useGetTreatments,
  useUpdateDoctor,
} from '@/hooks/useDoctor';
import dynamic from 'next/dynamic';
import QuillLoader from '@/core/components/loader/quill-loader';
import SelectLoader from '@/core/components/loader/select-loader';
import Divider from '@/app/shared/ui/divider';
import { useMemo } from 'react';

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

export default function DoctorDetails({ isView }: { isView?: boolean }) {
  const id = useParams<{ id: string }>().id;

  const {
    data: dataDoctor,
    refetch: refetchDataDoctor,
    isLoading: isLoadingGetDataDoctor,
  } = useGetDoctorById(id);
  const { mutate: mutateUpdateDoctor, isPending } = useUpdateDoctor();

  const { data: dataSpecialists } = useGetSpecialists({
    page: 1,
    perPage: 100,
  });
  const { data: dataTreatments } = useGetTreatments({
    perPage: 100,
    page: 1,
  });

  const specialistsOptions = useMemo(() => {
    if (!dataSpecialists) return [];
    return dataSpecialists.data.map((item) => ({
      label: item.name,
      value: item.id.toString(),
    }));
  }, [dataSpecialists]);

  const treatmentOptions = useMemo(() => {
    if (!dataTreatments) return [];
    return dataTreatments.data.map((item) => ({
      label: item.name,
      value: item.id.toString(),
    }));
  }, [dataTreatments]);

  const specialistTypeDefaultValues = useMemo(() => {
    if (!dataDoctor?.specialist_type) return [];
    const parsedSpecialistType = JSON.parse(
      dataDoctor.specialist_type
    ) as number[];
    if (Array.isArray(parsedSpecialistType)) {
      return parsedSpecialistType.map((item) => item.toString());
    }
    return [];
  }, [dataDoctor]);

  // const treatmentTypeDefaultValues = useMemo(() => {
  //   if (!dataDoctor?.treatment_type) return [];
  //   const parsedTreatmentType = JSON.parse(
  //     dataDoctor.treatment_type
  //   ) as number[];
  //   if (Array.isArray(parsedTreatmentType)) {
  //     return parsedTreatmentType.map((item) => item.toString());
  //   }
  //   return [];
  // }, [dataDoctor]);

  const onSubmit: SubmitHandler<DoctorDetailsFormTypes> = (data) => {
    const payload: IPayloadCreateEditDoctor = {
      doctor_id: id ?? undefined,
      first_name: data.first_name,
      last_name: data.last_name as string,
      unit_number: data.unit_number,
      street_number: data.street_number,
      street_name: data.street_name,
      address_line_1: data.address_line_1,
      address_line_2: data.address_line_2,
      suburb: data.suburb,
      postcode: data.postcode,
      country: data.country,
      state: data.state,
      // treatment_type: data.treatment_type.map((item) => parseInt(item)),
      treatment_type: data.treatment_type,
      specialist_type: data.specialist_type.map((item) => parseInt(item)),
      medical_interest: data.medical_interest,
      email: data.email,
      date_of_birth: data.date_of_birth as string,
      gender: data.gender as string,
      mobile_number: data.mobile_number as string,
      description: data.about,
      language: data.language,
    };

    if (id) {
      return mutateUpdateDoctor(payload, {
        onSuccess: () => {
          toast.success('Doctor updated successfully');
          refetchDataDoctor();
        },
        onError: (error) => {
          const errorMessage =
            (error as any)?.response?.data?.message || 'An error occurred';
          toast.error(errorMessage);
        },
      });
    }
  };

  if (isLoadingGetDataDoctor) return <Loader size="lg" />;

  return (
    <Form<DoctorDetailsFormTypes>
      validationSchema={doctorDetailsFormSchema}
      // resetValues={reset}
      onSubmit={onSubmit}
      className="@container"
      useFormProps={{
        mode: 'all',
        defaultValues: {
          unit_number: dataDoctor?.unit_number ?? '',
          first_name: dataDoctor?.first_name ?? '',
          last_name: dataDoctor?.last_name ?? '',
          email: dataDoctor?.email ?? '',
          gender: dataDoctor?.gender ?? '',
          mobile_number: dataDoctor?.mobile_number ?? '',
          date_of_birth: dataDoctor?.date_of_birth ?? '',
          country: dataDoctor?.country ?? '',
          street_name: dataDoctor?.street_name ?? '',
          suburb: dataDoctor?.suburb ?? '',
          state: dataDoctor?.state ?? '',
          postcode: dataDoctor?.postcode ?? '',
          address_line_1: dataDoctor?.address_line_1 ?? '',
          address_line_2: dataDoctor?.address_line_2 ?? '',
          about: dataDoctor?.description ?? '',
          medical_interest: dataDoctor?.medical_interest ?? '',
          // treatment_type: treatmentTypeDefaultValues,
          treatment_type: dataDoctor?.treatment_type,
          specialist_type: specialistTypeDefaultValues,
          language: dataDoctor?.language
            ? (JSON.parse(dataDoctor.language) as (string | undefined)[])
            : [],
          avatar: dataDoctor?.photo ? { url: dataDoctor.photo } : null,
        },
      }}
    >
      {({ register, control, setValue, getValues, formState: { errors } }) => {
        return (
          <>
            <div className="grid grid-cols-1 gap-7 @2xl:gap-9 @3xl:gap-11 md:grid-cols-2">
              <div className="section-container">
                <FormGroup
                  title="Personal Info"
                  className="grid-cols-12 gap-4"
                />
                <FormGroup title="First Name" isLabel>
                  <Input
                    placeholder="First Name"
                    {...register('first_name')}
                    error={errors.first_name?.message}
                    className="flex-grow"
                    disabled={isView}
                  />
                </FormGroup>
                <FormGroup title="Last Name" isLabel>
                  <Input
                    placeholder="Last Name"
                    {...register('last_name')}
                    error={errors.last_name?.message}
                    className="flex-grow"
                    disabled={isView}
                  />
                </FormGroup>
                <FormGroup title="Gender" isLabel>
                  <Controller
                    name="gender"
                    control={control}
                    render={({ field }) => (
                      <CSelect
                        {...field}
                        label=""
                        placeholder="Select Gender"
                        options={genderOption}
                        disabled={isView}
                      />
                    )}
                  />
                </FormGroup>
                <FormGroup title="Birth of Date" isLabel>
                  <Input
                    placeholder="Birth of Dae"
                    type="date"
                    {...register('date_of_birth')}
                    error={errors.date_of_birth?.message}
                    className="flex-grow"
                    disabled={isView}
                  />
                </FormGroup>
                <FormGroup title="Phone Number" isLabel>
                  <Input
                    placeholder="Phone Number"
                    {...register('mobile_number')}
                    error={errors.mobile_number?.message}
                    className="flex-grow"
                    disabled={isView}
                  />
                </FormGroup>

                <FormGroup title="Email" isLabel>
                  <Input
                    placeholder="Email"
                    {...register('email')}
                    error={errors.email?.message}
                    className="flex-grow"
                    disabled={isView}
                  />
                </FormGroup>
              </div>

              <div className="section-container">
                <FormGroup title="Address" className="grid-cols-12" />
                <FormGroup title="Country" isLabel>
                  <Input
                    placeholder="Country"
                    {...register('country')}
                    error={errors.country?.message}
                    className="flex-grow"
                    disabled={isView}
                  />
                </FormGroup>

                <FormGroup title="Street Number" isLabel>
                  <Input
                    placeholder="Street"
                    {...register('street_number')}
                    error={errors.street_number?.message}
                    className="flex-grow"
                    disabled={isView}
                  />
                </FormGroup>
                <FormGroup title="Street Name" isLabel>
                  <Input
                    placeholder="Street"
                    {...register('street_name')}
                    error={errors.street_name?.message}
                    className="flex-grow"
                    disabled={isView}
                  />
                </FormGroup>
                <FormGroup title="Address Line 1" isLabel>
                  <Input
                    placeholder="Address Line 1"
                    {...register('address_line_1')}
                    error={errors.address_line_1?.message}
                    className="flex-grow"
                    disabled={isView}
                  />
                </FormGroup>
                <FormGroup title="Address Line 2" isLabel>
                  <Input
                    placeholder="Address Line 2"
                    {...register('address_line_2')}
                    error={errors.address_line_2?.message}
                    className="flex-grow"
                    disabled={isView}
                  />
                </FormGroup>
                <FormGroup title="Suburb" isLabel>
                  <Input
                    placeholder="Suburb"
                    {...register('suburb')}
                    error={errors.suburb?.message}
                    className="flex-grow"
                    disabled={isView}
                  />
                </FormGroup>
                <Controller
                  name="state"
                  control={control}
                  render={({ field }) => (
                    <FormGroup title="">
                      <Flex justify="between" align="center" gap="4">
                        <CSelect
                          {...field}
                          label="State"
                          placeholder="State"
                          className="group relative z-0"
                          options={stateOption}
                          error={errors.state?.message as string}
                          disabled={isView}
                        />
                        <Input
                          label="Post Code"
                          placeholder="Post Code"
                          {...register('postcode')}
                          error={errors.postcode?.message}
                          className="flex-grow"
                          disabled={isView}
                        />
                      </Flex>
                    </FormGroup>
                  )}
                />
              </div>
            </div>

            <Divider />

            <div className="section-container">
              <FormGroup
                title="Doctor Description"
                description="Tell us a little about yourself and what makes you unique as a doctor"
                className="grid-cols-12 gap-4"
              />
              <Controller
                name="about"
                control={control}
                render={({ field }) => (
                  <QuillEditor
                    {...field}
                    placeholder="About Doctor"
                    error={errors.about?.message}
                    className="@3xl:col-span-12 [&>.ql-container_.ql-editor]:min-h-[300px]"
                  />
                )}
              />
            </div>

            <Divider />

            <div className="section-container">
              <FormGroup title="Treatment Type" isLabel>
                <Input
                  placeholder="Treatment Type"
                  {...register('treatment_type')}
                  error={errors.treatment_type?.message}
                  className="flex-grow"
                  disabled={isView}
                />
              </FormGroup>
              {/* <FormGroup title="Treatment Type" isLabel>
                <Controller
                  name="treatment_type"
                  control={control}
                  render={({ field }) => (
                    <MultySelect
                      searchable
                      {...field}
                      placeholder="Select Specialist Type"
                      options={treatmentOptions}
                      disabled={isView}
                      error={errors.treatment_type?.message}
                    />
                  )}
                />
              </FormGroup> */}
              <FormGroup title="Specialist Type" isLabel>
                <Controller
                  name="specialist_type"
                  control={control}
                  render={({ field }) => (
                    <MultySelect
                      searchable
                      {...field}
                      placeholder="Select Specialist Type"
                      options={specialistsOptions}
                      disabled={isView}
                      error={errors.specialist_type?.message}
                    />
                  )}
                />
              </FormGroup>
              <FormGroup title="Medical Interest" isLabel>
                <Input
                  placeholder="Medical Interest"
                  {...register('medical_interest')}
                  error={errors.medical_interest?.message}
                  className="flex-grow"
                  disabled={isView}
                />
              </FormGroup>
              <FormGroup title="Language" isLabel>
                <Controller
                  name="language"
                  control={control}
                  render={({ field }) => (
                    <MultySelect
                      {...field}
                      onClear={() => field.onChange([])}
                      options={languageOption}
                      clearable
                      placeholder="Select Language"
                      error={errors.language?.message}
                      className="flex-grow"
                      disabled={isView}
                    />
                  )}
                />
              </FormGroup>
            </div>

            <Divider />
            <div className="section-container mb-10">
              <FormGroup title="Your Photo" isLabel>
                <div className="flex flex-col gap-6 @container @3xl:col-span-2">
                  <AvatarUpload
                    path_name="doctor"
                    name="avatar"
                    setValue={setValue}
                    getValues={getValues}
                    error={errors?.avatar?.message as string}
                    disabled={isView}
                  />
                </div>
              </FormGroup>
            </div>
            {!isView && (
              <FormFooter
                isLoading={isPending}
                altBtnText="Cancel"
                submitBtnText="Save"
              />
            )}
          </>
        );
      }}
    </Form>
  );
}
