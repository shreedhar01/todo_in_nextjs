import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...names:ClassValue[]) {
    return twMerge(clsx(names))
}

