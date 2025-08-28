import { compare, hash } from "bcrypt"
import { db } from "@/db"
import { userTable } from "@/db/schema"
import { nanoid } from "nanoid"
import { jwtVerify, SignJWT } from "jose"
import { cookies } from "next/headers"
import { cache } from "react"

interface JWTPayload {
    userId: string
    [key: string]: string | number | boolean | null | undefined
}


const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET)

const JWT_EXPIRATION = '7d'

const REFRESH_THRESHOLD = 24 * 60 * 60 // 24 hours in seconds

//hash password
export const hashPassword = async (password: string) => {
    return await hash(password, 10)
}

export async function verifyPassword(password: string, hashpassword: string) {
    return await compare(password, hashpassword)
}


//create new user
export const createUser = async (email: string, password: string) => {
    const hashpassword = await hashPassword(password)
    const id = nanoid()
    try {
        await db.insert(userTable).values({
            id,
            email,
            password: hashpassword
        })

        return { id, email }
    } catch (error) {
        console.log("Error Creating User", error);
        return null
    }
}

//generate jwt token
export const generateJWT = async (payload: JWTPayload) => {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(JWT_EXPIRATION)
        .sign(JWT_SECRET)
}

//verify jwt token
export const verifyJWT = async (token: string): Promise<JWTPayload | null> => {
    try {
        const { payload } = await jwtVerify(token, JWT_SECRET)
        return payload as JWTPayload
    } catch (error) {
        console.log("Jwt Verification fail :: ", error)
        return null
    }
}

//create new session
export const createSession = async (userId: string) => {
    try {
        const token = await generateJWT({ userId })
        const cookieStore = cookies()
            ; (await cookieStore).set({
                name: "auth_token",
                value: token,
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 60 * 60 * 24 * 7,//7day
                path: "/",
                sameSite: "lax"
            })
        return true
    } catch (error) {
        console.log("Error Creating Session :: ", error)
        return false
    }
}


//get session
export const getSession = cache(async () => {
    try {
        const cookieStore = cookies()
        const token = (await cookieStore).get("auth_token")?.value
        if (!token) return null

        const payload = await verifyJWT(token)
        return payload ? { userId: payload.userId } : null
    } catch (error) {
        console.log("Error while getting Session :: ", error)
        return null
    }
})



//should refresh session
export const shouldRefreshSession = cache(async (token: string) => {
    try {
        const { payload } = await jwtVerify(token, JWT_SECRET, { clockTolerance: 15 })

        const exp = payload.exp as number
        const now = Math.floor(Date.now() / 1000)

        return exp - now < REFRESH_THRESHOLD
    } catch (error) {
        return false
    }
})


//delete session
export const deleteSession = async () => {
    const cookieStore = cookies()
    ; (await cookieStore).delete("auth_token")
}