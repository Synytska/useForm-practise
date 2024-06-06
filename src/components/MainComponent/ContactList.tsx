'use client';
import axios from 'axios';

import { Columns } from './Columns';
import { DataTable } from './DataTable';
import { useState, useEffect } from 'react';

import { Contact } from '@/src/zod_schemas/formSchema';

export const ContactList = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3004/api/contactList');
            setContacts(response.data.data);
        } catch (error) {
            console.error('Error fetching persons:', error);
        }
    };

    const onDelete = async (id: string) => {
        try {
            await axios.delete(`http://localhost:3004/api/deletePerson/${id}`);
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

