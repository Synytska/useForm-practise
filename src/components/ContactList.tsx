'use client';
import { useState, useEffect } from 'react';

import { Columns } from './DataTable/Columns/Columns';
import { DataTable } from './DataTable/DataTable';
import { HeaderComponent } from './HeaderComponent/HeaderComponent';

import { useToast } from '@/components/ui/use-toast';

import { IFormInput } from '@/src/common/interfaces/IformInput';

export const ContactList = () => {
    const [contacts, setContacts] = useState<IFormInput[]>([]);
    const { toast } = useToast();

    const fetchData = async () => {
        try {
            const response = await fetch('/api/showUsers', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();
            setContacts(responseData);
            console.log(contacts);
        } catch (error) {
            console.error('Error fetching persons:', error);
        }
    };

    const onDelete = async (id: string | undefined) => {
        try {
            const response = await fetch(`/api/deleteUsers?id=${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            toast({
                variant: 'positive',
                title: 'Person deleted successfully!'
            });
            fetchData();
        } catch (error) {
            console.error('Error deleting person:', error);
            toast({
                variant: 'destructive',
                title: 'Uh oh! Something went wrong. Try again later!'
            });
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <HeaderComponent />
            <div className="px-10 text-xl mt-8">{`You have ${contacts.length} contacts`}</div>
            <div className="container mx-auto py-4">
                <DataTable columns={Columns(onDelete)} data={contacts} />
            </div>
        </div>
    );
};

