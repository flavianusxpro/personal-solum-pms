'use client';
import CardMinimal0 from './0-card-minima';

export default function StripeCheckout({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  return <CardMinimal0 onSuccess={onSuccess} />;
}
