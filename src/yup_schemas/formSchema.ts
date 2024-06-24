import * as yup from 'yup';

export const formSchema = yup.object().shape({
    firstname: yup.string().required('FirstName is a required field'),
    lastname: yup.string().required('LastName is a required field'),
    email: yup.string().required().email(),
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
