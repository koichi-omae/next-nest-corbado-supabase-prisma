'use client';

import { ReactNode } from 'react';
import { RecoilRoot } from 'recoil';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='ja'>
      <RecoilRoot>
        <body>{children}</body>
      </RecoilRoot>
    </html>
  );
}
