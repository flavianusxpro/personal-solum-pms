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
import { Loader, Switch, Text } from 'rizzui';
// import UploadZone from '@core/ui/file-upload/upload-zone';
// import { countries, roles, timezones } from '@/data/forms/my-details';
// import AvatarUpload from '@core/ui/file-upload/avatar-upload';

const types: any = [
    {
        label: 'SSL',
        value: 'SSL',
    },
    {
        label: 'TLS',
        value: 'TLS',
    },
    {
        label: 'STARTTLS',
        value: 'STARTTLS',
    },
    {
        label: 'No Security',
        value: 'No Security',
    },
];

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

export default function Payment() {
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
                        <FormGroup
                            title="Card Payment"
                            description="Update your photo and personal details here"
                            className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                        />

                        <div className="mb-10 grid grid-cols-2 gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
                            <div>
                                <div className='flex items-center gap-4'>
                                    <Switch
                                        label="Stripe"
                                        variant="flat"
                                        labelClassName="font-medium text-sm text-gray-900"
                                    />
                                    <Switch
                                        label="Tryo"
                                        variant="flat"
                                        labelClassName="font-medium text-sm text-gray-900"
                                    />
                                </div>
                            </div>
                        </div>

                        <FormGroup
                            title="Eftpos/Cash"
                            description="Update your photo and personal details here"
                            className="pt-7 @2xl:pt-9 border-t border-t-slate-300 mt-4 @3xl:grid-cols-12 @3xl:pt-11"
                        />

                        <div className="mb-10 grid grid-cols-2 gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
                            <div className='flex items-center gap-4'>
                                <Switch
                                    label="Eftpos"
                                    variant="flat"
                                    labelClassName="font-medium text-sm text-gray-900"
                                />
                                <Switch
                                    label="Cash"
                                    variant="flat"
                                    labelClassName="font-medium text-sm text-gray-900"
                                />
                            </div>
                        </div>

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
