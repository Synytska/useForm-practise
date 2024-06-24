import * as yup from 'yup';

export const formSchema = yup.object().shape({
    firstname: yup
        .string()
        .max(20, 'FirstName has a maximum limit of 20 characters')
        .matches(/^[A-Za-z]+$/, 'FirstName should contain only letters')
        .required('FirstName is a required field'),
    lastname: yup
        .string()
        .max(20, 'LastName has a maximum limit of 20 characters')
        .matches(/^[A-Za-z]+$/, 'FirstName should contain only letters')
        .required('LastName is a required field'),
    email: yup.string().required().email().min(10, 'Email must be at least 10 characters'),
    phonenumber: yup
        .string()
        .required('Phone is a required field')
        .matches(/^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, 'Use "+" and country code'),
    category: yup
        .string()
        .required('Zipcode is a required field')
        .oneOf(['work', 'home', 'other'])
        .label('Selected Category')
});
