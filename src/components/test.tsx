'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export const Test = () => {
    const [data, setData] = useState({});
    // const [firstname, setFirstN] = useState('');
    // const [lastname, setLastN] = useState('');
    // const [email, setEmail] = useState('');
    const router = useRouter();

    const onChange = (e: any) => {
        const { name, value } = e.target;
        console.log(`${name} ${value}`)
        setData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const onSubmit = async (e: any) => {
        e.preventDefault();

        try {
            // const body = { firstname, lastname, email };
            const response = await fetch('/api/createUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                router.push('/');
            } else {
                console.error('Failed to create user');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <input
                type="text"
                name="firstname"
                // value={e.target.value}
                onChange={onChange}
                placeholder="Ім'я"
            />
            <input
                type="text"
                name="lastname"
                // value={lastname}
                onChange={onChange}
                placeholder="Прізвище"
            />
            <input
                type="text"
                name="email"
                // value={email}
                onChange={onChange}
                placeholder="Прізвище"
            />
             <input
                type="text"
                name="phonenumber"
                // value={email}
                onChange={onChange}
                placeholder="phone"
            />
             <input
                type="text"
                name="category"
                // value={email}
                onChange={onChange}
                placeholder="cat"
            />
            <button type="submit">Створити користувача</button>
        </form>
    );
};

