import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

//form
interface IForm extends React.FormHTMLAttributes<HTMLFormElement> {
    children: React.ReactNode
}

const Form: React.FC<IForm> = ({ children, className, ...props }) => {
    return (
        <form className={cn("flex flex-col gap-y-6", className)} {...props}>
            {children}
        </form>
    )
}


//form group
interface IFormGroup extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
}

const FormGroup: React.FC<IFormGroup> = ({ children, className, ...props }) => {
    return (
        <div className={cn("flex flex-col gap-y-6", className)} {...props}>
            {children}
        </div>
    )
}


//form label
interface IFormLabel extends React.LabelHTMLAttributes<HTMLLabelElement> {
    children: React.ReactNode
}

const FormLabel: React.FC<IFormLabel> = ({ children, className, ...props }) => {
    return (
        <label className={cn('text-sm font-medium text-gray-700', className)} {...props}>
            {children}
        </label >
    )
}


//form input
type TFormInput = React.InputHTMLAttributes<HTMLInputElement>

const FormInput = forwardRef<HTMLInputElement, TFormInput>(
    ({ className, ...props }, ref) => {
        return (
            <input
                ref={ref}
                className={cn('flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50', className)}
                {...props}
            />
        )
    }
)
FormInput.displayName = "formInput"  //for debug purpose


//form textarea
type TFormTextArea = React.TextareaHTMLAttributes<HTMLTextAreaElement>

const FormTextArea = forwardRef<HTMLTextAreaElement, TFormTextArea>(
    ({ className, ...props }, ref) => {
        return (
            <textarea
                ref={ref}
                className={cn('flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50', className)}
                {...props}
            />
        )
    }
)
FormTextArea.displayName = "formTextArea"


//form select
interface IFormSelect extends React.SelectHTMLAttributes<HTMLSelectElement> {
    options?: Array<{ label: string, value: string }>
}

const FormSelect = forwardRef<HTMLSelectElement, IFormSelect>(
    ({ children, className, options, ...props }, ref) => {
        return (
            <select
                ref={ref}
                className={cn('flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50', className)}
                {...props}
            >
                {
                    options
                        ? options.map(v =>
                            <option key={v.value} value={v.value}>{v.label}</option>
                        )
                        : children
                }
            </select>
        )
    }
)
FormSelect.displayName = "formSelect"


//form error
interface IFormParagraph extends React.HTMLAttributes<HTMLParagraphElement> {
    children: React.ReactNode
}

const FormError: React.FC<IFormParagraph> = ({ children, className, ...props }) => {
    return (
        <p
            className={cn('text-xs font-medium text-red-500', className)}
            {...props}
        >
            {children}
        </p>
    )
}


//form description


const FormDescription: React.FC<IFormParagraph> = ({ children, className, ...props }) => {
    return (
        <p
            className={cn('text-xs text-gray-500',className)}
            {...props}
        >
            {children}
        </p>
    )
}




export {
    Form,
    FormGroup,
    FormLabel,
    FormInput,
    FormTextArea,
    FormSelect,
    FormError,
    FormDescription
}