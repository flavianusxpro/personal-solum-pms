import React from 'react'
import { BiChevronDownCircle } from 'react-icons/bi';
import { IoChevronDownCircleOutline } from 'react-icons/io5'
import { Accordion, cn, Input, Text, Title } from 'rizzui'

export default function AdditionalInformation() {
  const data = [
      {
        title: "Medical Details",
        content: <>
          <Text>You’ll need to bring this card to your appointment for us to verify your details</Text>
          <div className="grid md:grid-cols-3 md:gap-6 my-3">
            <Input
              label="Medicare Number"
              placeholder="Medicare Number"
            // {...register('roleName')}
            // error={errors.roleName?.message}
            />
            <Input
              label="Position On Card"
              placeholder="Position On Card"
            // {...register('roleName')}
            // error={errors.roleName?.message}
            />
            <Input
              label="Expiry Date"
              placeholder="Expiry Date"
            // {...register('roleName')}
            // error={errors.roleName?.message}
            />
          </div>
        </>,
      },
      {
        title: "Concession Card",
        content: <>
          <Text>You’ll need to bring this card to your appointment for us to verify your details</Text>
          <Input
            label="Card Type"
            placeholder="Card Type"
            className="mt-3"
          // {...register('roleName')}
          // error={errors.roleName?.message}
          />
          <div className="grid md:grid-cols-2 md:gap-6 my-3">
            <Input
              label="Card Number"
              placeholder="Card Number"
            // {...register('roleName')}
            // error={errors.roleName?.message}
            />
            <Input
              label="Expiry Date"
              placeholder="Expiry Date"
              type="date"
            // {...register('roleName')}
            // error={errors.roleName?.message}
            />
          </div>
        </>,
      },
      {
        title: "Next of Kin",
        content: <>
          <Text>Fill in the details of your Next of Kin</Text>
          <div className="grid md:grid-cols-2 md:gap-6 my-3">
            <Input
              label="Full Name"
              placeholder="Full Name"
            // {...register('roleName')}
            // error={errors.roleName?.message}
            />
            <Input
              label="Mobile Phone"
              placeholder="Mobile Phone"
              type="number"
            // {...register('roleName')}
            // error={errors.roleName?.message}
            />
          </div>
          <Input
            label="Relationship To Patient"
            placeholder="Relationship To Patient"
            className="mt-3"
          // {...register('roleName')}
          // error={errors.roleName?.message}
          />
        </>,
      },
  ];

  return (
    <div className="max-w-3xl mx-auto my-6">
      <Title as="h3" className="text-xl font-semibold">Additional Information</Title>
      <Text className="text-gray-600 mt-2">
        Save time before your appointment. Fill in these additional details now, or at a time convenient to you. Remember to bring your Medicare card and any relevant concession cards along with you to your first appointment.
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
                    "h-5 w-5 -rotate-90 transform transition-transform duration-300",
                    open && "-rotate-0"
                  )}
                />
              </div>
            )}
          </Accordion.Header>
          <Accordion.Body className="mb-7">{item.content}</Accordion.Body>
        </Accordion>
      ))}
    </div>
  )
}
