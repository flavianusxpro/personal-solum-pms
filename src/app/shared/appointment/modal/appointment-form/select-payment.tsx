'use client';

import { AiOutlineFileDone } from 'react-icons/ai';
import { CgCreditCard, CgLink } from 'react-icons/cg';
import Footer from './footer';
import React, { useMemo, useState } from 'react';
import { Button, Input, NumberInput, Title } from 'rizzui';
import { PAYMENT_SUMMARY } from './appointment-form';
import cn from '@/core/utils/class-names';
import { useAtom } from 'jotai';
import { currencyAtom } from '@/store/currency';
import { useCouponCodeValidation } from '@/hooks/useCoupon';
import { formDataAtom } from '.';
import toast from 'react-hot-toast';
import { IPayloadPostAppoinment } from '@/types/paramTypes';
import { usePostCreateAppointment } from '@/hooks/useAppointment';
import CardMinimal0 from '@/app/shared/stripe-checkout/0-card-minima';
import CheckCircleIcon from '@/core/components/icons/check-circle';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { LiaCcAmex, LiaApplePay, LiaWalletSolid, LiaCcApplePay } from "react-icons/lia";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import "dayjs/locale/id";
import { FaApplePay, FaGooglePay, FaMoneyBill, FaPaypal } from 'react-icons/fa6';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("id");

const STEP = {
  ESTIMATE_COST: 'estimate-cost',
  PAYMENT: 'payment',
  CONFIRM: 'confirm',
};

export default function AppointmentPayment() {
  const [currencyData] = useAtom(currencyAtom);
  const [showSaveButton, setShowSaveButton] = useState(true);
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'link'>('card');
  const [formData] = useAtom(formDataAtom);
  const [inputCouponCode, setInputCouponCode] = React.useState('');
  const [step, setStep] = React.useState(STEP.ESTIMATE_COST);
  const { closeModal } = useModal();

  const { mutate: mutateCouponValidation, data: dataCoupon } =
    useCouponCodeValidation();

  const couponValue = useMemo(() => {
    if (dataCoupon?.data?.discount_type === 'percent') {
      return `${dataCoupon.data.discount_amount}%`;
    } else if (dataCoupon?.data?.discount_type === 'fix') {
      return `$${dataCoupon.data.discount_amount}`;
    }
    return '-';
  }, [dataCoupon]);

  const totalValue = useMemo(() => {
    if (dataCoupon?.data?.discount_type === 'percent') {
      return (
        Number(formData.fee) -
        (Number(formData.fee) * Number(dataCoupon.data.discount_amount)) / 100
      );
    } else if (dataCoupon?.data?.discount_type === 'fix') {
      return Number(formData.fee) - Number(dataCoupon.data.discount_amount);
    }
    return formData.fee;
  }, [dataCoupon, formData.fee]);

  function couponValidation(couponCode: string) {
    mutateCouponValidation(couponCode, {
      onSuccess: () => {
        toast.success('Coupon code applied successfully');
      },
      onError: (error: any) => {
        toast.error('Invalid coupon code: ' + error.response.data.message);
      },
    });
  }

  const { mutate } = usePostCreateAppointment();

  const successPayment = (payment_method: string) => {
    const payload: IPayloadPostAppoinment = {
      clinicId: formData.clinicId as number,
      doctorId: formData.doctorId as number,
      date: `${dayjs(formData.date).format('YYYY-MM-DD')} ${formData.doctorTime}`,
      note: formData.note,
      patient_problem: formData.patient_problem,
      patient_type: formData.treatment,
      payment_method: payment_method,
      meeting_preference: 'ZOOM',
      patientId: formData.patient_id as number,
      additional_information: { note: formData.note },
    };

    mutate(payload, {
      onSuccess: () => {
        setStep(STEP.CONFIRM);
        toast.success('Booking successful!');
      },
      onError: (error: any) => {
        toast.error('Booking failed: ' + error.response.data.message);
      },
    });
  };

  const convertTime = (
    date: string,
    time: string,
    fromTz: string,
    toTz: string
  ): { date: string; time: string } => {
    const sourceTime = dayjs.tz(`${date} ${time}`, "YYYY-MM-DD HH:mm", fromTz);
    const targetTime = sourceTime.tz(toTz);

    return {
      date: targetTime.format("DD MMMM YYYY"),
      time: targetTime.format("hh:mm A"),
    };
  };


  return (
    <>
      {step == STEP.ESTIMATE_COST && (
        <div>
          <div className="flex flex-col md:flex-row h-[549px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800 justify-between">
            <div className="flex h-full bg-[#3666AA08] flex-1 flex-col p-5">
              <div className="flex flex-1 flex-col border-b boorder-[1px]">
                <h1 className="text-[14px] font-bold">Patient Summary</h1>
                <div className='flex flex-col'>
                  <h3 className='text-[12px] font-bold'>
                    {formData.patient_name}
                  </h3>
                  <p className='text-[12px]'>
                    {formData.patient_address ?? '-'}
                  </p>
                  <p className='text-[12px]'>
                    {formData.patient_mobile_number ?? '-'} (Indonesia)
                  </p>
                  <p className="text-[12px]">
                    {convertTime(formData.date, formData.doctorTime, "Australia/Sydney", "Asia/Jakarta").date} -{" "}
                    <strong>{convertTime(formData.date, formData.doctorTime, "Australia/Sydney", "Asia/Jakarta").time}</strong> Jakarta Time
                  </p>
                </div>
              </div>

              <div className="flex flex-1 flex-col border-b boorder-[1px]">
                <h1 className="text-[14px] font-semibold">Booking Summary</h1>
                <div className='flex flex-col'>
                  <h3 className='text-[12px] font-bold'>
                    Dr. {formData.doctor_name} - {formData.treatment}
                  </h3>
                  <p className="text-[12px]">
                    {convertTime(formData.date, formData.doctorTime, "Australia/Sydney", "Australia/Sydney").date} -{" "}
                    <strong>{convertTime(formData.date, formData.doctorTime, "Australia/Sydney", "Australia/Sydney").time}</strong> Sydney Time
                  </p>
                  <p className='text-[12px]'>
                    Booking Via <strong>Zoom</strong>
                  </p>
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex mt-2 mb-2 gap-[10px]">
                  <div className='flex flex-1 flex-col'>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#3666AA1A]">
                      <AiOutlineFileDone className="text-xl" />
                    </span>

                    <h1 className="text-[12px] font-semibold">
                      PAYMENT REQUIRED
                    </h1>
                    <p className='text-[12px]'>
                      We require a payment method before your appointment can be
                      confirmed.
                    </p>
                  </div>

                  <div className='flex flex-1 flex-col'>
                    <div className='flex gap-3'>
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#3666AA1A]">
                        <LiaWalletSolid className="text-xl" />
                      </span>

                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#3666AA1A]">
                        <LiaCcAmex className="text-xl" />
                      </span>

                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#3666AA1A]">
                        <FaApplePay className="text-xl" />
                      </span>

                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#3666AA1A]">
                        <FaGooglePay className="text-xl" />
                      </span>
                    </div>

                    <h1 className="text-[12px] font-semibold">
                      SURCHARGE CREDIT CARD
                    </h1>
                    <p className='text-[12px]'>
                      A processing fee of 2.9% + $0.30 applies. Including American Express, Visa, Mastercard, Apple Pay, Google Pay
                    </p>
                  </div>
                </div>

                <div className="flex gap-[10px]">
                  <div className='flex flex-1 flex-col'>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#3666AA1A]">
                      <FaPaypal className="text-xl" />
                    </span>

                    <h1 className="text-[12px] font-semibold">
                      Paypal Free
                    </h1>
                    <p className='text-[12px]'>
                      An additional fee applies when paying with PayPal.
                    </p>
                  </div>

                  <div className='flex flex-1 flex-col'>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#3666AA1A]">
                      <FaMoneyBill className="text-xl" />
                    </span>

                    <h1 className="text-[12px] font-semibold">
                      Pay Later Fee
                    </h1>
                    <p className='text-[12px]'>
                      An additional fee applies when choosing the Pay Later option.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-1 h-full flex-col bg-white p-5">
              <div className="flex flex-col">
                <h1 className="text-[14px] font-medium">SUMMARY</h1>
                <div className="flex flex-col">
                  {PAYMENT_SUMMARY.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <h2 className="text-[12px] font-medium text-[#777777]">
                        {item.label}
                      </h2>
                      <p className="text-[14px] font-medium">
                        {item.label === 'Sub Total'
                          ? `${currencyData.active.symbol} ${Number(formData.fee)}`
                          : item.label === 'Merchant Fee'
                            ? `${currencyData.active.symbol}-`
                            : item.label === 'Coupon'
                              ? `${couponValue ?? '-'}`
                              : null}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter Cupon Code"
                    className="flex-1"
                    onChange={(e) => setInputCouponCode(e.target.value)}
                    value={inputCouponCode}
                  />
                  <Button
                    className="rounded-[6px] bg-[#3666AA] px-[16px] py-[12px] text-[14px] font-semibold text-white"
                    onClick={() => couponValidation(inputCouponCode)}
                  >
                    Apply
                  </Button>
                </div>
                <div className="mt-2 w-full border-[1px] border-t border-[#00000026]/15"></div>
                <div className="flex justify-between items-center">
                  <h1 className="text-[14px] font-medium">Total Cost</h1>
                  <p className="text-[14px] font-medium">
                    {currencyData.active.symbol}
                    {Number(totalValue)}
                  </p>  
                </div>
              </div>

              <div className="flex flex-col mt-4">
                <h1 className="text-[14px] font-medium">PAYMENT</h1>
                <div className="pt-4">
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setSelectedMethod('card')}
                      className={`flex h-[69px] flex-1 flex-col items-center justify-center gap-[8px] rounded-[6px] px-[16px] py-[12px] text-center text-[14px] ${selectedMethod === 'card'
                        ? 'bg-[#3666AA1A]/10 text-[#3666AA]'
                        : 'bg-white text-[#A19F9F]'
                        }`}
                      variant="outline"
                    >
                      <CgCreditCard />
                      <span>Card Number</span>
                    </Button>
                    <Button
                      onClick={() => setSelectedMethod('link')}
                      className={`flex h-[69px] flex-1 flex-col items-center justify-center gap-[8px] rounded-[6px] px-[16px] py-[12px] text-center text-[14px] ${selectedMethod === 'link'
                        ? 'bg-[#3666AA1A]/10 text-[#3666AA]'
                        : 'bg-white text-[#A19F9F]'
                        }`}
                      variant="outline"
                    >
                      <CgLink />
                      <span>Link</span>
                    </Button>
                  </div>

                  <div className={cn('pt-4')}>
                    {selectedMethod === 'card' && (
                      <CardMinimal0 onSuccess={successPayment} />
                    )}
                    {selectedMethod === 'link' && <Link />}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Footer showSaveButton={showSaveButton} />
        </div>
      )}

      {step == STEP.CONFIRM && (
        <div className='h-full flex justify-center items-center'>
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <CheckCircleIcon className="w-2h-28 h-28 text-green-600" />
            <div className="">
              <Title as="h4" className="">
                Appointment is confirmed
              </Title>
            </div>

            <div className="flex flex-col gap-2">
              <Button
                className="bg-green-600"
                onClick={() => {
                  closeModal();
                }}
              >
                OK
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const Link = () => {
  return (
    <>
      <div className="flex">
        <Input
          label="Email/Phone Number"
          placeholder="Email/Phone Number"
          className="flex-1"
        />
      </div>
      <Button className="flex-[1] rounded-[6px] mt-4 bg-[#3666AA] px-[16px] py-[12px] text-[14px] w-full font-semibold text-white">
        Submit
      </Button>
    </>
  );
};
