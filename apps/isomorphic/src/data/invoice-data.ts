export type Invoice = {
  id: string;
  name: string;
  // avatar: string;
  email: string;
  // dueDate: string;
  amount: string;
  status: string;
  total: string;
  patientName: string;
 createdBy: {
    role: string,
    name: string,
    date: string
  },
  createdAt: Date;
};

export const invoiceData = [
  {
    id: 'APP-312162447',
    name: 'Francis Sanford MD',
    // avatar:
    //   'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-01.webp',
    email: 'Maryam.Barrows@yahoo.com',
    dueDate: '2023-10-18T13:24:00.760Z',
    amount: '544.00',
    patientName: 'Brahim zamoza rayan',
    total: '120',
    createdBy: {
      role: 'DOCTER',
      name: 'Ryan abram',
      date: '2023-01-14T20:37:08.482Z',
    },
    status: 'Paid',
    createdAt: '2023-01-14T20:37:08.482Z',
  },
  {
    id: 'APP-312186740',
    name: 'Lucia Kshlerin',
    // avatar:
    //   'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-02.webp',
    email: 'Mason_Davis4@yahoo.com',
    dueDate: '2023-07-18T01:06:16.095Z',
    amount: '560.00',
    patientName: 'Brahim zamoza rayan',
    total: '120',
    createdBy: {
      role: 'USER',
      name: 'Ryan abram',
      date: '2023-01-14T20:37:08.482Z'
    },
    status: 'Pending',
    createdAt: '2023-02-13T22:59:20.038Z',
  },
  {
    id: 'APP-312142548',
    name: 'Byron Hoppe III',
    // avatar:
    //   'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-03.webp',
    email: 'Jayda_Schiller35@yahoo.com',
    dueDate: '2024-12-18T15:32:21.317Z',
    amount: '249.00',
    patientName: 'Brahim zamoza rayan',
    total: '120',
    createdBy: {
      role: 'DOCTER',
      name: 'Ryan abram',
      date: '2023-01-14T20:37:08.482Z'
    },
    status: 'Pending',
    createdAt: '2022-11-30T06:51:47.972Z',
  },
  {
    id: 'APP-312197024',
    name: 'Camille Jenkins',
    // avatar:
    //   'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-04.webp',
    email: 'Retha.Lehner47@hotmail.com',
    dueDate: '2024-06-30T19:06:03.018Z',
    amount: '255.00',
    patientName: 'Brahim zamoza rayan',
    total: '120',
    createdBy: {
      role: 'USER',
      name: 'Ryan abram',
      date: '2023-01-14T20:37:08.482Z'
    },
    status: 'Cancelled',
    createdAt: '2022-10-20T05:20:29.297Z',
  },
  {
    id: 'APP-312114608',
    name: 'Kelli Mitchell',
    // avatar:
    //   'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-05.webp',
    email: 'Guiseppe.Champlin@hotmail.com',
    dueDate: '2025-07-24T18:45:02.179Z',
    amount: '329.00',
    patientName: 'Brahim zamoza rayan',
    total: '120',
    createdBy: {
      role: 'DOCTER',
      name: 'Ryan abram',
      date: '2023-07-08T15:25:40.000Z',
    },
    status: 'Paid',
    createdAt: '2022-11-30T06:45:34.713Z',
  },
  {
    id: 'APP-312195656',
    name: 'Randall Kuhic',
    // avatar:
    //   'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-06.webp',
    email: 'Simeon93@yahoo.com',
    dueDate: '2023-11-02T00:20:47.253Z',
    amount: '402.00',
    patientName: 'Brahim zamoza rayan',
    total: '120',
    createdBy: {
      role: 'DOCTER',
      name: 'Ryan abram',
      date: '2023-07-08T15:25:40.000Z',
    },
    status: 'Paid',
    createdAt: '2023-07-08T15:25:40.000Z',
  },
  {
    id: 'APP-312173151',
    name: 'Jody Carroll',
    // avatar:
    //   'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-07.webp',
    email: 'Frieda_Renner@gmail.com',
    dueDate: '2024-01-03T02:53:29.596Z',
    amount: '977.00',
    patientName: 'Brahim zamoza rayan',
    total: '120',
    createdBy: {
      role: 'DOCTER',
      name: 'Ryan abram',
      date: '2023-01-14T20:37:08.482Z'
    },
    status: 'Cancelled',
    createdAt: '2023-05-14T07:04:31.296Z',
  },
  {
    id: 'APP-312157931',
    name: 'Jill Russel',
    // avatar:
    //   'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-15.webp',
    email: 'Cleora.Murray@hotmail.com',
    dueDate: '2025-01-23T08:52:39.081Z',
    amount: '736.00',
    patientName: 'Brahim zamoza rayan',
    total: '120',
    createdBy: {
      role: 'DOCTER',
      name: 'Ryan abram',
      date: '2023-01-14T20:37:08.482Z'
    },
    status: 'Paid',
    createdAt: '2023-07-13T13:18:55.586Z',
  },
  {
    id: 'APP-312136515',
    name: 'Genevieve Hammes',
    // avatar:
    //   'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-14.webp',
    email: 'Bernard63@yahoo.com',
    dueDate: '2024-07-29T18:18:19.193Z',
    amount: '755.00',
    patientName: 'Brahim zamoza rayan',
    total: '120',
    createdBy: {
      role: 'DOCTER',
      name: 'Ryan abram',
      date: '2023-01-14T20:37:08.482Z'
    },
    status: 'Cancelled',
    createdAt: '2023-01-25T12:41:04.758Z',
  },
  {
    id: 'APP-312134893',
    name: 'Alejandro Reichert',
    // avatar:
    //   'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-13.webp',
    email: 'Wava.Muller47@gmail.com',
    dueDate: '2023-05-04T04:33:47.908Z',
    amount: '240.00',
    patientName: 'Brahim zamoza rayan',
    total: '120',
    createdBy: {
      role: 'DOCTER',
      name: 'Ryan abram',
      date: '2023-01-14T20:37:08.482Z'
    },
    status: 'Cancelled',
    createdAt: '2022-10-10T12:07:33.682Z',
  },
  {
    id: 'APP-312166356',
    name: 'Ricardo Kling',
    // avatar:
    //   'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-12.webp',
    email: 'Gene73@yahoo.com',
    dueDate: '2025-04-16T11:49:15.276Z',
    amount: '852.00',
    patientName: 'Brahim zamoza rayan',
    total: '120',
    createdBy: {
      role: 'DOCTER',
      name: 'Ryan abram',
      date: '2023-01-14T20:37:08.482Z'
    },
    status: 'Cancelled',
    createdAt: '2022-12-03T22:33:54.282Z',
  },
];
