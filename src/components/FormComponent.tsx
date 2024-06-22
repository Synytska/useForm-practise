'use client';
import { useForm } from 'react-hook-form';
import { formSchema, Contact } from '../zod_schemas/formSchema';
// import { zodResolver } from '@hookform/resolvers.zod';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';

import { FORM_INPUT, ADD_BUTT } from '../constants/formconstants';

export const FormComponent = () => {
    const router = useRouter();
    const { toast } = useToast();

    const form = useForm<Contact>({
        // resolver: zodResolver(formSchema)
    });

    const onSubmit = async (data: Contact) => {
        console.log(data);

        try {
            const response = await fetch('/api/createUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                console.log('User created successfully');
                toast({
                    title: 'User created!'
                });
                router.push('/');
            } else {
                console.error('Failed to create user');
                toast({
                    title: 'Error',
                    description: 'Could not creat a user'
                });
            }
        } catch (error) {
            console.error(error);
            toast({
                title: 'Error',
                description: 'Could not creat a user'
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

