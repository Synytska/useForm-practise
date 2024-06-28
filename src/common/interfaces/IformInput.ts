export interface IFormInput {
    id?: string;
    firstname: string;
    lastname: string;
    email: string;
    phonenumber: string;
    category: 'work' | 'home' | 'other';
}