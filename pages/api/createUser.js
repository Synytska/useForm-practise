// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export default async function handler(req, res) {
//     // if (req.method === 'POST') {
//     //     const data = req.body;

//     //     if (!data) {
//     //         return res.status(400).json({ error: 'No data provided' });
//     //     }
//     const { firstname, lastname } = req.body

//           const result =  await prisma.person.create({
//                 data: {
//                     firstname: firstname,
//                     lastname: lastname,

//                 },
//             });
//             console.log('created')

//             return res.status(201).json(result)
//         }

//     // } else {
//     //     res.status(405).json({ error: 'Method not allowed' });
//     // }
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;
        console.log(data);
        if (!data) {
            return res.status(400).json({ error: 'No data provided' });
        }

        try {
            const result = await prisma.person.create({
                data: {
                    firstname: data.firstname,
                    lastname: data.lastname,
                    email: data.email,
                    phonenumber: data.phonenumber,
                    category: data.category
                }
            });
            // console.log(result)
            return res.status(201).json(result);
        } catch (error) {
            console.error('Error creating user:', error);
            return res.status(500).json({ error: 'Error creating user' });
        } finally {
            await prisma.$disconnect();
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}

