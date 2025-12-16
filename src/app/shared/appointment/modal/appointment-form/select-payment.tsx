'use client';

import { AiOutlineFileDone } from 'react-icons/ai';
import { CgCreditCard, CgLink } from 'react-icons/cg';
import Footer from './footer';
import React, { useEffect, useMemo, useState, useRef } from 'react';
import { Button, Input, Title, RadioGroup, AdvancedRadio } from 'rizzui';
import { PAYMENT_SUMMARY } from './appointment.constants';
import cn from '@/core/utils/class-names';
import { useAtom } from 'jotai';
import { currencyAtom } from '@/store/currency';
import { useCouponCodeValidation } from '@/hooks/useCoupon';
import { formDataAtom } from '.';
import toast from 'react-hot-toast';
import { IPayloadPostAppoinment } from '@/types/paramTypes';
import { usePostCreateAppointment } from '@/hooks/useAppointment';
import CardMinimal0, {
  CardMinimal0Ref,
} from '@/app/shared/stripe-checkout/0-card-minima';
import CheckCircleIcon from '@/core/components/icons/check-circle';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { LiaCcAmex, LiaWalletSolid } from 'react-icons/lia';
import { PiMoneyWavy, PiCheckCircleFill } from 'react-icons/pi';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/id';
import {
  FaApplePay,
  FaGooglePay,
  FaMoneyBill,
  FaPaypal,
} from 'react-icons/fa6';
import { useGetDoctorByClinic } from '@/hooks/useClinic';
import useAppointment from './useAppointment';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('id');

const STEP = {
  ESTIMATE_COST: 'estimate-cost',
  PAYMENT: 'payment',
  CONFIRM: 'confirm',
};

export default function AppointmentPayment() {
  const [currencyData] = useAtom(currencyAtom);
  const [showSaveButton, setShowSaveButton] = useState(true);
  const [selectedMethod, setSelectedMethod] = useState<
    'visa-master-card' | 'counter' | 'link'
  >('visa-master-card');
  const [formData, setFormData] = useAtom(formDataAtom);
  const [inputCouponCode, setInputCouponCode] = React.useState('');
  const [step, setStep] = React.useState(STEP.ESTIMATE_COST);
  const { closeModal } = useModal();
  const local_tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const cardRef = useRef<CardMinimal0Ref>(null);

  const { convertTime, getCountryFromPhone, getTimezoneName } =
    useAppointment();

  const { mutate: mutateCouponValidation, data: dataCoupon } =
    useCouponCodeValidation();
  const { mutate } = usePostCreateAppointment();

  const { data: dataDoctor } = useGetDoctorByClinic({
    id: formData?.clinicId?.toString() as string,
    page: 1,
    perPage: 10,
    treatment_type: formData.treatment,
    problem_type: formData.patient_problem,
    date: formData.date,
  });

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
      onSuccess: (ress) => {
        setFormData((prev) => ({
          ...prev,
          couponId: `${ress?.data.id}`,
        }));
        toast.success('Coupon code applied successfully');
      },
      onError: (error: any) => {
        toast.error('Invalid coupon code: ' + error.response.data.message);
      },
    });
  }

  const doctor = useMemo(() => {
    return dataDoctor?.find(
      (doctor) => doctor.id === Number(formData.doctorId)
    );
  }, [dataDoctor, formData.doctorId]);

  useEffect(() => {
    if (doctor) {
      setFormData((prev) => ({
        ...prev,
        fee: doctor.cost.amount || '',
      }));
    }
  }, [doctor, setFormData]);

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
      ...(formData.couponId ? { couponId: formData.couponId } : {}),
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

  return (
    <>
      {step == STEP.ESTIMATE_COST && (
        <div>
          <div className="scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800 flex h-[549px] flex-col justify-between overflow-y-auto md:flex-row">
            <div className="flex h-full flex-1 flex-col gap-6 bg-[#3666AA08] p-5">
              <div className="boorder-[1px] flex flex-1 flex-col">
                <h1 className="text-lg font-bold">Patient Summary</h1>
                <div className="flex flex-col">
                  <h3 className="text-[12px] font-bold">
                    {formData.patient_name}
                  </h3>
                  <p className="text-[12px]">
                    {formData.patient_address ?? '-'}
                  </p>
                  <p className="text-[12px]">
                    {formData.patient_mobile_number ?? '-'}
                    {/* ({formData.patient_mobile_number ? getCountryFromPhone(formData.patient_mobile_number) : '-'}) */}
                  </p>
                  <p className="text-[12px]">
                    {
                      convertTime(
                        formData.date,
                        formData.doctorTime,
                        `${formData.doctor_tz}`,
                        local_tz
                      ).date
                    }{' '}
                    -{' '}
                    <strong>
                      {
                        convertTime(
                          formData.date,
                          formData.doctorTime,
                          `${formData.doctor_tz}`,
                          local_tz
                        ).time
                      }
                    </strong>{' '}
                    {getTimezoneName(
                      local_tz,
                      formData.date,
                      formData.doctorTime
                    )}
                  </p>
                </div>
              </div>

              <div className="boorder-[1px] flex flex-1 flex-col">
                <h1 className="text-lg font-semibold">Booking Summary</h1>
                <div className="flex flex-col">
                  <h3 className="text-[12px] font-bold">
                    Dr. {formData.doctor_name} - {formData.treatment}
                  </h3>
                  <p className="text-[12px]">
                    {
                      convertTime(
                        formData.date,
                        formData.doctorTime,
                        `${formData.doctor_tz}`,
                        `${formData.doctor_tz}`
                      ).date
                    }{' '}
                    -{' '}
                    <strong>
                      {
                        convertTime(
                          formData.date,
                          formData.doctorTime,
                          `${formData.doctor_tz}`,
                          `${formData.doctor_tz}`
                        ).time
                      }
                    </strong>{' '}
                    {getTimezoneName(
                      `${formData.doctor_tz}`,
                      formData.date,
                      formData.doctorTime
                    )}
                  </p>
                  <p className="text-[12px]">
                    Booking Via <strong>Zoom</strong>
                  </p>
                </div>
              </div>

              <div className="flex flex-col">
                <div className="mb-2 mt-2 flex gap-[10px]">
                  <div className="flex flex-1 flex-col">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#3666AA1A]">
                      <AiOutlineFileDone className="text-xl" />
                    </span>

                    <h1 className="text-[12px] font-semibold">
                      PAYMENT REQUIRED
                    </h1>
                    <p className="text-[12px]">
                      We require a payment method before your appointment can be
                      confirmed.
                    </p>
                  </div>

                  <div className="flex flex-1 flex-col">
                    <div className="flex gap-3">
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
                    <p className="text-[12px]">
                      A processing fee of 2.9% + $0.30 applies. Including
                      American Express, Visa, Mastercard, Apple Pay, Google Pay
                    </p>
                  </div>
                </div>

                <div className="flex gap-[10px]">
                  <div className="flex flex-1 flex-col">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#3666AA1A]">
                      <FaPaypal className="text-xl" />
                    </span>

                    <h1 className="text-[12px] font-semibold">Paypal Free</h1>
                    <p className="text-[12px]">
                      An additional fee applies when paying with PayPal.
                    </p>
                  </div>

                  <div className="flex flex-1 flex-col">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#3666AA1A]">
                      <FaMoneyBill className="text-xl" />
                    </span>

                    <h1 className="text-[12px] font-semibold">Pay Later Fee</h1>
                    <p className="text-[12px]">
                      An additional fee applies when choosing the Pay Later
                      option.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex h-full flex-1 flex-col gap-10 bg-white p-6">
              <div className="mt-4 flex flex-col">
                <h1 className="text-[14px] font-medium">PAYMENT</h1>
                <div className="pt-4">
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setSelectedMethod('visa-master-card')}
                      className={`flex h-[69px] flex-col items-center justify-center gap-[8px] rounded-[6px] px-[16px] py-[12px] text-center text-[14px] ${selectedMethod === 'visa-master-card'
                          ? 'bg-[#3666AA1A]/10 text-[#3666AA]'
                          : 'bg-white text-[#A19F9F]'
                        }`}
                      variant="outline"
                    >
                      <CgCreditCard />
                      <span>Visa / Master Card</span>
                    </Button>
                    <Button
                      onClick={() => setSelectedMethod('counter')}
                      className={`flex h-[69px] flex-1 flex-col items-center justify-center gap-[8px] rounded-[6px] px-[16px] py-[12px] text-center text-[14px] ${selectedMethod === 'counter'
                          ? 'bg-[#3666AA1A]/10 text-[#3666AA]'
                          : 'bg-white text-[#A19F9F]'
                        }`}
                      variant="outline"
                    >
                      <PiMoneyWavy />
                      <span>Counter</span>
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
                    {selectedMethod === 'visa-master-card' && (
                      <CardMinimal0 onSuccess={successPayment} ref={cardRef} />
                    )}
                    {selectedMethod === 'link' && <Link />}
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <h1 className="text-[14px] font-medium">SUMMARY</h1>
                <div className="flex flex-col">
                  {PAYMENT_SUMMARY.map((item, index) => {
                    let value: string | null = null;
                    if (item.label == 'Sub Total' && formData.fee) {
                      value = `${currencyData.active.symbol} ${formData.fee ? Number(formData.fee) : ''}`;
                    } else if (
                      item.label == 'Merchant Fee' &&
                      formData.script_renewal_fee
                    ) {
                      value = `${currencyData.active.symbol}-`;
                    } else if (item.label == 'Coupon') {
                      `${couponValue ?? '-'}`;
                    }

                    if (!value) return null;
                    return (
                      <div key={index} className="flex justify-between">
                        <h2 className="text-[12px] font-medium text-[#777777]">
                          {item.label}
                        </h2>
                        <p className="text-[14px] font-medium">{value}</p>
                      </div>
                    );
                  })}
                </div>
                {/* {couponValue !== '-' && ( */}
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
                {/* )} */}

                <div className="mt-2 w-full border-[1px] border-t border-[#00000026]/15"></div>
                <div className="flex items-center justify-between">
                  <h1 className="text-[14px] font-medium">Total Cost</h1>
                  <p className="text-[14px] font-medium">
                    {currencyData.active.symbol}
                    {Number(totalValue)}
                  </p>
                </div>
                {/* <div className="mt-4">
                  <Button
                    onClick={() => cardRef.current?.handleSubmit(selectedMethod)}
                    className="w-full bg-[#3666AA] px-4 py-3 font-semibold text-white"
                  >
                    Pay Now
                  </Button>
                </div> */}
                <div className="mt-4">
                  <Button
                    onClick={() => {
                      if (selectedMethod === 'counter') {
                        successPayment('COUNTER');
                      } else if (selectedMethod === 'link') {
                        toast.error('Link payment not implemented yet');
                      } else {
                        cardRef.current?.handleSubmit(selectedMethod);
                      }
                    }}
                    className="w-full bg-[#3666AA] px-4 py-3 font-semibold text-white"
                  >
                    Pay Now
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <Footer showSaveButton={showSaveButton} />
        </div>
      )}

      {step == STEP.CONFIRM && (
        <div className="flex h-full items-center justify-center">
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
  const [viaClicked, setViaClicked] = useState('');

  const sendVia = [
    { label: 'Email Only', value: 'email' },
    { label: 'SMS Only', value: 'sms' },
    { label: 'Email & SMS', value: 'email-sms' },
  ];
  return (
    <>
      <RadioGroup
        value={viaClicked}
        setValue={setViaClicked}
        className="col-span-full grid grid-cols-3 gap-3 @2xl:grid-cols-3 @4xl:gap-6"
      >
        {sendVia.map((via: any, index: number) => {
          return (
            <AdvancedRadio
              key={index}
              value={via.value}
              contentClassName="px-4 py-6 flex items-center justify-between w-full"
              inputClassName="[&~span]:border-0 [&~span]:ring-1 [&~span]:ring-gray-200 [&~span:hover]:ring-primary [&:checked~span:hover]:ring-primary [&:checked~span]:border-1 [&:checked~.rizzui-advanced-checkbox]:ring-2 [&~span>.icon]:opacity-0 [&:checked~span>.icon]:opacity-100"
            >
              <span className="flex w-full items-center justify-center">
                {via.label}
              </span>
              <PiCheckCircleFill className="icon h-5 min-w-[1.25rem] text-primary" />
            </AdvancedRadio>
          );
        })}
      </RadioGroup>
    </>
  );
};
