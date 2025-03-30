import { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { env } from '@/env.mjs';
import { pagesOptions } from './pages-options';
import { post } from '../../api';
import { SignInApiResponse } from '@/types/ApiResponse';

export const authOptions: NextAuthOptions = {
  debug: true,
  pages: {
    ...pagesOptions,
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async session({ session, token }) {
      return {
        ...session,
        accessToken: token.accessToken,
        user: {
          ...session.user,
          accessToken: token.accessToken,
          role: token.role,
          id: token.idToken as string,
        },
      };
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.role = user.role;
        token.idToken = user.id;
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
      const parsedUrl = new URL(url, baseUrl);
      if (parsedUrl.searchParams.has('callbackUrl')) {
        return `${baseUrl}${parsedUrl.searchParams.get('callbackUrl')}`;
      }
      if (parsedUrl.origin === baseUrl) {
        return url;
      }
      return baseUrl;
    },
  },
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
        role: { label: 'Role', type: 'text' },
      },
      async authorize(credentials) {
        const role = credentials?.role;
        const payload = {
          email: credentials?.email,
          password: credentials?.password,
        };
        const url =
          role === 'admin' ? 'admin/auth/login' : 'patient/auth/login';

        try {
          const response = await post<SignInApiResponse>(url, payload);

          if (response.success && response.data) {
            return {
              ...response.data,
              role: response?.data?.role?.name ?? 'patient',
              accessToken: response?.data?.access_token,
            } as any;
          }
        } catch (error) {
          throw new Error('Invalid credentials');
        }
        return null;
      },
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID || '',
      clientSecret: env.GOOGLE_CLIENT_SECRET || '',
      allowDangerousEmailAccountLinking: true,
    }),
  ],
};
