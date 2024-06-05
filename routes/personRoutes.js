const express = require('express');
const Person = require('../src/models/Person');

const router = express.Router();

router.post('/savePerson', async (req, res) => {
    const personData = req.body;

    try {
        const person = new Person(personData);
        const savedPerson = await person.save();
        res.status(201).json({ message: 'Person saved successfully', data: savedPerson });
    } catch (error) {
        console.error('Error creating and saving person:', error);
        res.status(500).json({ message: 'Error saving person', error: error.message });
    }
});

module.exports = router;