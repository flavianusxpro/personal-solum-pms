import AuthWrapper from '@/app/shared/auth-layout/auth-wrapper';
import { Text } from 'rizzui';
import OtpForm from '@/app/auth/otp/otp-form';

export default function OtpPage() {
  return (
    <AuthWrapper title="OTP Verification" className="md:px-14 lg:px-20">
      <OtpForm />
    </AuthWrapper>
  );
}
