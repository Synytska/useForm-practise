import { FIRST_NAME, LAST_NAME, EMAIL, PH_NUMBER } from '@/src/common/constants/common_const';

export const FORM_INPUT = [
    { name: 'firstname', label: FIRST_NAME, placeholder: 'Type your first name...' },
    { name: 'lastname', label: LAST_NAME, placeholder: 'Type your last name...' },
    { name: 'email', label: EMAIL, placeholder: 'Type your email...' },
    { name: 'phonenumber', label: PH_NUMBER, placeholder: 'Type your phone number...' }
] as const;

export const ADD_BUTT = 'Add';

export const SELECT = {
    name: 'category',
    label: 'Category',
    items: ['work', 'home', 'other'],
    placeholder: 'Select a category to display'
};
