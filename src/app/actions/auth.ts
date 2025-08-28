"use server"

import { z } from "zod"
import {
    createSession,
    createUser,
    deleteSession,
    verifyPassword
} from "@/lib/auth"
import { getUserByEmail } from "@/lib/dal"
import { redirect } from "next/navigation"
import {type ActionResponse,signInSchema, signUpSchema } from "@/lib/type"

//signup
export async function signUp(formData: FormData): Promise<ActionResponse> {
    try {
        const data = {
            email: formData.get("email") as string,
            password: formData.get("password") as string,
            confirmPassword: formData.get("confirmPassword") as string
        }

        const validate = signUpSchema.safeParse(data)
        if (!validate.success) {
            return {
                success: false,
                message: "validation fail",
                errors: validate.error.flatten().fieldErrors
            }
        }

        const user = await getUserByEmail(data.email)
        if (user) {
            return {
                success: false,
                message: "User already exist with given email"
            }
        }

        const createuser = await createUser(data.email, data.password)
        if (!createuser) {
            return {
                success: false,
                message: "User creation fail"
            }
        }

        await createSession(createuser.id)
        return {
            success: true,
            message: "Account created successfully"
        }
    } catch (error) {
        console.log("Error while creating account :: ", error)
        return {
            success: false,
            message: "Error while creating account"
        }
    }
}

//signin
export async function signIn(formData: FormData): Promise<ActionResponse> {
    try {
        const data = {
            email: formData.get("email") as string,
            password: formData.get("password") as string
        }

        const validate = signInSchema.safeParse(data)
        if (!validate.success) {
            return {
                success: false,
                message: "validation error",
                errors: validate.error.flatten().fieldErrors
            }
        }

        const user = await getUserByEmail(data.email)
        if (!user) {
            return {
                success: false,
                message: "User doesn't exist",
                errors: {
                    email: ['Invalid email or password'],
                },
            }
        }

        const isPasswordValid = await verifyPassword(data.password, user.password)
        if (!isPasswordValid) {
            return {
                success: false,
                message: "Incorrect password",
                errors: {
                    password: ['Invalid email or password'],
                },
            }
        }

        await createSession(user.id)
        return {
            success: true,
            message: "user sign in success"
        }
    } catch (error) {
        console.log("Error signIn :: ", error)
        return {
            success: false,
            message: "Sign unsuccess"
        }
    }
}

//signout
export async function signOut(): Promise<void> {
    try {
        await deleteSession()
    } catch (error) {
        console.error('Sign out error:', error)
        throw new Error('Failed to sign out')
    } finally {
        redirect("/sign-in")
    }
}