import { PatientSchema } from '@/validators/patient.schema';
import React from 'react';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import { BiChevronDownCircle } from 'react-icons/bi';
import { Accordion, cn, Input, Text, Title } from 'rizzui';

export default function AdditionalInformation({
  register,
  control,
  errors,
}: {
  register: UseFormRegister<PatientSchema>;
  control: Control<PatientSchema>;
  errors: FieldErrors<PatientSchema>;
}) {
  const data = [
    {
      title: 'Medical Details',
      content: (
        <>
          <Text>
            You’ll need to bring this card to your appointment for us to verify
            your details
          </Text>
          <div className="my-3 grid md:grid-cols-3 md:gap-6">
            <Input
              label="Medicare Number"
              placeholder="Medicare Number"
              {...register('medicareNumber')}
              error={errors.medicareNumber?.message}
            />
            <Input
              label="Position On Card"
              placeholder="Position On Card"
              {...register('medicarePostOnCard')}
              error={errors.medicarePostOnCard?.message}
            />
            <Input
              type="date"
              label="Expiry Date"
              placeholder="Expiry Date"
              {...register('medicareExpiryDate')}
              error={errors.medicareExpiryDate?.message}
            />
          </div>
        </>
      ),
    },
    {
      title: 'Concession Card',
      content: (
        <>
          <Text>
            You’ll need to bring this card to your appointment for us to verify
            your details
          </Text>
          <Input
            label="Card Type"
            placeholder="Card Type"
            className="mt-3"
            {...register('ConcessionCardType')}
            error={errors.ConcessionCardType?.message}
          />
          <div className="my-3 grid md:grid-cols-2 md:gap-6">
            <Input
              label="Card Number"
              placeholder="Card Number"
              {...register('ConcessionCardNumber')}
              error={errors.ConcessionCardNumber?.message}
            />
            <Input
              label="Expiry Date"
              placeholder="Expiry Date"
              type="date"
              {...register('ConcessionExpiryDate')}
              error={errors.ConcessionExpiryDate?.message}
            />
          </div>
        </>
      ),
    },
    {
      title: 'Next of Kin',
      content: (
        <>
          <Text>Fill in the details of your Next of Kin</Text>
          <div className="my-3 grid md:grid-cols-2 md:gap-6">
            <Input
              label="Full Name"
              placeholder="Full Name"
              {...register('kinFullName')}
              error={errors.kinFullName?.message}
            />
            <Input
              label="Mobile Phone"
              placeholder="Mobile Phone"
              type="number"
              {...register('kinMobilePhone')}
              error={errors.kinMobilePhone?.message}
            />
          </div>
          <Input
            label="Relationship To Patient"
            placeholder="Relationship To Patient"
            className="mt-3"
            {...register('kinRelationship')}
            error={errors.kinRelationship?.message}
          />
        </>
      ),
    },
  ];

  return (
    <div className="mx-auto my-6 max-w-3xl">
      <Title as="h3" className="text-xl font-semibold">
        Additional Information
      </Title>
      <Text className="mt-2 text-gray-600">
        Save time before your appointment. Fill in these additional details now,
        or at a time convenient to you. Remember to bring your Medicare card and
        any relevant concession cards along with you to your first appointment.
      </Text>

      {data.map((item) => (
        <Accordion
          key={item.title}
          className="mx-8 border-b last-of-type:border-b-0"
        >
          <Accordion.Header>
            {({ open }) => (
              <div className="flex w-full cursor-pointer items-center justify-between py-5 text-xl font-semibold">
                {item.title}
                <BiChevronDownCircle
                  className={cn(
                    'h-5 w-5 -rotate-90 transform transition-transform duration-300',
                    open && '-rotate-0'
                  )}
                />
              </div>
            )}
          </Accordion.Header>
          <Accordion.Body className="mb-7">{item.content}</Accordion.Body>
        </Accordion>
      ))}
    </div>
  );
}
