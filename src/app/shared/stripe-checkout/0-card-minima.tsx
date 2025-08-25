import React, { useEffect, useState } from 'react';
import {
  loadStripe,
  StripeError,
  Stripe,
  StripeElements,
} from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  ElementsConsumer,
} from '@stripe/react-stripe-js';

import { Button } from 'rizzui';
import toast from 'react-hot-toast';
import { useOneTimePayment } from '@/hooks/useBookAppoinment';
import { useAtom } from 'jotai';

function CheckoutForm({
  elements,
  stripe,
  onSuccess,
}: {
  elements: StripeElements | null;
  stripe: Stripe | null;
  onSuccess: (paymentId: string) => void;
}) {
  const [error, setError] = useState<StripeError | null>(null);

  const { mutate: mutateOneTimePayment, isPending: isPendingOneTimePayment } =
    useOneTimePayment();

  useEffect(() => {
    if (error?.message) {
      toast.error(error?.message);
    }
  }, [error]);

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error: errorFromStripe, paymentMethod } =
      await stripe.createPaymentMethod({
        type: 'card',
        card,
      });

    if (errorFromStripe) {
      setError(errorFromStripe);
    } else {
      setError(null);
      onSuccess(paymentMethod.id);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        className="rounded-md border border-gray-300 p-2"
        options={{
          hidePostalCode: true,
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      {error && <div style={{ color: 'red' }}>{error?.message}</div>}
      <div className="mt-4 w-full text-center">
        <Button
          isLoading={isPendingOneTimePayment}
          type="submit"
          disabled={!stripe}
        >
          Pay Now
        </Button>
      </div>
    </form>
  );
}

function InjectedCheckoutForm({
  onSuccess,
}: {
  onSuccess: (paymentId: string) => void;
}) {
  return (
    <ElementsConsumer>
      {({ elements, stripe }) => (
        <>
          <CheckoutForm
            onSuccess={onSuccess}
            elements={elements}
            stripe={stripe}
          />
        </>
      )}
    </ElementsConsumer>
  );
}

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY as string);

const CardMinimal0 = ({
  onSuccess,
}: {
  onSuccess: (paymentId: string) => void;
}) => {
  return (
    <Elements stripe={stripePromise}>
      <InjectedCheckoutForm onSuccess={onSuccess} />
    </Elements>
  );
};

export default CardMinimal0;
