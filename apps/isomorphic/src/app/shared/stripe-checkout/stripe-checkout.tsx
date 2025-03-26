'use client';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import StripeCheckoutForm from './stripe-checkout-form';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY as string);

export default function StripeCheckout() {
  return (
    <Elements
      stripe={stripePromise}
      options={{ mode: 'payment', amount: 10000, currency: 'aud' }}
    >
      <StripeCheckoutForm amount={10000} />
    </Elements>
  );
}
