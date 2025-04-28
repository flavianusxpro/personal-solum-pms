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
    accessToken?: string;
    role?: {
      id: number;
      name: string;
      created_at: string;
      updated_at: string;
      permissions: IPermission[];
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    accessToken?: string;
    name?: string;
    email?: string;
    role?: {
      id: number;
      name: string;
      created_at: string;
      updated_at: string;
      permissions: IPermission[];
    };
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    idToken?: string;
    accessToken?: string;
    permissions?: IPermission[];
    role?: {
      id: number;
      name: string;
      created_at: string;
      updated_at: string;
      permissions: any[];
    };
  }
}
