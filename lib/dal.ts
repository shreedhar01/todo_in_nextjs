import { db } from "@/db"
import { getSession } from "./auth"
import { userTable, issuesTable } from "@/db/schema"
import { eq } from "drizzle-orm"
import { cache } from "react"
import { unstable_cacheTag as cacheTag } from "next/cache"

//current user
export const getCurrentUser = async () => {
    try {
        const session = await getSession()
        if (!session) return null

        if (typeof window === "undefined" && process.env.NEXT_PHASE === 'phase-production-build') {
            return null
        }

        const user = await db.select().from(userTable).where(eq(userTable.id, session.userId))
        return user[0] || null
    } catch (error) {
        console.log("Error while getting user :: ", error)
        return null
    }
}

//get user by email
export const getUserByEmail = cache(async (email: string) => {
    try {
        const user = await db.select().from(userTable).where(eq(userTable.email, email))
        return user[0] || null
    } catch (error) {
        console.log("Error while Getting User by Email :: ", error)
        return null
    }
})

//fetcher function for react query
export const getIssue = async (issueId: number) => {
    try {
        const issue = await db.query.issuesTable.findFirst({
            where: eq(issuesTable.id, issueId),
            with: { user: true }
        })
        return issue || null
    } catch (error) {
        console.log("Error while fetching issue ::", error)
        throw new Error('Failed to fetch issue')
    }
}

//getIssues
export const getIssues = async () => {
    'use cache'
    cacheTag('issues')
    try {
        const issues = await db.query.issuesTable.findMany({
            with: { user: true },
            orderBy: (issuesTable, { desc }) => [desc(issuesTable.createdAt)]
        })
        return issues
    } catch (error) {
        console.log("Error fetching issues :: ",error)
        throw new Error("Failed to fetch issues")
    }
}