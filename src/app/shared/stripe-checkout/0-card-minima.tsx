// This example shows you how to set up React Stripe.js and use Elements.
// Learn how to accept a payment using the official Stripe docs.
// https://stripe.com/docs/payments/accept-a-payment#web

import React, { use, useEffect, useState } from 'react';
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

import { Button, Text } from 'rizzui';
import toast from 'react-hot-toast';
import {
  useBookAppoinment,
  useOneTimePayment,
} from '@/hooks/useBookAppoinment';
import bookAppointmentAtom from '@/store/book-appointment';
import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';

function CheckoutForm({
  elements,
  stripe,
  onSuccess,
}: {
  elements: StripeElements | null;
  stripe: Stripe | null;
  onSuccess: () => void;
}) {
  const router = useRouter();
  const [error, setError] = useState<StripeError | null>(null);
  const [bookAppointmentValue] = useAtom(bookAppointmentAtom);

  const { mutate: mutateOneTimePayment, isPending: isPendingOneTimePayment } =
    useOneTimePayment();
  const { mutate: mutateBookAppointment, isPending: isPendingBookAppoinment } =
    useBookAppoinment();

  useEffect(() => {
    if (error?.message) {
      toast.error(error?.message);
    }
  }, [error]);

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    // Block native form submission.
    const appointmentType = bookAppointmentValue?.step3?.includes('Follow up');
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
      console.log('[PaymentMethod]', paymentMethod);
      mutateOneTimePayment(
        { amount: 10000, payment_method: paymentMethod.id },
        {
          onSuccess: (response) => {
            toast.success('Payment successful');
            mutateBookAppointment(
              {
                doctorId: bookAppointmentValue.doctor?.id as number,
                patient_problem: bookAppointmentValue.step3 as string,
                patient_type: bookAppointmentValue.step1 as string,
                additional_information: {},
                date: `${bookAppointmentValue.appointmentDate} ${bookAppointmentValue.doctor?.doctorTime?.split(' ')[0]}`,
                payment_id: response.data.id,
                clinicId: bookAppointmentValue.clinic?.id as number,
                appointment_type: appointmentType ? 'FOLLOWUP' : 'INITIAL',
              },
              {
                onSuccess: () => {
                  toast.success('Booking successful');
                  onSuccess();
                },
                onError: (error: any) => {
                  toast.error('Booking failed: ' + error.response.data.message);
                },
              }
            );
          },
          onError: (error: any) => {
            console.log('🚀 ~ handleSubmit ~ error:', error);
            toast.error('Payment failed: ' + error.response.data.message);
          },
        }
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        className="rounded-md border border-gray-300 p-2"
        options={{
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
      <div className="mt-4 w-full text-center">
        <Button
          isLoading={isPendingBookAppoinment || isPendingOneTimePayment}
          type="submit"
          disabled={!stripe}
        >
          Pay Now
        </Button>
      </div>
      {error && <div style={{ color: 'red' }}>{error?.message}</div>}
    </form>
  );
}

function InjectedCheckoutForm({ onSuccess }: { onSuccess: () => void }) {
  return (
    <ElementsConsumer>
      {({ elements, stripe }) => (
        <>
          <Text fontWeight="bold" className="text-xl">
            Payment
          </Text>
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

const CardMinimal0 = ({ onSuccess }: { onSuccess: () => void }) => {
  return (
    <Elements stripe={stripePromise}>
      <InjectedCheckoutForm onSuccess={onSuccess} />
    </Elements>
  );
};

export default CardMinimal0;
