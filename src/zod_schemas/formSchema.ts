import { z } from 'zod';

export const formSchema = z.object({
    _id: z.string(),
    firstname: z.string().min(2).max(50),
    lastname: z.string().min(2).max(50),
    email: z.string().email(),
    phonenumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),
    category: z.string().refine((val) => ['family', 'work', 'other'].includes(val), {
        message: 'Please select a valid category'
    })
});

export type Contact = z.infer<typeof formSchema>;
