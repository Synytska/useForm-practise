import type { Metadata } from 'next';

import { BaseLayout } from '@/src/components/BaseLayout';

import './globals.css';

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app'
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <BaseLayout>{children}</BaseLayout>
            </body>
        </html>
    );
}

