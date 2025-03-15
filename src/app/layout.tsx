import '@/src/app/styles/global.css';
import { Inter } from '@/src/shared/fonts/Inter/Inter';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ru'>
      <body className={Inter.className}>
        <main className={'h-full bg-indigo-50'}>{children}</main>
      </body>
    </html>
  );
}
