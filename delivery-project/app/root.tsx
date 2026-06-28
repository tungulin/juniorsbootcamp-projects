import type { ToasterProps } from 'sonner';

import { BombIcon, CheckIcon, InfoIcon, RefreshCwIcon } from 'lucide-react';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import { Toaster } from 'sonner';

import { Provider } from './contexts/provider';
import { Button } from './shared/ui/button';

import './app.css';

const toasterProps: ToasterProps = {
  icons: {
    success: <CheckIcon size={16} />,
    info: <InfoIcon size={16} />,
    warning: null,
    error: <BombIcon size={16} />,
    loading: null
  },
  toastOptions: {
    classNames: {
      toast: 'rounded-2xl! border-brand/20!',
      title: 'font-semibold!',
      closeButton: 'border-brand/20!'
    }
  }
};

export const Layout = ({ children }: { children: React.ReactNode }) => (
  <html lang='en'>
    <head>
      <meta charSet='utf-8' />
      <meta content='width=device-width, initial-scale=1' name='viewport' />
      <Meta />
      <Links />
    </head>
    <body>
      <Provider>
        {children}
        <Toaster closeButton {...toasterProps} />
        <ScrollRestoration />
        <Scripts />
      </Provider>
    </body>
  </html>
);

const App = () => <Outlet />;

export const ErrorBoundary = () => (
  <main className='flex min-h-screen flex-col items-center justify-center gap-4 text-center'>
    <img alt='error' className='w-64' src='/error-feedback.png' />
    <h1 className='text-2xl font-bold'>Оооой!</h1>
    <p className='text-muted-foreground'>Что-то пошло не так. Попробуйте обновить страницу</p>
    <Button onClick={() => window.location.reload()}>
      <RefreshCwIcon size={20} />
      Обновить страницу
    </Button>
  </main>
);

export default App;
