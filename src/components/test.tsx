// 'use client';

// import { useForm } from 'react-hook-form';
// import React, { useState } from 'react';
// import axios from 'axios';
// import { z } from 'zod';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useCallback } from 'react';
// import { Button } from '@/components/ui/button';
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { useToast } from '@/components/ui/use-toast';

// import { Input } from '@/components/ui/input';

// import { FORM_INPUT, ADD_BUTT } from '../constants/formconstants';

// const formSchema = z.object({
//     firstname: z.string().min(2).max(50),
  
// });

// export const FormComponent = () => {
//     const [formData, setFormData] = useState({
//         firstname: '',
      
//     });
//     const { toast } = useToast();

//     const form = useForm<z.infer<typeof formSchema>>({
//         resolver: zodResolver(formSchema),
//         defaultValues: {
//             firstname: '',
         
//         }
//     });

//     const handleChange = (e: any) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         });
//     };

//     const onSubmit = useCallback(
//         async (values: z.infer<typeof formSchema>) => {
//             try {
//                 const response = await axios.post('http://localhost:3001/api/savePerson', values);
//                 toast({
//                     title: 'Person saved successfully:',
//                     description: (
//                         <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
//                             <code className="text-white">{JSON.stringify(response.data, null, 2)}</code>
//                         </pre>
//                     )
//                 });
//             } catch (error) {
//                 toast({
//                     title: 'Error saving person:',
//                     description: (
//                         <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
//                             <code className="text-white">{JSON.stringify(error, null, 2)}</code>
//                         </pre>
//                     )
//                 });
//             }
//         },
//         [toast]
//     );
//     return (
//         <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-1/3 mx-auto">

//                     <FormField

//                         control={form.control}
//                         name="firstname"
//                         render={({ field }) => (
//                             <FormItem>
//                                 <FormLabel>First Name</FormLabel>
//                                 <FormControl>
//                                     <Input placeholder="firstname" {...field} onChange={handleChange} value={formData.firstname}/>
//                                 </FormControl>
//                                 <FormMessage />
//                             </FormItem>
//                         )}
//                     />
              

//                 <Button type="submit">{ADD_BUTT}</Button>
//             </form>
//         </Form>
//     );
// };

'use client';
import { useForm } from 'react-hook-form';
import React from 'react';
import axios from 'axios';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { FORM_INPUT, ADD_BUTT } from '../constants/formconstants';

const formSchema = z.object({
    firstname: z.string().min(2).max(50),
    email: z.string()
});

export const FormComponent = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstname: '',
            email: ''
        }
    });

    const { toast } = useToast();

    const onSubmit = useCallback(
        async (values: z.infer<typeof formSchema>) => {
            try {
                const response = await axios.post('http://localhost:3001/api/savePerson', values);
                toast({
                    title: 'Person saved successfully:',
                    description: (
                        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                            <code className="text-white">{JSON.stringify(response.data, null, 2)}</code>
                        </pre>
                    )
                });
                // Скидаємо значення форми після успішного відправлення
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
                <FormField
                    control={form.control}
                    name="firstname"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                                <Input placeholder="firstname" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel> em</FormLabel>
                            <FormControl>
                                <Input placeholder="firstname" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">{ADD_BUTT}</Button>
            </form>
        </Form>
    );
};

