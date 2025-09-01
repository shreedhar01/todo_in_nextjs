import { z } from "zod"

export type ActionResponse = {
    success: boolean,
    message: string,
    errors?: Record<string, string[]>,
    error?: string
}

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


export const IssuesSchema = z.object({
    title: z
        .string()
        .min(5, "Title should be minimum 5 letter")
        .max(50, "Title should not be more then 50 words"),
    description: z.string().optional().nullable(),
    status: z
        .enum(['backlog', 'todo', 'in_progress', 'done'],{
            error: (issue) => `Invalid status value. Received '${issue.input}'`
        }),
    priority:z.enum(['low', 'medium', 'high'],{
        error: (issue) => `Invalid priority value. Received '${issue.input}'`
    }),
    userId: z.string().min(1, 'User ID is required'),
})

export type IssuesData = z.infer<typeof IssuesSchema>