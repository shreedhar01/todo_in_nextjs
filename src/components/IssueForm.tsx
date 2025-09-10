'use client'

import React, { useActionState } from "react"
import { Form, FormError, FormGroup, FormInput, FormLabel, FormSelect, FormTextArea } from "./ui/Form"
import { issueTable, ISSUE_STATUS, ISSUE_PRIORITY } from "@/db/schema"
import Button from "./ui/Button"
import { useRouter } from "next/navigation"
import { ActionResponse } from "@/lib/type"
import { createIssues, updateIssues } from "../app/actions/issues"

interface IssueFormProps {
    issue?: issueTable,
    userId: string
    isEditing?: boolean
}

const initialState: ActionResponse = {
    success: false,
    message: '',
    errors: undefined,
}

const IssueForm: React.FC<IssueFormProps> = ({ issue, userId, isEditing = false }) => {
    const router = useRouter()

    const [state, formAction, isPending] = useActionState<ActionResponse, FormData>(async (prevState: ActionResponse, formData: FormData) => {
        try {
            const data = {
                title: formData.get('title') as string,
                description: formData.get('description') as string,
                status: formData.get('status') as 'backlog' | 'todo' | 'in_progress' | 'done',
                priority: formData.get('priority') as 'low' | 'medium' | 'high',
                userId,
            }

            const result = isEditing ? await updateIssues(Number(issue!.id), data) : await createIssues(data)
            if (result.success) {
                router.refresh()
                router.push("/dashboard")
            }

            return result
        } catch (error) {
            console.log("Error while forming data :: ", error)
            return {
                success: false,
                message: (error as Error).message || 'An error occurred',
                errors: undefined,
            }

        }
    }, initialState)

    const statusoption = Object.values(ISSUE_STATUS).map(({ label, value }) => ({ label, value }))
    // console.log(statusoption);
    
    const priorityoption = Object.values(ISSUE_PRIORITY).map(({ label, value }) => ({ label, value }))

    return (
        <Form action={formAction}>
            {state?.message && (
                <FormError
                    className={`mb-4 ${state.success ? 'bg-green-100 text-green-800 border-green-300' : ''
                        }`}
                >
                    {state.message}
                </FormError>
            )}
            <FormGroup>
                <FormLabel htmlFor="title" >Title</FormLabel>
                <FormInput
                    id="title"
                    name="title"
                    minLength={3}
                    maxLength={50}
                    disabled={isPending}
                    defaultValue={issue?.title}
                    aria-describedby="title-error"
                    placeholder="Enter a title"
                />
                {
                    state?.errors?.title && (
                        <p id="title-error" className="text-sm text-red-500">{state?.errors?.title}</p>
                    )
                }
            </FormGroup>
            <FormGroup>
                <FormLabel htmlFor="description" >Description</FormLabel>
                <FormTextArea
                    id="description"
                    name="description"
                    disabled={isPending}
                    defaultValue={issue?.description || ""}
                    aria-describedby="description-error"
                    placeholder="Enter a Description"
                />
                {
                    state?.errors?.description && (
                        <p id="description-error" className="text-sm text-red-500">
                            {state.errors.description}
                        </p>
                    )
                }
            </FormGroup>
            <div className="grid md:grid-cols-2 gap-x-2 gap-y-6">
                <FormGroup>
                    <FormLabel htmlFor="status" >Status</FormLabel>
                    <FormSelect
                        id="status"
                        name="status"
                        aria-describedby="status-error"
                        defaultValue={statusoption[0].value || "backlog"}
                        options={statusoption}
                    />
                    {
                        state?.errors?.status && (
                            <p id="status-error" className="text-sm text-red-500">{state?.errors?.status[0]}</p>
                        )
                    }
                </FormGroup>
                <FormGroup>
                    <FormLabel htmlFor="priority" >Priority</FormLabel>
                    <FormSelect
                        id="priority"
                        name="priority"
                        aria-describedby="priority-error"
                        defaultValue={priorityoption[0].value || "medium"}
                        options={priorityoption}
                    />
                    {
                        state?.errors?.status && (
                            <p id="priority-error" className="text-sm text-red-500">{state?.errors?.status}</p>
                        )
                    }
                </FormGroup>
            </div>
            <div className="flex justify-end gap-x-4">
                <Button
                    type="button"
                    size="md"
                    onClick={() => router.back()}
                    className="bg-red-500 hover:bg-red-700"
                    isLoading={isPending}
                >Cancel</Button>
                <Button
                    size="md"
                    type="submit"
                    className="bg-green-500 hover:bg-green-700"
                    isLoading={isPending}
                >
                    {isEditing ? 'Update Issue' : 'Create Issue'}
                </Button>
            </div>
        </Form>
    )
}

export default IssueForm