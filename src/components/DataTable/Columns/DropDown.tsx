import { MouseEventHandler } from 'react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

import { MoreHorizontal } from 'lucide-react';

interface IDropDown {
    open: string;
    label: string;
    action: MouseEventHandler<HTMLDivElement>;
    action_text: string;
}
export const DropDown = ({ open, label, action, action_text }: IDropDown) => (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">{open}</span>
                <MoreHorizontal className="h-4 w-4" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuLabel>{label}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={action}>{action_text}</DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
);
