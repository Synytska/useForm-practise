'use client';
import { ColumnDef } from '@tanstack/react-table';
import { IFormInput } from '@/src/common/interfaces/IformInput';

import { SortButton } from './SortButton';
import { DropDown } from './DropDown';

import { FIRST_NAME, LAST_NAME, PH_NUMBER, EMAIL, CATEGORY } from '@/src/common/constants/common_const';
import { ACTIONS, DELETE, OPEN } from '../constants/data_table';

export const Columns = (onDelete: (id: string | undefined) => void): ColumnDef<IFormInput>[] => [
    {
        accessorKey: 'firstname',
        header: ({ column }) => {
            return <SortButton column={column} text={FIRST_NAME} />;
        }
    },
    {
        accessorKey: 'lastname',
        header: ({ column }) => {
            return <SortButton column={column} text={LAST_NAME} />;
        }
    },
    {
        accessorKey: 'email',
        header: EMAIL
    },
    {
        accessorKey: 'phonenumber',
        header: PH_NUMBER
    },
    {
        accessorKey: 'category',
        header: ({ column }) => {
            return <SortButton column={column} text={CATEGORY} />;
        }
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const contact = row.original;
            return <DropDown open={OPEN} label={ACTIONS} action={() => onDelete(contact.id)} action_text={DELETE} />;
        }
    }
];
