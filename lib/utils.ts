import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...names: ClassValue[]) {
    return twMerge(clsx(names))
}

export const dateConverter = (time: Date) => {
    const diff = Date.now() - time.getTime()
    const seconds = Math.floor(diff / 1000)
    // console.log(seconds);
    

    if (seconds >= 31536000) {
        return `${Math.floor(seconds / 31536000)} year${Math.floor(seconds / 31536000)>1 ? "s":""} ago.`
    }
    if (seconds >= 2592000) {
        return `${Math.floor(seconds / 2592000)} month${Math.floor(seconds / 2592000)>1 ? "s":""} ago.`
    }
    if (seconds >= 86400) {
        return `${Math.floor(seconds / 86400)} day${Math.floor(seconds / 86400)>1 ? "s":""} ago.`
    }
    if (seconds >= 3600) {
        return `${Math.floor(seconds / 3600)} hour${Math.floor(seconds / 3600)>1 ? "s":""} ago.`
    }
    if (seconds >= 60) {
        return `${Math.floor(seconds / 60)} min${Math.floor(seconds / 60)>1 ? "s":""} ago.`
    }
    return `${Math.floor(seconds)} sec${Math.floor(seconds)>1 ? "s":""} ago.`
}

