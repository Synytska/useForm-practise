'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { formSchema } from '../../yup_schemas/formSchema';
import { yupResolver } from '@hookform/resolvers/yup';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { IFormInput } from '../../common/interfaces/IformInput';
import { FORM_INPUT, ADD_BUTT, SELECT } from '../../common/constants/formconstants';

import { ReloadIcon } from '@radix-ui/react-icons';

export const FormComponent = () => {
    const { toast } = useToast();
    const [isLoading, setLoading] = useState(false);

    const form = useForm<IFormInput>({
        resolver: yupResolver(formSchema),
        mode: 'onChange',
        defaultValues: {
            firstname: '',
            lastname: '',
            email: '',
            phonenumber: '',
            category: '' as 'work' | 'home' | 'other'
        }
    });

    const { isValid, isDirty } = form.formState;

    const onClearForm = () => {
        form.reset();
    };

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
                    variant: 'positive',
                    title: 'User created successfully!'
                });
                form.reset();
            } else {
                console.error('Failed to create user:', responseData);
                toast({
                    variant: 'destructive',
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
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full mx-auto">
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
                            <FormLabel>{SELECT.label}</FormLabel>
                            <Select onValueChange={field.onChange}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a category to display" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {SELECT.items.map((item) => (
                                        <SelectItem key={item} value={item}>
                                            {item}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button className="w-1/2 mr-4" type="submit" disabled={!isValid || isLoading}>
                    {!isLoading || isValid ? ADD_BUTT : <ReloadIcon className="mx-auto h-4 w-4 animate-spin" />}
                </Button>
                <Button
                    className="w-[45%] bg-destructive hover:bg-hover"
                    onClick={onClearForm}
                    disabled={!isDirty}
                >
                    Clear
                </Button>
            </form>
        </Form>
    );
};

