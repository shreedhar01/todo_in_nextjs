'use client'

import Button from "@/src/components/ui/Button"
import {
    Form,
    FormGroup,
    FormLabel,
    FormInput,
    FormError
} from "@/src/components/ui/Form"
import Link from "next/link"
import { useActionState } from "react"
import { ActionResponse } from "@/lib/type"
import { signIn } from "../../actions/auth"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

const initialState: ActionResponse = {
    success: false,
    message: '',
    errors: undefined,
}

const SignIn = () => {
    const router = useRouter()

    const [state, formAction, isPending] = useActionState<ActionResponse, FormData>(
        async (prevState: ActionResponse, formData: FormData) => {
            try {
                const result = await signIn(formData)

                if (result.success) {
                    toast.success("Sign In Successfully")
                    router.push("/dashboard")
                    router.refresh()
                }
                return result
            } catch (error) {
                return {
                    success: false,
                    message: (error as Error).message || 'An error occurred',
                    errors: undefined,
                }
            }
        }, initialState)
    return (
        <div className="flex justify-center items-center w-full min-h-screen">
            <div className="flex flex-col items-center w-full gap-y-8">
                <div className="flex flex-col items-center">
                    <p className="font-bold text-3xl">Mode</p>
                    <p className="font-bold text-xl text-gray-400">Sign in to your account</p>
                </div>
                <Form
                    action={formAction}
                    className="    md:min-w-30/100"
                >
                    {state?.message && !state.success && (
                        <FormError>{state.message}</FormError>
                    )}
                    <FormGroup>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <FormInput
                            id="email"
                            name="email"
                            type="email"
                            required
                            disabled={isPending}
                            placeholder="Enter your email"
                        />
                        {state?.errors?.email && (
                            <p id="email-error" className="text-sm text-red-500">
                                {state.errors.email[0]}
                            </p>
                        )}
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Password</FormLabel>
                        <FormInput
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            disabled={isPending}
                            placeholder="Enter your password"
                        />
                        {state?.errors?.password && (
                            <p id="password-error" className="text-sm text-red-500">
                                {state.errors.password[0]}
                            </p>
                        )}
                    </FormGroup>
                    <div>
                        <Button
                            isLoading={isPending}
                            size="md"
                            className="w-full"
                        >Sign In</Button>
                    </div>
                    <div className="flex justify-center w-full">
                        <p
                            className="flex text-gray-400 gap-x-2 "
                        >
                            Don&apos;t have an account?
                            <Link
                                href="/sign-up"
                                className="text-gray-300 hover:text-white hover:underline cursor-pointer transition-all duration-600"
                            >
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default SignIn