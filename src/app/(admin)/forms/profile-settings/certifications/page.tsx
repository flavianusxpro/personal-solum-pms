'use client';

import { SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
// import { PiClock, PiEnvelopeSimple } from 'react-icons/pi';
import FormGroup from '@/app/shared/form-group';
import {
    defaultValues,
    personalInfoFormSchema,
    PersonalInfoFormTypes,
} from '@/validators/personal-info.schema';
import FormFooter from '@core/components/form-footer';
import { Form } from '@core/ui/form';
import { Input, Text, Textarea } from 'rizzui';
// import UploadZone from '@core/ui/file-upload/upload-zone';
// import { countries, roles, timezones } from '@/data/forms/my-details';
import AvatarUpload from '@core/ui/file-upload/avatar-upload';

// const Select = dynamic(() => import('rizzui').then((mod) => mod.Select), {
//   ssr: false,
//   loading: () => (
//     <div className="grid h-10 place-content-center">
//       <Loader variant="spinner" />
//     </div>
//   ),
// });

// const QuillEditor = dynamic(() => import('@core/ui/quill-editor'), {
//   ssr: false,
// });

export default function Certifications() {
    const onSubmit: SubmitHandler<PersonalInfoFormTypes> = (data) => {
        toast.success(<Text as="b">Successfully added!</Text>);
        console.log('Profile settings data ->', {
            ...data,
        });
    };

    return (
        <Form<PersonalInfoFormTypes>
            validationSchema={personalInfoFormSchema}
            // resetValues={reset}
            onSubmit={onSubmit}
            className="@container"
            useFormProps={{
                mode: 'onChange',
                defaultValues,
            }}
        >
            {({ register, control, setValue, getValues, formState: { errors } }) => {
                return (
                    <div className='pl-1 pr-6'>
                        <div className="mb-10 grid grid-cols-2 gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
                            <div>
                                <FormGroup
                                    title="Field 1"
                                    className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                                >
                                    <Input
                                        placeholder="Field 1"
                                        {...register('first_name')}
                                        error={errors.first_name?.message}
                                        className="flex-grow"
                                    />
                                </FormGroup>
                                <FormGroup
                                    title="Field 2"
                                    className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                                >
                                    <Input
                                        placeholder="Field 2"
                                        {...register('first_name')}
                                        error={errors.first_name?.message}
                                        className="flex-grow"
                                    />
                                </FormGroup>
                                <FormGroup
                                    title="Field 3"
                                    className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                                >
                                    <Input
                                        placeholder="Field 3"
                                        {...register('first_name')}
                                        error={errors.first_name?.message}
                                        className="flex-grow"
                                    />
                                </FormGroup>
                                <FormGroup
                                    title="Field 4"
                                    className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                                >
                                    <Input
                                        placeholder="Field 4"
                                        {...register('first_name')}
                                        error={errors.first_name?.message}
                                        className="flex-grow"
                                    />
                                </FormGroup>
                            </div>
                        </div>
                        <FormFooter
                            // isLoading={isLoading}
                            altBtnText="Cancel"
                            submitBtnText="Save"
                        />
                    </div>
                );
            }}
        </Form>
    );
}
