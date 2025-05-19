'use client';
import CardMinimal0 from './0-card-minima';

export default function StripeCheckout({
  onSuccess,
}: {
  onSuccess: (paymentId: string) => void;
}) {
  return <CardMinimal0 onSuccess={onSuccess} />;
}
