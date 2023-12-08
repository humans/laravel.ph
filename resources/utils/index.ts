import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function className(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const usingModifierKeys = (event) => event?.shiftkKey || event?.metaKey || event?.ctrlKey || event?.altKey
