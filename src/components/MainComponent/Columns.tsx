'use client';
import { ColumnDef } from '@tanstack/react-table';
import { Contact } from '@/src/zod_schemas/formSchema';
import { MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import axios from 'axios';

export const Columns = (onDelete: (id: string) => void): ColumnDef<Contact>[] => [
    {
        accessorKey: 'firstname',
        header: 'First name'
    },
    {
        accessorKey: 'lastname',
        header: 'Last name'
    },
    {
        accessorKey: 'email',
        header: 'Email'
    },
    {
        accessorKey: 'phonenumber',
        header: 'Phone number'
    },
    {
        accessorKey: 'category',
        header: 'Category'
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const payment = row.original;
            // const onDelete = async (id: string) => {
            //     try {
            //         await axios.delete(`http://localhost:3004/api/deletePerson/${id}`);
            //         alert('Person deleted successfully');
            //     } catch (error) {
            //         console.error('Error deleting person:', error);
            //         alert('Error deleting person');
            //     }
            // };
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment._id)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onDelete(payment._id)}>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        }
    }
];

