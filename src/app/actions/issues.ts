'use server'

import { db } from "@/db";
import { issuesTable } from "@/db/schema";
import { getCurrentUser } from "@/lib/dal";
import {
    ActionResponse,
    IssuesSchema,
    type IssuesData
} from "@/lib/type";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";

//create
export async function createIssues(data: IssuesData): Promise<ActionResponse> {
    try {
        const user = await getCurrentUser()
        if (!user) {
            return {
                success: false,
                message: "Unauthorized access",
                error: "Unauthorized"
            }
        }

        const validate = await IssuesSchema.safeParse(data)
        // console.log(data)
        // console.log(validate)
        if (!validate.success) {
            return {
                success: false,
                message: "Validation fail",
                errors: validate.error.flatten().fieldErrors
            }
        }

        const validatedData = validate.data
        await db.insert(issuesTable).values({
            title: validatedData.title,
            description: validatedData.description || null,
            status: validatedData.status,
            priority: validatedData.priority,
            userId: validatedData.userId,
        })

        revalidateTag("issues")
        return {
            success: true,
            message: "Issues created successfully"
        }
    } catch (error) {
        console.log("Error while creating issues :: ", error)
        return {
            success: false,
            message: "Error while creating issues",
            error: 'Failed to create issue',
        }
    }
}

//update
export async function updateIssues(id: number, data: Partial<IssuesData>): Promise<ActionResponse> {
    try {
        const user = await getCurrentUser()
        if (!user) {
            return {
                success: false,
                message: "Unauthorized access",
                error: "Unauthorized"
            }
        }

        const partialdata = IssuesSchema.partial()
        const validate = await partialdata.safeParse(data)
        // console.log(data)
        // console.log(validate)
        if (!validate.success) {
            return {
                success: false,
                message: "Validation fail",
                errors: validate.error.flatten().fieldErrors
            }
        }

        const validateData = validate.data
        const updatedData: Record<string, unknown> = {}

        if (validateData.title !== undefined) updatedData.title = validateData.title
        if (validateData.description !== undefined) updatedData.description = validateData.description
        if (validateData.status !== undefined) updatedData.status = validateData.status
        if (validateData.priority !== undefined) updatedData.priority = validateData.priority

        await db.update(issuesTable).set(updatedData).where(eq(issuesTable.id, id))
        revalidateTag("issues")

        return {
            success: true,
            message: "Issues updated successfully"
        }
    } catch (error) {
        console.log("Error while updating Issues :: ", error)
        return {
            success: false,
            message: "Error while updating Issues",
            error: 'Failed to update issue',
        }
    }
}

//delete
export async function deleteIssues(id: number) {
    try {
        const user = await getCurrentUser()
        if (!user) {
            return {
                success: false,
                message: "Unauthorized access",
                error: "Unauthorized"
            }
        }

        await db.delete(issuesTable).where(eq(issuesTable.id, id))
        revalidateTag("issues")
        return{
            success:true,
            message:"Issue Delete successfully"
        }
    } catch (error) {
        console.error('Error deleting issue:', error)
        return {
            success: false,
            message: 'An error occurred while deleting the issue',
            error: 'Failed to delete issue',
        }
    }
}