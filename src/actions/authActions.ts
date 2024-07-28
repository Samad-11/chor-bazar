"use server"
import * as z from 'zod'
import { hash } from 'bcryptjs'
import prisma from '@/lib/prisma';







const passwordValidation = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);
const registerSchema = z.object({
    name: z.string().min(3, "Name should have minimum of 3 characters").max(30, "Name should have maximum 30 characters"),
    email: z.string().email({ message: "Invalid Email" }).min(1, "Email filed is required"),
    password: z.string().regex(passwordValidation, "Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character"),
    confirmPassword: z.string().regex(passwordValidation, "Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character")
}).refine((data) => data.confirmPassword === data.confirmPassword, {
    message: "Password don't match",
    path: ["confirmPassword"],
})

export async function registerUser(formData: FormData) {
    const validation = registerSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirmPassword")
    })

    if (validation.success) {

        const name = formData.get("name") as string
        const email = formData.get("email") as string
        const password = formData.get("password") as string
        const confirmPassword = formData.get("confirmPassword") as string

        const hashedPassword = await hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email, name, hashedPassword
            }
        })
        if (!user) {
            return { message: "Something went wrong", ok: false, user: null }
        }

        return {
            message: "Account successfully create",
            user
        }
    } else {
        return {
            errors: validation.error.issues,
            user: null
        }
    }
}


export const getUserIdByEmail = async (email: string | null | undefined) => {
    if (!email) return null
    const userId = await prisma.user.findUnique({
        where: {
            email
        },
        select: {
            id: true
        }
    })
    if (userId) {
        return userId
    }
    return null
}


// export async function registerUser(_prevState: any, formData: FormData) {
//     const validation = registerSchema.safeParse({
//         name: formData.get("name"),
//         email: formData.get("email"),
//         password: formData.get("password"),
//         confirmPassword: formData.get("confirmPassword")
//     })
//     try {

//         if (validation.success) {
//             console.debug('schema validation done');

//         } else {
//             return {
//                 errors: validation.error.issues
//             }
//         }
//     } catch (error) {
//         return {
//             message: "Something went wrong", ok: false
//         }
//     }
// }