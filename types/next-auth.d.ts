import { DefaultSession } from 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface IPermission {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
  }

  interface Session {
    user?: {
      id: string;
      token?: string;
    } & DefaultSession['user'];
    accessToken?: string;
    role?: {
      id: number;
      name: string;
      created_at: string;
      updated_at: string;
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    accessToken?: string;
    name?: string;
    email?: string;
    token?: string;
    role?: {
      id: number;
      name: string;
      created_at: string;
      updated_at: string;
    };
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    idToken?: string;
    accessToken?: string;
    token?: string;
    role?: {
      id: number;
      name: string;
      created_at: string;
      updated_at: string;
    };
  }
}
