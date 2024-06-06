'use client';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { formSchema, Contact } from '../zod_schemas/formSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback } from 'react';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';

import { FORM_INPUT, ADD_BUTT } from '../constants/formconstants';


export const FormComponent = () => {
    const { toast } = useToast();

    const form = useForm<Contact>({
        resolver: zodResolver(formSchema)
    });

    const onSubmit = useCallback(
        async (values: Contact) => {
            try {
                const response = await axios.post('http://localhost:3004/api/savePerson', values);
                toast({
                    title: 'Person saved successfully:',
                    description: (
                        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                            <code className="text-white">{JSON.stringify(response.data, null, 2)}</code>
                        </pre>
                    )
                });
            } catch (error) {
                toast({
                    title: 'Error saving person:', 
                    description: (
                        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                            <code className="text-white">{JSON.stringify(error, null, 2)}</code>
                        </pre>
                    )
                });
            }
        },
        [toast]
    );
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
                                    <SelectItem value="family">Family</SelectItem>
                                    <SelectItem value="work">Work</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">{ADD_BUTT}</Button>
            </form>
        </Form>
    );
};
