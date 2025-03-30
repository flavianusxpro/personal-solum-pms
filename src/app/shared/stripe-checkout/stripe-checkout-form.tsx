'use client';
import { useEffect, useState } from 'react';
import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { Button } from 'rizzui';
import { useCheckout } from '@/hooks/useCheckout';
import toast from 'react-hot-toast';

interface IProps {
  amount: number;
}

export function StripeCheckoutForm({ amount }: IProps) {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState<string>();
  const [error, setError] = useState<string>();

  const { mutate } = useCheckout();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) return;

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setError(submitError.message);
      setLoading(false);
      return;
    }

    const { error: paymentError } = await stripe.confirmPayment({
      elements,
      // clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/concent-form`,
      },
    });

    if (paymentError) {
      setError(paymentError.message);
      setLoading(false);
      return;
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!stripe) return;

    mutate(
      { amount },
      {
        onSuccess: (data: any) => {
          console.log('🚀 ~ handleSubmit ~ data:', data);
          setClientSecret(data.paymentIntent.client_secret);
        },
        onError: (error: any) => {
          console.log('🚀 ~ handleSubmit ~ error:', error);
        },
      }
    );
  }, [stripe, amount, mutate]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      {error && <p className="text-red-500">{error}</p>}
      <Button type="submit" className="w-full" disabled={!stripe || loading}>
        {loading ? 'Processing...' : 'Submit Payment'}
      </Button>
    </form>
  );
}

export default StripeCheckoutForm;
