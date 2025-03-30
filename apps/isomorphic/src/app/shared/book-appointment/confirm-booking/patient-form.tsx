import { patientSchema, PatientSchema } from '@/validators/patient.schema';
import { Controller } from 'react-hook-form';
import CSelect from '../../ui/select';
import { Button, Input } from 'rizzui';
import AdditionalInformation from './additional-information';
import { Form } from '@core/ui/form';
import { genderOption, patientTitle, stateOption } from '@/config/constants';
import { IGetProfileResponse } from '@/types/ApiResponse';

interface PatientFormProps {
  onSubmitPatient: (data: PatientSchema) => void;
  dataProfile?: IGetProfileResponse['data'];
}

const PatientForm: React.FC<PatientFormProps> = ({
  onSubmitPatient,
  dataProfile,
}) => {
  const defaultValues: Partial<PatientSchema> = {
    patientGender: dataProfile?.gender ?? '',
    patientFirstName: dataProfile?.first_name ?? '',
    patientLastName: dataProfile?.last_name ?? '',
    patientEmailAddress: dataProfile?.email ?? '',
    patientMobilePhone: dataProfile?.mobile_number ?? '',
    patienDateBirth: dataProfile?.date_of_birth ?? '',
    // patientState: dataProfile?.state ?? '',
    // patientSuburb: dataProfile?.suburb ?? '',
    // patientPostcode: dataProfile?.postcode ?? '',
    patientAddressLine1: dataProfile?.address ?? '',
    // patientAddressLine2: dataProfile?.address_line_2 ?? '',
    medicareNumber: dataProfile?.medicare_card_number ?? '',
    // medicarePostOnCard: dataProfile?.medicare_post_on_card ?? '',
    medicareExpiryDate: dataProfile?.medicare_expired_date ?? '',
  };

  return (
    <>
      <h3 className="text-lg font-semibold">Add Patient Information</h3>
      <p className="text-sm text-gray-500">
        Fill in the details of the patient who is attending this appointment.
      </p>
      <Form<PatientSchema>
        validationSchema={patientSchema}
        onSubmit={onSubmitPatient}
        useFormProps={{
          mode: 'onChange',
          defaultValues,
        }}
      >
        {({ register, control, formState: { errors } }) => {
          return (
            <>
              <div className="mt-4 space-y-4">
                <div className="grid gap-y-4 md:grid-cols-2 md:gap-6">
                  <Controller
                    name="patientTitle"
                    control={control}
                    render={({ field }) => (
                      <CSelect
                        {...field}
                        label="Title"
                        placeholder="Title"
                        className="group relative z-0 w-full"
                        options={patientTitle}
                        error={errors.patientTitle?.message as string}
                      />
                    )}
                  />
                  <Controller
                    name="patientGender"
                    control={control}
                    render={({ field }) => (
                      <CSelect
                        {...field}
                        label="Gender"
                        placeholder="Gender"
                        className="group relative z-0 w-full"
                        options={genderOption}
                        error={errors.patientGender?.message as string}
                      />
                    )}
                  />
                </div>
                <div className="grid gap-y-4 md:grid-cols-2 md:gap-6">
                  <Input
                    label="First Name"
                    placeholder="First Name"
                    className="group relative z-0 w-full"
                    aria-required={true}
                    {...register('patientFirstName')}
                    error={errors.patientFirstName?.message as string}
                  />
                  <Input
                    label="Last Name"
                    placeholder="Last Name"
                    className="group relative z-0 w-full"
                    {...register('patientLastName')}
                    error={errors.patientLastName?.message as string}
                  />
                </div>
                <div className="grid gap-y-4 md:grid-cols-2 md:gap-6">
                  <Input
                    label="Email Address"
                    placeholder="Email Address"
                    className="group relative z-0 w-full"
                    {...register('patientEmailAddress')}
                    error={errors.patientEmailAddress?.message as string}
                  />
                  <Input
                    label="Mobile Phone"
                    placeholder="Mobile Phone"
                    className="group relative z-0 w-full"
                    type="number"
                    {...register('patientMobilePhone')}
                    error={errors.patientMobilePhone?.message as string}
                  />
                </div>
                <div className="grid gap-y-4 md:grid-cols-2 md:gap-6">
                  <Input
                    label="Date of Birth"
                    placeholder="Date of Birth"
                    className="group relative z-0 w-full"
                    type="date"
                    {...register('patienDateBirth')}
                    error={errors.patienDateBirth?.message as string}
                  />
                  <Controller
                    name="patientState"
                    control={control}
                    render={({ field }) => (
                      <CSelect
                        {...field}
                        label="State"
                        placeholder="State"
                        className="group relative z-0 w-full"
                        options={stateOption}
                        error={errors.patientState?.message as string}
                      />
                    )}
                  />
                </div>
                <div className="grid gap-y-4 md:grid-cols-2 md:gap-6">
                  <Input
                    label="Suburb"
                    placeholder="Suburb"
                    className="group relative z-0 w-full"
                    {...register('patientSuburb')}
                    error={errors.patientSuburb?.message as string}
                  />
                  <Input
                    label="Postcode"
                    placeholder="Postcode"
                    className="group relative z-0 w-full"
                    {...register('patientPostcode')}
                    error={errors.patientPostcode?.message as string}
                  />
                </div>
                <div className="grid gap-y-4 md:grid-cols-2 md:gap-6">
                  <Input
                    label="Address Line 1"
                    placeholder="Address Line 1"
                    className="group relative z-0 w-full"
                    {...register('patientAddressLine1')}
                    error={errors.patientAddressLine1?.message as string}
                  />
                  <Input
                    label="Address Line 2"
                    placeholder="Address Line 2"
                    className="group relative z-0 w-full"
                    {...register('patientAddressLine2')}
                    error={errors.patientAddressLine2?.message as string}
                  />
                </div>
              </div>

              <AdditionalInformation
                register={register}
                control={control}
                errors={errors}
              />

              <Button
                className="mt-4 w-full bg-green-600 text-white"
                type="submit"
              >
                Next
              </Button>
            </>
          );
        }}
      </Form>
    </>
  );
};

export default PatientForm;
