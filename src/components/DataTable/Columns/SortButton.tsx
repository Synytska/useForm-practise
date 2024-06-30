import { Column } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';

import { IFormInput } from '@/src/common/interfaces/IformInput';

import { toggleSort } from '@/lib/utils';

import { ArrowUpDown } from 'lucide-react';

interface ISortButtonProps {
    column: Column<IFormInput>;
    text: string;
}
export const SortButton = ({ column, text }: ISortButtonProps) => (
    <Button variant="ghost" onClick={toggleSort(column)}>
        {text}
        <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
);
