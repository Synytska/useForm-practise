'use client';
import { ColumnDef } from '@tanstack/react-table';
import { IFormInput } from '@/src/common/interfaces/IformInput';

import { SortButton } from './SortButton';
import { DropDown } from './DropDown';

import { FIRST_NAME, LAST_NAME, PH_NUMBER, EMAIL, CATEGORY } from '@/src/common/constants/common_const';
import { ACTIONS, DELETE, OPEN, ACTIONS_SML } from '../constants/data_table';

export const Columns = (onDelete: (id: string | undefined) => void): ColumnDef<IFormInput>[] => [
    {
        accessorKey: FIRST_NAME.sml,
        header: ({ column }) => {
            return <SortButton column={column} text={FIRST_NAME.bgl} />;
        }
    },
    {
        accessorKey: LAST_NAME.sml,
        header: ({ column }) => {
            return <SortButton column={column} text={LAST_NAME.bgl} />;
        }
    },
    {
        accessorKey: EMAIL.sml,
        header: () => <div className="pl-4">{EMAIL.bgl}</div>
    },
    {
        accessorKey: PH_NUMBER.sml,
        header: () => <div className="pl-4">{PH_NUMBER.bgl}</div>
    },
    {
        accessorKey: CATEGORY.sml,
        header: ({ column }) => {
            return <SortButton column={column} text={CATEGORY.bgl} />;
        }
    },
    {
        id: ACTIONS_SML,
        cell: ({ row }) => {
            const contact = row.original;
            return <DropDown open={OPEN} label={ACTIONS} action={() => onDelete(contact.id)} action_text={DELETE} />;
        }
    }
];

