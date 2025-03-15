import localFont from 'next/font/local';

export const Inter = localFont({
  src: [
    {
      path: './Inter-Regular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: './Inter-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './Inter-Medium.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: './Inter-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './Inter-Bold.woff',
      weight: '700',
      style: 'normal',
    },
    {
      path: './Inter-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './Inter-Black.woff',
      weight: '900',
      style: 'normal',
    },
    {
      path: './Inter-Black.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--inter',
});
