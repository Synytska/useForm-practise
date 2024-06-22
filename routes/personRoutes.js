// const express = require('express');
// const Person = require('../src/models/Person');

// const router = express.Router();

// router.post('/savePerson', async (req, res) => {
//     const personData = req.body;

//     try {
//         const person = new Person(personData);
//         const savedPerson = await person.save();
//         res.status(201).json({ message: 'Person saved successfully', data: savedPerson });
//     } catch (error) {
//         console.error('Error creating and saving person:', error);
//         res.status(500).json({ message: 'Error saving person', error: error.message });
//     }
// });

// router.get('/contactList', async (req, res) => {
//     try {
//         const list = await Person.find();
//         res.status(200).json({ data: list });
//     } catch (error) {
//         console.error('Error finding person:', error);
//         res.status(500).json({ message: 'Error finding person', error: error.message });
//     }
// });

// router.delete('/deletePerson/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         await Person.findByIdAndDelete(id);
//         res.status(200).json({ message: 'Person deleted successfully' });
//     } catch (error) {
//         console.error('Error deleting person:', error);
//         res.status(500).json({ message: 'Error deleting person', error: error.message });
//     }
// });
// module.exports = router;

