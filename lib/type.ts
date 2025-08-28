import { z } from "zod"

export const signInSchema = z.object({
    email: z.string().min(1, "Email is required").email("Email is required"),
    password: z.string().min(8, "Password should be greater then 8 digit")
})

export const signUpSchema = z.object({
    email: z.string().min(1, "Email is required").email("Email is required"),
    password: z.string().min(8, "Password should be greater then 8 digit"),
    confirmPassword: z.string().min(8, "Password should be greater then 8 digit"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Password's don't match",
    path: ['confirmPassword']
})

export type SignInData = z.infer<typeof signInSchema>
export type SignUpData = z.infer<typeof signUpSchema>

export type ActionResponse = {
    success: boolean,
    message: string,
    errors?: Record<string, string[]>,
    error?: string
}