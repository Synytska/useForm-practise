'use client';
import { FC, PropsWithChildren } from 'react';

import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';

export const BaseLayout: FC<PropsWithChildren> = ({ children }) => (
    <div>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
            <Toaster />
        </ThemeProvider>
    </div>
);
