import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const result = await prisma.person.findMany();
            console.log(result);

            console.log('Users found', result);
            return res.status(200).json(result);
        } catch (error) {
            console.error('Error finding user:', error);
            return res.status(500).json({ error: 'Error finding user', details: error.message });
        } finally {
            await prisma.$disconnect();
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
