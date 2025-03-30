import { avatarIds } from '@core/utils/get-avatar';
import { getRandomArrayElement } from '@core/utils/get-random-array-element';

export const appointmentTypes = {
  'Routine Checkup': 'Routine Checkup',
  'Pregnant Yoga': 'Pregnant Yoga',
  Consultant: 'Consultant',
  Training: 'Training',
};
export const appointmentStatuses = {
  Scheduled: 'Scheduled',
  Waiting: 'Waiting',
};

export type Type = keyof typeof appointmentTypes;
export type StatusType = keyof typeof appointmentStatuses;

export const appointmentData = [
  {
    id: '6322',
    name: 'Joanne Batz',
    number: '023434343434',
    appointType: 'Telehealt (Phone Call)',
    gender: 'Male',
    email: 'Izabella44@gmail.com',
    avatar:
      'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-02.webp',
    items: 93,
    price: '202.00',
    doctor: {
      name: 'Dr. Johnnie Kassulke',
      email: 'johnnie.kassulke@example.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    patient: {
      name: 'Kristie Ziemann',
      email: 'kristie@example.com',
    },
    appointStatus: 'Schedule',
    date: '2022-11-10T06:22:01.621Z',
    status: 'Paid',
    createdAt: '2023-08-10T14:10:56.495Z',
    updatedAt: '2023-08-07T12:18:04.534Z',
    products: [
      {
        id: '0o02051402',
        name: 'Tasty Metal Shirt',
        category: 'Shoes',
        image:
          'https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/7.webp',
        price: '410.00',
        quantity: 2,
      },
      {
        id: '0o02374305',
        name: 'Rustic Steel Computer',
        category: 'Shoes',
        image:
          'https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/6.webp',
        price: '948.00',
        quantity: 1,
      },
    ],
  },
  {
    id: '8216',
    name: 'Kara Goodwin',
    number: '023434343434',
    appointType: 'Zoom',
    gender: 'Male',
    email: 'Milford67@gmail.com',
    avatar:
      'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-01.webp',
    items: 57,
    price: '329.00',
    doctor: {
      name: 'Dr. Johnnie Kassulke',
      email: 'johnnie.kassulke@example.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    patient: {
      name: 'Kristie Ziemann',
      email: 'kristie@example.com',
    },
    appointStatus: 'Waiting',
    date: '2022-11-10T06:22:01.621Z',
    status: 'Unpaid',
    createdAt: '2023-06-25T13:48:55.907Z',
    updatedAt: '2023-08-12T11:04:54.639Z',
    products: [
      {
        id: '0o17477064',
        name: 'Modern Cotton Gloves',
        category: 'Watch',
        image:
          'https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/5.webp',
        price: '342.00',
        quantity: 3,
      },
      {
        id: '0o02374305',
        name: 'Rustic Steel Computer',
        category: 'Shoes',
        image:
          'https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/6.webp',
        price: '948.00',
        quantity: 1,
      },
    ],
  },
  {
    id: '5881',
    name: 'Mr. Irvin Farrell',
    number: '023434343434',
    appointType: 'F2F',
    gender: 'Male',
    email: 'Chanel21@yahoo.com',
    avatar:
      'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-15.webp',
    items: 91,
    price: '263.00',
    doctor: {
      name: 'Dr. Johnnie Kassulke',
      email: 'johnnie.kassulke@example.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    patient: {
      name: 'Kristie Ziemann',
      email: 'kristie@example.com',
    },
    appointStatus: 'Refunded',
    date: '2022-11-10T06:22:01.621Z',
    status: 'Refunded',
    createdAt: '2023-07-10T17:48:56.737Z',
    updatedAt: '2023-08-13T06:10:40.908Z',
    products: [
      {
        id: '0o17477064',
        name: 'Modern Cotton Gloves',
        category: 'Watch',
        image:
          'https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/5.webp',
        price: '342.00',
        quantity: 3,
      },
    ],
  },
  {
    id: '5881',
    name: 'Mr. Irvin Farrell',
    number: '023434343434',
    appointType: 'Skype',
    gender: 'Male',
    email: 'Chanel21@yahoo.com',
    avatar:
      'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-15.webp',
    items: 91,
    price: '263.00',
    doctor: {
      name: 'Dr. Johnnie Kassulke',
      email: 'johnnie.kassulke@example.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    patient: {
      name: 'Kristie Ziemann',
      email: 'kristie@example.com',
    },
    appointStatus: 'Schedule',
    date: '2022-11-10T06:22:01.621Z',
    status: 'Paid',
    createdAt: '2023-07-10T17:48:56.737Z',
    updatedAt: '2023-08-13T06:10:40.908Z',
    products: [
      {
        id: '0o17477064',
        name: 'Modern Cotton Gloves',
        category: 'Watch',
        image:
          'https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/5.webp',
        price: '342.00',
        quantity: 3,
      },
    ],
  },
  {
    id: '5881',
    name: 'Mr. Irvin Farrell',
    number: '023434343434',
    appointType: 'Teams',
    gender: 'Male',
    email: 'Chanel21@yahoo.com',
    avatar:
      'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-15.webp',
    items: 91,
    price: '263.00',
    doctor: {
      name: 'Dr. Johnnie Kassulke',
      email: 'johnnie.kassulke@example.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    patient: {
      name: 'Kristie Ziemann',
      email: 'kristie@example.com',
    },
    appointStatus: 'Cancelled',
    date: '2022-11-10T06:22:01.621Z',
    status: 'Unpaid',
    createdAt: '2023-07-10T17:48:56.737Z',
    updatedAt: '2023-08-13T06:10:40.908Z',
    products: [
      {
        id: '0o17477064',
        name: 'Modern Cotton Gloves',
        category: 'Watch',
        image:
          'https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/5.webp',
        price: '342.00',
        quantity: 3,
      },
    ],
  },
  {
    id: '5881',
    name: 'Mr. Irvin Farrell',
    number: '023434343434',
    appointType: 'Other',
    gender: 'Male',
    email: 'Chanel21@yahoo.com',
    avatar:
      'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-15.webp',
    items: 91,
    price: '263.00',
    doctor: {
      name: 'Dr. Johnnie Kassulke',
      email: 'johnnie.kassulke@example.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    patient: {
      name: 'Kristie Ziemann',
      email: 'kristie@example.com',
    },
    appointStatus: 'Cancelled',
    date: '2022-11-10T06:22:01.621Z',
    status: 'Unpaid',
    createdAt: '2023-07-10T17:48:56.737Z',
    updatedAt: '2023-08-13T06:10:40.908Z',
    products: [
      {
        id: '0o17477064',
        name: 'Modern Cotton Gloves',
        category: 'Watch',
        image:
          'https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/5.webp',
        price: '342.00',
        quantity: 3,
      },
    ],
  },
];
