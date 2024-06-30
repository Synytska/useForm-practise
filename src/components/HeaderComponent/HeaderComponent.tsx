import { ModeToggle } from './ModeTogle';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { FormComponent } from './FormComponent';

import { CONTACT_BOOK, CREATE, CREATE_NEW_CONTACT, DIALOG_DESCRIPT } from './constants/header_comp';

export const HeaderComponent = () => {
    return (
        <div className="bg-black w-full flex justify-between px-12 py-4 text-center items-center">
            <h1 className="text-[#f0f8ff] text-2xl">{CONTACT_BOOK}</h1>
            <div className="flex gap-4">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline">{CREATE}</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogTitle>{CREATE_NEW_CONTACT}</DialogTitle>
                        <DialogDescription>{DIALOG_DESCRIPT}</DialogDescription>
                        <FormComponent />
                    </DialogContent>
                </Dialog>
                <ModeToggle />
            </div>
        </div>
    );
};
