import { FIRST_NAME, LAST_NAME, EMAIL, PH_NUMBER } from '@/src/common/constants/common_const';
import { IFormInput } from '@/src/common/interfaces/IformInput';

export const FORM_INPUT = [
    { name: FIRST_NAME.sml as keyof IFormInput, label: FIRST_NAME.bgl, placeholder: 'Type your first name...' },
    { name: LAST_NAME.sml as keyof IFormInput, label: LAST_NAME.bgl, placeholder: 'Type your last name...' },
    { name: EMAIL.sml as keyof IFormInput, label: EMAIL.bgl, placeholder: 'Type your email...' },
    { name: PH_NUMBER.sml as keyof IFormInput, label: PH_NUMBER.bgl, placeholder: 'Type your phone number...' }
] as const;

export const ADD_BUTT = 'Add';

export const SELECT = {
    name: 'category' as keyof IFormInput,
    label: 'Category',
    items: ['work', 'home', 'other'],
    placeholder: 'Select a category to display'
};
