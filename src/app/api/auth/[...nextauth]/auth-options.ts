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
        role: {
          ...token.role,
        },
      };
    },
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.idToken = user.id;
        token.role = user.role;
      }
      return token;
    },
  },
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const payload = {
          email: credentials?.email,
          password: credentials?.password,
        };
        const url = 'admin/auth/login';

        try {
          const response = await post<SignInApiResponse>(url, payload);

          if (response.success && response.data) {
            if (response.data.role) {
              return {
                id: (response.data.role?.id ?? 0).toString(),
                accessToken: response.data.access_token,
                role: {
                  id: response.data.role?.id ?? 0,
                  name: response.data.role?.name ?? 'patient',
                  created_at: response.data.role?.created_at ?? '',
                  updated_at: response.data.role?.updated_at ?? '',
                  permissions: response.data.role?.permissions ?? [],
                },
              };
            }
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
