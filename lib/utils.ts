import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Sort button
export const toggleSort = (column: any) => () => column.toggleSorting(column.getIsSorted() === 'asc')
