import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;

        if (!data) {
            return res.status(400).json({ error: 'No data provided' });
        }

        try {
            const existingPerson = await prisma.person.findUnique({
                where: { phonenumber: data.phonenumber }
            });

            if (existingPerson) {
                return res.status(400).json({ error: 'Користувач з таким номером телефону вже існує' });
            }

            const result = await prisma.person.create({
                data: {
                    firstname: data.firstname,
                    lastname: data.lastname,
                    email: data.email,
                    phonenumber: data.phonenumber,
                    category: data.category
                }
            });

            console.log('User created successfully:', result);
            return res.status(201).json(result);
        } catch (error) {
            console.error('Error creating user:', error);
            return res.status(500).json({ error: 'Error creating user', details: error.message });
        } finally {
            await prisma.$disconnect();
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}

