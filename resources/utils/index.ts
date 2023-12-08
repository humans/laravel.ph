export function className(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}
