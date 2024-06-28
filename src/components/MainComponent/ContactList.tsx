'use client';
import { Columns } from './Columns';
import { DataTable } from './DataTable';
import { useState, useEffect } from 'react';

import { IFormInput } from '@/src/common/interfaces/IformInput';

export const ContactList = () => {
    const [contacts, setContacts] = useState<IFormInput[]>([]);

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
            alert('Person deleted successfully');
            fetchData();
        } catch (error) {
            console.error('Error deleting person:', error);
            alert('Error deleting person');
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={Columns(onDelete)} data={contacts} />
        </div>
    );
};

