import { Flex, Input, Switch } from 'rizzui';
import FormGroup from '../../form-group';
import { Form } from '@/core/ui/form';
import { Controller, SubmitHandler } from 'react-hook-form';
import {
  SettingsDoctorSchema,
  settingsDoctorSchema,
} from '@/validators/settings-doctor.schema';
import FormFooter from '@/core/components/form-footer';
import CNumberInput from '@/core/ui/number-input';

export default function TabSettings({ isView = false }: { isView?: boolean }) {
  const onSubmit: SubmitHandler<SettingsDoctorSchema> = (data) => {};
  return (
    <div>
      <Form<SettingsDoctorSchema>
        validationSchema={settingsDoctorSchema}
        // resetValues={reset}
        onSubmit={onSubmit}
        className="@container"
        useFormProps={{
          mode: 'onChange',
        }}
      >
        {({
          register,
          control,
          setValue,
          getValues,
          formState: { errors },
        }) => {
          return (
            <>
              <div className="flex flex-col gap-7">
                <FormGroup title="Settings" />
                <FormGroup title="Meeting Type">
                  <Flex gap="4">
                    <Input
                      {...register('microsoft_team_link')}
                      label="Teams Link"
                      placeholder="Teams Link"
                      error={errors.microsoft_team_link?.message}
                      className="w-full"
                      type="url"
                      disabled={isView}
                    />
                    <Input
                      {...register('microsoft_team_id')}
                      label="Teams ID"
                      placeholder="Teams ID"
                      error={errors.microsoft_team_id?.message}
                      className="w-full"
                      disabled={isView}
                    />
                    <Input
                      {...register('microsoft_team_passcode')}
                      label="Teams Passcode"
                      placeholder="Teams Passcode"
                      error={errors.microsoft_team_passcode?.message}
                      className="w-full"
                      disabled={isView}
                    />
                  </Flex>

                  <Flex gap="4">
                    <Input
                      {...register('zoom_meeting_link')}
                      label="Zoom"
                      placeholder="Zoom"
                      error={errors.zoom_meeting_link?.message}
                      className="w-full"
                      type="url"
                      disabled={isView}
                    />
                    <Input
                      {...register('zoom_meeting_id')}
                      label="Zoom ID"
                      placeholder="Zoom ID"
                      error={errors.zoom_meeting_id?.message}
                      className="w-full"
                      disabled={isView}
                    />
                    <Input
                      {...register('zoom_meeting_passcode')}
                      label="Zoom Passcode"
                      placeholder="Zoom Passcode"
                      error={errors.zoom_meeting_passcode?.message}
                      className="w-full"
                      disabled={isView}
                    />
                  </Flex>
                  <Input
                    {...register('skype')}
                    label="Skype"
                    placeholder="Skype"
                    error={errors.skype?.message}
                    className="w-full"
                    type="url"
                    disabled={isView}
                  />
                  <Switch
                    label="Face to Face"
                    {...register('f2f')}
                    checked={getValues('f2f')}
                    onChange={(e) => {
                      setValue('f2f', e.target.checked);
                    }}
                    error={errors.f2f?.message}
                    className="w-full"
                    disabled={isView}
                  />
                  <Switch
                    label="Tele Health"
                    {...register('teleHealth')}
                    checked={getValues('teleHealth')}
                    onChange={(e) => {
                      setValue('teleHealth', e.target.checked);
                    }}
                    error={errors.teleHealth?.message}
                    className="w-full"
                    disabled={isView}
                  />
                </FormGroup>

                <FormGroup title="Qualification">
                  <Input
                    {...register('field1')}
                    label="Field 1"
                    placeholder="Field 1"
                    error={errors.field1?.message}
                    className="w-full"
                    disabled={isView}
                  />
                  <Input
                    {...register('field2')}
                    label="Field 2"
                    placeholder="Field 2"
                    error={errors.field2?.message}
                    className="w-full"
                    disabled={isView}
                  />
                  <Input
                    {...register('field3')}
                    label="Field 3"
                    placeholder="Field 3"
                    error={errors.field3?.message}
                    className="w-full"
                    disabled={isView}
                  />
                  <Input
                    {...register('field4')}
                    label="Field 4"
                    placeholder="Field 4"
                    error={errors.field4?.message}
                    className="w-full"
                    disabled={isView}
                  />
                </FormGroup>

                <FormGroup title="Cost Setup">
                  <Controller
                    name="fee"
                    control={control}
                    render={({ field }) => (
                      <CNumberInput
                        {...field}
                        label="Fee"
                        placeholder="Fee"
                        error={errors.fee?.message}
                        disabled={isView}
                      />
                    )}
                  />
                  <Controller
                    name="cancellation_fee"
                    control={control}
                    render={({ field }) => (
                      <CNumberInput
                        {...field}
                        label="Cancellation Fee"
                        placeholder="Cancellation Fee"
                        error={errors.cancellation_fee?.message}
                        disabled={isView}
                      />
                    )}
                  />
                  <Controller
                    name="initial_appointment_fee"
                    control={control}
                    render={({ field }) => (
                      <CNumberInput
                        {...field}
                        label="Initial Appointment Fee"
                        placeholder="Initial Appointment Fee"
                        error={errors.initial_appointment_fee?.message}
                        disabled={isView}
                      />
                    )}
                  />
                  <Controller
                    name="follow_up_appointment_fee"
                    control={control}
                    render={({ field }) => (
                      <CNumberInput
                        {...field}
                        label="Follow Up Appointment Fee"
                        placeholder="Follow Up Appointment Fee"
                        error={errors.follow_up_appointment_fee?.message}
                        disabled={isView}
                      />
                    )}
                  />
                </FormGroup>
              </div>
              <FormFooter altBtnText="Cancel" submitBtnText="Save" />
            </>
          );
        }}
      </Form>
    </div>
  );
}
