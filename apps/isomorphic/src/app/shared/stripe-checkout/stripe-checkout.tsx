'use client';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import StripeCheckoutForm from './stripe-checkout-form';
import CardMinimal0 from './0-card-minima';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY as string);

export default function StripeCheckout({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  return (
    <CardMinimal0 onSuccess={onSuccess} />
    // <Elements
    //   stripe={stripePromise}
    //   options={{ mode: 'payment', amount: 10000, currency: 'aud' }}
    // >
    //   <StripeCheckoutForm amount={10000} />
    // </Elements>
  );
}
