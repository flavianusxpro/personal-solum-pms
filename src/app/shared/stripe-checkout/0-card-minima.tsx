import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
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

export type CardMinimal0Ref = {
  handleSubmit: () => Promise<void>;
};

function CheckoutForm(
  {
    elements,
    stripe,
    onSuccess,
  }: {
    elements: StripeElements | null;
    stripe: Stripe | null;
    onSuccess: (paymentId: string) => void;
  },
  ref: React.Ref<CardMinimal0Ref>
) {
  const [error, setError] = useState<StripeError | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (error?.message) {
      toast.error(error?.message);
    }
  }, [error]);

  // const handleSubmit = async (event: { preventDefault: () => void }) => {
  //   setIsLoading(true);
  //   // Block native form submission.
  //   event.preventDefault();

  //   if (!stripe || !elements) {
  //     // Stripe.js has not loaded yet. Make sure to disable
  //     // form submission until Stripe.js has loaded.
  //     return;
  //   }

  //   const card = elements.getElement(CardElement);

  //   if (card == null) {
  //     return;
  //   }

  //   const { error: errorFromStripe, paymentMethod } =
  //     await stripe.createPaymentMethod({
  //       type: 'card',
  //       card,
  //     });

  //   if (errorFromStripe) {
  //     setError(errorFromStripe);
  //   } else {
  //     setError(null);
  //     onSuccess(paymentMethod.id);
  //   }
  //   setIsLoading(false);
  // };

  useImperativeHandle(ref, () => ({
    handleSubmit: async () => {
      if (!stripe || !elements) {
        toast.error('Stripe belum siap');
        return;
      }

      setIsLoading(true);
      const card = elements.getElement(CardElement);
      if (!card) return;

      const { error: errorFromStripe, paymentMethod } =
        await stripe.createPaymentMethod({
          type: 'card',
          card,
        });

      if (errorFromStripe) {
        toast.error(errorFromStripe.message || 'Payment failed');
        setError(errorFromStripe);
      } else {
        setError(null);
        toast.success('Payment successful');
        onSuccess(paymentMethod.id);
      }
      setIsLoading(false);
    },
  }));
  return (
    <div>
      {/* // <form onSubmit={handleSubmit}> */}
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
      {/* <div className="mt-4 w-full">
        <Button
          className="w-full bg-[#3666AA] px-[16px] py-[12px] text-[14px] font-semibold text-white"
          isLoading={isLoading}
          type="submit"
          disabled={!stripe}
        >
          Pay Now
        </Button>
      </div> */}
      {/* // </form> */}
    </div>
  );
}

const ForwardedCheckoutForm = forwardRef(CheckoutForm);

function InjectedCheckoutForm(
  {
    onSuccess,
  }: {
    onSuccess: (paymentId: string) => void;
  },
  ref: React.Ref<CardMinimal0Ref>
) {
  return (
    <ElementsConsumer>
      {({ elements, stripe }) => (
        <>
          {/* <CheckoutForm
            onSuccess={onSuccess}
            elements={elements}
            stripe={stripe}
          /> */}
          <ForwardedCheckoutForm
            ref={ref}
            elements={elements}
            stripe={stripe}
            onSuccess={onSuccess}
          />
        </>
      )}
    </ElementsConsumer>
  );
}

const ForwardedInjectedCheckoutForm = forwardRef(InjectedCheckoutForm);
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY as string);

const CardMinimal0 = forwardRef<
  CardMinimal0Ref,
  { onSuccess: (id: string) => void }
>(({ onSuccess }, ref) => (
  <Elements stripe={stripePromise}>
    <ForwardedInjectedCheckoutForm ref={ref} onSuccess={onSuccess} />
  </Elements>
));

CheckoutForm.displayName = 'CheckoutForm';
InjectedCheckoutForm.displayName = 'InjectedCheckoutForm';
ForwardedCheckoutForm.displayName = 'ForwardedCheckoutForm';
ForwardedInjectedCheckoutForm.displayName = 'ForwardedInjectedCheckoutForm';
CardMinimal0.displayName = 'CardMinimal0';
export default CardMinimal0;
