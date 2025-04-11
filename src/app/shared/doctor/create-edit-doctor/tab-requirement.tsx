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
import { ActionIcon, Button, Flex, Grid, Input, Text, Tooltip } from 'rizzui';
import { zodResolver } from '@hookform/resolvers/zod';
import CardExpiry from '@/app/shared/ui/card-expiry';
import UploadFile from '@/app/shared/ui/modal-button/modal-upload-file-button';
import { PiPencil, PiTrashBold } from 'react-icons/pi';
import Divider from '../../ui/divider';
import FileItem from '../../ui/file/file-item';

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

  const {
    fields: fieldsCpr,
    append: appendCpr,
    remove: removeCpr,
  } = useFieldArray({
    control,
    name: 'cpr',
  });

  const {
    fields: fieldsAsic,
    append: appendAsic,
    remove: removeAsic,
  } = useFieldArray({
    control,
    name: 'asic',
  });

  const onSubmit: SubmitHandler<RequirementDoctorTypes> = (data) => {
    console.log('🚀 ~ data:', data);
  };

  const handleUploadAsic = async (files: File[], expiryDate?: string) => {
    if (files.length > 0) {
      const fileName = files[0].name;
      const fileExpiryDate = expiryDate || 'No Expiry Date';
      appendAsic({
        file: {
          name: fileName,
          url: URL.createObjectURL(files[0]),
          size: files[0].size,
          type: files[0].type,
        },
        expiryDate: fileExpiryDate,
      });
    }
  };
  const handleUploadCpr = async (files: File[], expiryDate?: string) => {
    if (files.length > 0) {
      const fileName = files[0].name;
      const fileExpiryDate = expiryDate || 'No Expiry Date';
      appendCpr({
        file: {
          name: fileName,
          url: URL.createObjectURL(files[0]),
          size: files[0].size,
          type: files[0].type,
        },
        expiryDate: fileExpiryDate,
      });
    }
  };

  return (
    <form className="@container" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 gap-x-7 pb-10">
        <div className="section-container">
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
              </Flex>
              <UploadFile size="sm" />
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
              <UploadFile size="sm" />
            </Grid>
          </FormGroup>
          <FormGroup
            title="Qualification Certificate"
            className="grid-cols-12"
            isLabel
          >
            <Grid gap="2">
              {fieldsAsic.map((data, idx) => {
                return (
                  <FileItem
                    key={idx}
                    file={{
                      ...data.file,
                      expiryDate: data.expiryDate,
                    }}
                    onDelete={() => removeAsic(idx)}
                    onEdit={() => {}}
                  />
                );
              })}
              <UploadFile
                size="sm"
                handleUpload={handleUploadAsic}
                useFileName
              />
            </Grid>
          </FormGroup>
          <FormGroup title="Police Check" className="grid-cols-12" isLabel>
            <Grid gap="2">
              {fieldsAsic.map((data, idx) => {
                return (
                  <FileItem
                    key={idx}
                    file={{
                      ...data.file,
                      expiryDate: data.expiryDate,
                    }}
                    onDelete={() => removeAsic(idx)}
                    onEdit={() => {}}
                  />
                );
              })}
              <UploadFile
                size="sm"
                handleUpload={handleUploadAsic}
                useFileName
                useExpireDate
              />
            </Grid>
          </FormGroup>
        </div>

        <Divider className="col-span-full" />

        {/* Bussines & Insurance */}
        <div className="section-container">
          <FormGroup title="Bussines & Insurance" className="grid-cols-12" />
          <FormGroup title="Asic Document" className="grid-cols-12" isLabel>
            <Grid gap="2">
              {fieldsAsic.map((data, idx) => {
                return (
                  <FileItem
                    key={idx}
                    file={{
                      ...data.file,
                      expiryDate: data.expiryDate,
                    }}
                    onDelete={() => removeAsic(idx)}
                    onEdit={() => {}}
                  />
                );
              })}
              <UploadFile
                size="sm"
                handleUpload={handleUploadAsic}
                useExpireDate
                useFileName
              />
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
              {fieldsAsic.map((data, idx) => {
                return (
                  <FileItem
                    key={idx}
                    file={{
                      ...data.file,
                      expiryDate: data.expiryDate,
                    }}
                    onDelete={() => removeAsic(idx)}
                    onEdit={() => {}}
                  />
                );
              })}
              <UploadFile
                size="sm"
                handleUpload={handleUploadAsic}
                useExpireDate
              />
            </Grid>
          </FormGroup>
        </div>

        <Divider className="col-span-full" />

        <div className="section-container">
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
              {fieldsAsic.map((data, idx) => {
                return (
                  <FileItem
                    key={idx}
                    file={{
                      ...data.file,
                      expiryDate: data.expiryDate,
                    }}
                    onDelete={() => removeAsic(idx)}
                    onEdit={() => {}}
                  />
                );
              })}
              <UploadFile
                size="sm"
                handleUpload={handleUploadAsic}
                useExpireDate
              />
            </Grid>
          </FormGroup>
          <FormGroup
            title="CPR/BLS/ALS Certificate"
            className="grid-cols-12"
            isLabel
          >
            <Grid gap="2">
              {fieldsCpr.map((data, idx) => {
                return (
                  <FileItem
                    key={idx}
                    file={{
                      ...data.file,
                      expiryDate: data.expiryDate,
                    }}
                    onDelete={() => removeCpr(idx)}
                    onEdit={() => {}}
                  />
                );
              })}
              <UploadFile
                size="sm"
                handleUpload={handleUploadCpr}
                useExpireDate
              />
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

        <Divider className="col-span-full" />

        <div className="section-container">
          <FormGroup title="Contract" className="grid-cols-12" />
          <Grid gap="2">
            {fieldsAsic.map((data, idx) => {
              return (
                <FileItem
                  key={idx}
                  file={{
                    ...data.file,
                    expiryDate: data.expiryDate,
                  }}
                  onDelete={() => removeAsic(idx)}
                  onEdit={() => {}}
                />
              );
            })}
            <UploadFile
              size="sm"
              handleUpload={handleUploadAsic}
              useExpireDate
              useFileName
            />
          </Grid>
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
