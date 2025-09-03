import React from "react";
import { cn } from "@/lib/utils";

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean,
    size?: "smm" |"sm" | "md" | "lg",
    varient?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "success" | "custome"
}

const Button: React.FC<IButton> = ({
    className,
    children,
    varient = "primary",
    size = "lg",
    isLoading = false,
    ...props
}) => {

    const baseStyles =
        'font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'

    const variants = {
        primary:
            'bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800',
        secondary:
            'bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600',
        outline:
            'border border-gray-300 bg-transparent hover:bg-gray-100 dark:border-dark-border-medium dark:hover:bg-gray-800 dark:hover:text-gray-100 dark:text-gray-100',
        ghost:
            'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-100 dark:text-gray-100',
        danger: 'bg-red-600 text-white hover:bg-red-700',
        success: 'bg-green-600 text-white hover:bg-green-700',
        custome:'bg-black text-white'
    }

    const sizes = {
        smm: 'h-6 px-1 text-xs rounded-sm',
        sm: 'h-8 px-3 text-xs rounded-md',
        md: 'h-10 px-4 py-2 text-sm rounded-md',
        lg: 'h-12 px-6 py-3 text-base rounded-lg',
    }

    return (
        <button
            className={cn(
                baseStyles,
                variants[varient],
                sizes[size],
                className,
                isLoading && 'opacity-70 cursor-not-allowed'
            )}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button