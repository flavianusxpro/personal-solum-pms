'use client';

import ForgetPasswordForm from '@/app/auth/forgot-password/page';
import { PasswordFormTypes } from '@/validators/password-settings.schema';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';

export default function PasswordSettingsView({
  settings,
}: {
  settings?: PasswordFormTypes;
}) {
  const [isLoading, setLoading] = useState(false);
  const [reset, setReset] = useState({});

  const onSubmit: SubmitHandler<PasswordFormTypes> = (data) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log('Password settings data ->', data);
      setReset({
        currentPassword: '',
        newPassword: '',
        confirmedPassword: '',
      });
    }, 600);
  };

  return (
    <div className="relativve my-8 ml-2 w-1/2">
      <ForgetPasswordForm />
    </div>
  );
}
