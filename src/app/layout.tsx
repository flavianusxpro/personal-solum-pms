import { Toaster } from 'react-hot-toast';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options';
import AuthProvider, {
  ProtectedLayout,
} from '@/app/api/auth/[...nextauth]/auth-provider';
import GlobalDrawer from '@/app/shared/drawer-views/container';
import GlobalModal from '@/app/shared/modal-views/container';
import {
  JotaiProvider,
  ThemeProvider,
} from '@/app/shared/providers/theme-provider';
import { siteConfig } from '@/config/site.config';
import { inter, lexendDeca } from '@/app/fonts';
import cn from '@core/utils/class-names';
import NextProgress from '@core/components/next-progress';

// styles
import 'swiper/css';
import 'swiper/css/navigation';
import '@/app/globals.css';
import QueryQlientProvider from './shared/providers/query-client-providers';

export const metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html
      lang="en"
      dir="ltr"
      // required this one for next-themes, remove it if you are not using next-theme
      suppressHydrationWarning
    >
      <body
        // to prevent any warning that is caused by third party extensions like Grammarly
        suppressHydrationWarning
        className={cn(inter.variable, lexendDeca.variable, 'font-inter')}
      >
        <QueryQlientProvider>
          <AuthProvider session={session}>
            <ThemeProvider>
              <NextProgress />
              <JotaiProvider>
                <ProtectedLayout>{children}</ProtectedLayout>
                <Toaster />
                <GlobalDrawer />
                <GlobalModal />
              </JotaiProvider>
            </ThemeProvider>
          </AuthProvider>
        </QueryQlientProvider>
      </body>
    </html>
  );
}
