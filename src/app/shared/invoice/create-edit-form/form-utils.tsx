'use client';

import z from 'zod';
import { Title, Text, Badge } from 'rizzui';
import cn from '@core/utils/class-names';

// form zod validation schema
export const invoiceFormSchema = z.object({
  fromName: z.string().min(1, { message: 'This field is required' }),
  fromAddress: z.string().min(1, { message: 'This field is required' }),
  fromPhone: z.string().min(1, { message: 'Invalid phone number' }).optional(),
  toName: z.string().min(1, { message: 'This field is required' }),
  toAddress: z.string().min(1, { message: 'This field is required' }),
  toPhone: z.string().min(1, { message: 'Invalid phone number' }).optional(),
  invoiceNumber: z.string({
    required_error: 'This field is required',
  }),
  createDate: z
    .date()
    .refine((value) => value !== null, 'Please select a date'),
  dueDate: z.date().refine((value) => value !== null, 'Please select a date'),
  status: z.string({
    required_error: 'This field is required',
  }),
  shipping: z
    .number()
    .min(0, { message: 'This field is required' })
    .or(z.string().min(1, { message: 'This field is required' })),
  discount: z
    .number()
    .min(0, { message: 'This field is required' })
    .or(z.string().min(1, { message: 'This field is required' })),
  taxes: z
    .number()
    .min(0, { message: 'This field is required' })
    .or(z.string().min(1, { message: 'This field is required' })),
  items: z.array(
    z.object({
      item: z.string().min(1, { message: 'This field is required' }).nonempty(),
      description: z
        .string()
        .min(1, { message: 'This field is required' })
        .nonempty(),
      quantity: z.number().min(1, { message: 'This field is required' }),
      price: z
        .number()
        .min(1, { message: 'This field is required' })
        .or(z.string().min(1, { message: 'This field is required' })),
    })
  ),
});

// generate form types from zod validation schema
export type InvoiceFormTypes = z.infer<typeof invoiceFormSchema>;

// invoice status options
export const statusOptions = [
  {
    value: 4,
    label: 'Void',
  },
  {
    value: 3,
    label: 'Paid',
  },
  {
    value: 2,
    label: 'Open',
  },
  {
    value: 1,
    label: 'Draft',
  },
];

export const paymentStatus = [
  {
    value: 1,
    label: 'Draft',
  },
  {
    value: 2,
    label: 'Paid',
  },
  {
    value: 3,
    label: 'Cancelled',
  },
  {
    value: 4,
    label: 'Void',
  },
  {
    value: 5,
    label: 'Refund',
  },
  {
    value: 6,
    label: 'Unpaid',
  },
]

export function renderOptionDisplayValue(value: number) {
  switch (value) {
    case 4:
      return (
        <div className="flex items-center">
          <Badge color="warning" renderAsDot />
          <Text className="ms-2 font-medium capitalize text-orange-dark">
            Void
          </Text>
        </div>
      );
    case 2:
      return (
        <div className="flex items-center">
          <Badge color="info" renderAsDot />
          <Text className="text-gray-dark ms-2 font-medium capitalize">
            Open
          </Text>
        </div>
      );
    case 3:
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium capitalize text-green-dark">
            Paid
          </Text>
        </div>
      );
    case 1:
      return (
        <div className="flex items-center">
          <Badge color="secondary" renderAsDot />
          <Text className="ms-2 font-medium capitalize text-gray-400">
            Draft
          </Text>
        </div>
      );
    default:
      return (
        <div className="flex items-center">
          <Badge renderAsDot className="bg-gray-400" />
          <Text className="ms-2 font-medium capitalize text-gray-600">
            {value}
          </Text>
        </div>
      );
  }
}

// form block wrapper
export function FormBlockWrapper({
  title,
  description,
  children,
  className,
}: React.PropsWithChildren<{
  title: string;
  description?: string;
  className?: string;
}>) {
  return (
    <section className={cn('@5xl:grid @5xl:grid-cols-6', className)}>
      <header className="col-span-2 mb-6 @5xl:mb-0">
        <Title as="h5" className="font-semibold">
          {title}
        </Title>
        {description ? (
          <Text className="mt-1 text-sm text-gray-500">{description}</Text>
        ) : null}
      </header>
      <div className="col-span-4 grid grid-cols-2 gap-3 @lg:gap-4 @2xl:gap-5">
        {children}
      </div>
    </section>
  );
}
