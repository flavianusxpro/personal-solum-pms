'use client';

import dynamic from 'next/dynamic';
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
import { Input, Loader, Text, Textarea } from 'rizzui';
// import UploadZone from '@core/ui/file-upload/upload-zone';
// import { countries, roles, timezones } from '@/data/forms/my-details';
import AvatarUpload from '@core/ui/file-upload/avatar-upload';

const Select = dynamic(() => import('rizzui').then((mod) => mod.Select), {
    ssr: false,
    loading: () => (
        <div className="grid h-10 place-content-center">
            <Loader variant="spinner" />
        </div>
    ),
});

const QuillEditor = dynamic(() => import('@core/ui/quill-editor'), {
    ssr: false,
});

export default function Setup() {
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
                    <>
                        <FormFooter
                            // isLoading={isLoading}
                            altBtnText="Cancel"
                            submitBtnText="Save"
                        />
                    </>
                );
            }}
        </Form>
    );
}
