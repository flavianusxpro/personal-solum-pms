'use client';

import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import FormGroup from '@/app/shared/ui/form-group';
import FormFooter from '@core/components/form-footer';
import {
  RequirementDoctorTypes,
  requirementDoctorSchema,
} from '@/validators/requirement-doctor.schema';
import { Button, Flex, Grid, Input } from 'rizzui';
import dynamic from 'next/dynamic';
import SelectLoader from '@/core/components/loader/select-loader';
import { zodResolver } from '@hookform/resolvers/zod';
import CardExpiry from '@/app/shared/ui/card-expiry';
import UploadFile from '@/app/shared/ui/modal-button/modal-upload-file-button';

const MultySelect = dynamic(
  () => import('rizzui').then((mod) => mod.MultiSelect),
  {
    ssr: false,
    loading: () => <SelectLoader />,
  }
);
export default function TabRequirement({
  nextTab,
  isView = false,
}: {
  nextTab?: () => void;
  isView?: boolean;
}) {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<RequirementDoctorTypes>({
    resolver: zodResolver(requirementDoctorSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'cpr',
  });

  const onSubmit: SubmitHandler<RequirementDoctorTypes> = (data) => {
    console.log('🚀 ~ data:', data);
  };

  return (
    <form className="@container" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 gap-7 border-b border-dashed pb-10 @2xl:gap-9 @3xl:gap-11 md:grid-cols-2">
        <div className="flex flex-col gap-7">
          {/* Personal */}
          <FormGroup title="Personal" className="grid-cols-12 gap-4" />
          <FormGroup title="Driver Licence" className="grid-cols-12" isLabel>
            <Grid gap="2">
              <Flex gap="2" className="col-span-12">
                <Input
                  placeholder="Enter your driver licence"
                  {...register('driverLicenceNumber')}
                  error={errors.driverLicenceNumber?.message}
                  disabled={isView}
                  label="Driver Licence Number"
                  className="w-full"
                />
                <Controller
                  name="driverLicenceNumber"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <CardExpiry
                      isMask
                      formatType="custom"
                      placeholder="MM/YY"
                      mask={['M', 'M', 'Y', 'Y']}
                      allowEmptyFormatting
                      customInput={Input as React.ComponentType<unknown>}
                      onChange={onChange}
                      {...{
                        label: 'Expiry Date',
                        variant: 'outline',
                        error: errors?.driverLicenceNumber?.message,
                      }}
                    />
                  )}
                />
              </Flex>
              <UploadFile />
            </Grid>
          </FormGroup>
          <FormGroup title="Photo ID" className="grid-cols-12" isLabel>
            <Grid gap="2">
              <Flex gap="2" className="col-span-12">
                <Input
                  placeholder="Enter Photo ID"
                  {...register('driverLicenceNumber')}
                  error={errors.driverLicenceNumber?.message}
                  disabled={isView}
                  label="ID Number"
                  className="w-full"
                />
                <Controller
                  name="driverLicenceNumber"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <CardExpiry
                      isMask
                      formatType="custom"
                      placeholder="MM/YY"
                      mask={['M', 'M', 'Y', 'Y']}
                      allowEmptyFormatting
                      customInput={Input as React.ComponentType<unknown>}
                      onChange={onChange}
                      {...{
                        label: 'Expiry Date',
                        variant: 'outline',
                        error: errors?.driverLicenceNumber?.message,
                      }}
                    />
                  )}
                />
              </Flex>
              <UploadFile />
            </Grid>
          </FormGroup>
          <FormGroup
            title="Qualification Certificate"
            className="grid-cols-12"
            isLabel
          >
            <Grid gap="2">
              <Flex gap="2" className="col-span-12">
                <Input
                  placeholder="File Name"
                  {...register('driverLicenceNumber')}
                  className="w-full"
                  error={errors.driverLicenceNumber?.message}
                  disabled={isView}
                  label="File Name"
                />
              </Flex>
              <UploadFile />
            </Grid>
          </FormGroup>
          <FormGroup title="Police Check" className="grid-cols-12" isLabel>
            <Grid gap="2">
              <Flex gap="2" className="col-span-12">
                <Input
                  placeholder="File Name"
                  {...register('driverLicenceNumber')}
                  error={errors.driverLicenceNumber?.message}
                  disabled={isView}
                  label="File Name"
                  className="w-full"
                />
                <Controller
                  name="driverLicenceNumber"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <CardExpiry
                      isMask
                      formatType="custom"
                      placeholder="MM/YY"
                      mask={['M', 'M', 'Y', 'Y']}
                      allowEmptyFormatting
                      customInput={Input as React.ComponentType<unknown>}
                      onChange={onChange}
                      {...{
                        label: 'Expiry Date',
                        variant: 'outline',
                        error: errors?.driverLicenceNumber?.message,
                      }}
                    />
                  )}
                />
              </Flex>
              <UploadFile />
            </Grid>
          </FormGroup>
        </div>

        {/* Bussines & Insurance */}
        <div className="flex w-full flex-col gap-7">
          <FormGroup title="Bussines & Insurance" className="grid-cols-12" />
          <FormGroup title="Asic Document" className="grid-cols-12" isLabel>
            <Grid gap="2">
              <Flex gap="2" className="col-span-12">
                <Input
                  placeholder="Asic Document"
                  {...register('driverLicenceNumber')}
                  error={errors.driverLicenceNumber?.message}
                  disabled={isView}
                  label="Asic Document "
                  className="w-full"
                />
                <Controller
                  name="driverLicenceNumber"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <CardExpiry
                      isMask
                      formatType="custom"
                      placeholder="MM/YY"
                      mask={['M', 'M', 'Y', 'Y']}
                      allowEmptyFormatting
                      customInput={Input as React.ComponentType<unknown>}
                      onChange={onChange}
                      {...{
                        label: 'Expiry Date',
                        variant: 'outline',
                        error: errors?.driverLicenceNumber?.message,
                      }}
                    />
                  )}
                />
              </Flex>
              <UploadFile />
            </Grid>
          </FormGroup>
          <FormGroup
            title="Bussines Name (ABN Name)"
            className="grid-cols-12"
            isLabel
          >
            <Input
              placeholder="Bussines Name "
              {...register('driverLicenceNumber')}
              error={errors.driverLicenceNumber?.message}
              disabled={isView}
            />
          </FormGroup>
          <FormGroup title="ABN Number" className="grid-cols-12" isLabel>
            <Input
              placeholder="ABN Number"
              {...register('driverLicenceNumber')}
              error={errors.driverLicenceNumber?.message}
              disabled={isView}
            />
          </FormGroup>
          <FormGroup title="Tax File" className="grid-cols-12" isLabel>
            <Input
              placeholder="Tax File Number"
              {...register('driverLicenceNumber')}
              error={errors.driverLicenceNumber?.message}
              disabled={isView}
            />
          </FormGroup>
          <FormGroup
            title="Medical Idemnity Insurance"
            className="grid-cols-12"
            isLabel
          >
            <Grid gap="2">
              <Flex gap="2" className="col-span-12">
                <Input
                  placeholder="File Name"
                  {...register('driverLicenceNumber')}
                  error={errors.driverLicenceNumber?.message}
                  disabled={isView}
                  label="File Name"
                />
                <Controller
                  name="driverLicenceNumber"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <CardExpiry
                      isMask
                      formatType="custom"
                      placeholder="MM/YY"
                      mask={['M', 'M', 'Y', 'Y']}
                      allowEmptyFormatting
                      customInput={Input as React.ComponentType<unknown>}
                      onChange={onChange}
                      {...{
                        label: 'Expiry Date',
                        variant: 'outline',
                        error: errors?.driverLicenceNumber?.message,
                      }}
                    />
                  )}
                />
              </Flex>
              <UploadFile useFileName={true} />
            </Grid>
          </FormGroup>
        </div>
        <div className="flex w-full flex-col gap-7">
          <FormGroup title="Regulation" className="grid-cols-12" />
          <FormGroup title="Aphra Registration" isLabel>
            <Input
              placeholder="Aphra Registration"
              {...register('driverLicenceNumber')}
              error={errors.driverLicenceNumber?.message}
              disabled={isView}
            />
          </FormGroup>
          <FormGroup title="WWCC" className="grid-cols-12" isLabel>
            <Grid gap="2">
              <Flex gap="2" className="col-span-12">
                <Controller
                  name="driverLicenceNumber"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <CardExpiry
                      isMask
                      formatType="custom"
                      placeholder="MM/YY"
                      mask={['M', 'M', 'Y', 'Y']}
                      allowEmptyFormatting
                      customInput={Input as React.ComponentType<unknown>}
                      onChange={onChange}
                      {...{
                        label: 'Expiry Date',
                        variant: 'outline',
                        error: errors?.driverLicenceNumber?.message,
                      }}
                    />
                  )}
                />
              </Flex>
              <UploadFile />
            </Grid>
          </FormGroup>
          <FormGroup
            title="CPR/BLS/ALS Certificate"
            className="grid-cols-12"
            isLabel
          >
            <Grid gap="2">
              <Flex gap="2" className="col-span-12">
                {fields.map((data, idx) => {
                  return (
                    <div key={idx} className="w-full">
                      <Controller
                        name="driverLicenceNumber"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <CardExpiry
                            isMask
                            formatType="custom"
                            placeholder="MM/YY"
                            mask={['M', 'M', 'Y', 'Y']}
                            allowEmptyFormatting
                            customInput={Input as React.ComponentType<unknown>}
                            onChange={onChange}
                            {...{
                              label: 'Expiry Date',
                              variant: 'outline',
                              error: errors?.driverLicenceNumber?.message,
                            }}
                          />
                        )}
                      />
                    </div>
                  );
                })}
              </Flex>
              <UploadFile multiple />
            </Grid>
          </FormGroup>
          <FormGroup title="IHI Number">
            <Input
              placeholder="IHI Number"
              {...register('driverLicenceNumber')}
              error={errors.driverLicenceNumber?.message}
              disabled={isView}
            />
          </FormGroup>
        </div>
      </div>
      <FormFooter
        // isLoading={isLoading}
        altBtnText="Cancel"
        submitBtnText="Save"
      />
    </form>
  );
}
