'use client'

import Button from "@/src/components/ui/Button"
import {
    Form,
    FormGroup,
    FormLabel,
    FormInput
} from "@/src/components/ui/Form"
import Link from "next/link"
import { useActionState } from "react"
import { type ActionResponse } from "@/lib/type"
import { signUp } from "../../actions/auth"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

const initialState: ActionResponse = {
    success: false,
    message: ""
}

const SignUp = () => {
    const router = useRouter()

    const [state, formAction, isPending] = useActionState<ActionResponse, FormData>(async (prevState: ActionResponse, formData: FormData) => {
        try {
            const result = await signUp(formData)
            if (result.success) {
                toast.success("Account created successfully")
                router.push("/dashboard")
            }
            return result
        } catch (error) {
            console.log("Error while signup :: ", error)
            return {
                success: false,
                message: (error as Error).message || "Error while sign up",
                errors: undefined
            }
        }
    }, initialState)

    return (
        <div className="flex flex-col justify-center items-center gap-y-8 min-h-screen w-full">
            <div className="flex flex-col items-center">
                <p className="text-3xl font-bold">Sign Up</p>
                <p className="text-2xl font-bold text-gray-400">Create a new account</p>
            </div>
            <Form
                action={formAction}
                className="md:min-w-30/100 max-w-30/100"
            >
                <FormGroup>
                    <FormLabel
                        htmlFor="email"
                        children="Email"
                    />
                    <FormInput
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="Enter your Email"
                    />
                    {
                        state?.errors?.email && (
                            <p id="email-error" className="text-sm text-red-500">{state?.errors?.email[0]}</p>
                        )
                    }
                </FormGroup>
                <FormGroup>
                    <FormLabel htmlFor="password" children="Password" />
                    <FormInput
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        placeholder="Enter password"
                    />
                    {
                        state?.errors?.password && (
                            <p id="password-error" className="text-sm text-red-500">{state?.errors?.password[0]}</p>
                        )
                    }
                </FormGroup>
                <FormGroup>
                    <FormLabel htmlFor="confirmPassword" children="Confirm Password" />
                    <FormInput
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        autoComplete="new-password"
                        placeholder="Confirm password"
                    />
                    {
                        state?.errors?.confirmPassword && (
                            <p id="confirmPassword-error" className="text-sm text-red-500">{state?.errors?.confirmPassword[0]}</p>
                        )
                    }
                </FormGroup>
                <div>
                    <Button
                        type="submit"
                        isLoading={isPending}
                        size="md"
                        children="Sign Up"
                        className="w-full"
                    />
                </div>
                <div className="text-center">
                    <p className="text-gray-400">Already have an account?
                        <Link
                            href="/sign-in"
                            className="text-gray-300 hover:text-white hover:underline transition-all duration-300 cursor-pointer">
                            Sign in
                        </Link></p>
                </div>
            </Form>

        </div>
    )
}

export default SignUp