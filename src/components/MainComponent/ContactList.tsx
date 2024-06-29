'use client';
import { Columns } from './Columns';
import { DataTable } from './DataTable';
import { useState, useEffect } from 'react';

import { useToast } from '@/components/ui/use-toast';

import { ModeToggle } from './ModeTogle';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { IFormInput } from '@/src/common/interfaces/IformInput';
import { FormComponent } from '../FormComponent/FormComponent';

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
            <div className="bg-black w-full flex justify-between px-12 py-4 text-center items-center">
                <h1 className="text-[#f0f8ff] text-2xl">Contact Book</h1>
                <div className="flex gap-4">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline">Create</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogTitle>Create New Contact</DialogTitle>
                            <DialogDescription>Create new contact here. Click add when you're done.</DialogDescription>
                            <FormComponent />
                        </DialogContent>
                    </Dialog>
                    <ModeToggle />
                </div>
            </div>
            <div className='px-12 text-xl mt-8'>{`You have ${contacts.length} contacts`}</div>
            <div className="container mx-auto py-4">
                <DataTable columns={Columns(onDelete)} data={contacts} />
            </div>
        </div>
    );
};

