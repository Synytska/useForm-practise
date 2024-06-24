'use client';
import { useForm } from 'react-hook-form';
// import {  Contact } from '../zod_schemas/formSchema';
import { formSchema } from '../yup_schemas/formSchema';
import { yupResolver } from '@hookform/resolvers/yup';

// import { zodResolver } from '@hookform/resolvers.zod';
import { useRouter } from 'next/navigation';
import { ReloadIcon } from "@radix-ui/react-icons"

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';

import { FORM_INPUT, ADD_BUTT } from '../constants/formconstants';
import { useState } from 'react';

interface IFormInput {
    firstname: string;
    lastname: string;
    email: string;
    phonenumber: string;
    category: 'work' | 'home' | 'other';
}
export const FormComponent = () => {
    const router = useRouter();
    const { toast } = useToast();
    const [isLoading, setLoading] = useState(false)

    const form = useForm<IFormInput>({
        resolver: yupResolver(formSchema),
        defaultValues: {
            firstname: '',
            lastname: '',
            email: '',
            phonenumber: '',
            category: '' as 'work' | 'home' | 'other'
        }
    });

    const onSubmit = async (data: IFormInput) => {
        setLoading(true);
        try {
            const response = await fetch('/api/createUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const responseData = await response.json();

            if (response.ok) {
                console.log('User created successfully');
                toast({
                    title: 'User created!'
                });
                setLoading(false)
                form.reset();
                router.push('/');
            } else {
                console.error('Failed to create user:', responseData);
                toast({
                    title: 'Error',
                    description: 'User with this number already exist'
                });
            }
        } catch (error) {
            console.error('Unexpected error:', error);
            toast({
                title: 'Error',
                description: 'Unexpected error occurred'
            });
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-1/3 mx-auto">
                {FORM_INPUT.map((item) => (
                    <FormField
                        key={item.label}
                        control={form.control}
                        name={item.name}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{item.label}</FormLabel>
                                <FormControl>
                                    <Input placeholder={item.placeholder} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                ))}

                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select onValueChange={field.onChange}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a category to display" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="work">work</SelectItem>
                                    <SelectItem value="home">home</SelectItem>
                                    <SelectItem value="other">other</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {!isLoading ? (
                    <Button type="submit">{ADD_BUTT}</Button>
                ) : (
                    <Button disabled>
                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    </Button>
                )}
            </form>
        </Form>
    );
};

