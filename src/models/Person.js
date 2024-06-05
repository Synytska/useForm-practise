const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  
    firstname: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        match: [/.+\@.+\..+/, 'Invalid email format']
    },
    phonenumber: {
        type: String,
        required: true,
        trim: true,
        match: [/^\+?[1-9]\d{1,14}$/, 'Invalid phone number']
    },
    category: {
        type: String,
        required: true,
        enum: ['family', 'work', 'other']
    }
});

const Person = mongoose.models.Person || mongoose.model('Person', personSchema);
module.exports = Person;

