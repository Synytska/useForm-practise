'use client';
import { FC, PropsWithChildren } from 'react';

import { Toaster } from '@/components/ui/toaster';

export const BaseLayout: FC<PropsWithChildren> = ({ children }) => (
    <div>
        {children}
        <Toaster />
    </div>
);
