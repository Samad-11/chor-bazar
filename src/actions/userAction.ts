"use server"

import { auth } from "@/auth"
import prisma from "@/lib/prisma"

export async function getUserAddress(userId: string | null | undefined) {
    if (!userId) return null
    try {
        const address = await prisma.address.findUnique({
            where: {
                userId
            }
        })
        return address
    } catch (error) {
        return null
    }
}


export async function addUpdateUserAddress(formdata: FormData, userId: string) {
    try {
        const phone = formdata.get("phone") as string || ""
        const address1 = formdata.get("address1") as string || ""
        const address2 = formdata.get("address2") as string || ""
        const city = formdata.get("city") as string || ""
        const state = formdata.get("state") as string || ""
        const pin = formdata.get("pin") as string || ""

        const isAddressExist = await prisma.address.findUnique({
            where: {
                userId
            }
        })

        if (isAddressExist) {
            const updatedAddress = await prisma.address.update({
                where: {
                    userId
                },
                data: {
                    address1, address2, city, phone, pin, state
                }
            })
            return { message: "Address Updated", ok: true }
        } else {
            const newAddress = await prisma.address.create({
                data: {
                    address1, address2, city, phone, pin, state, userId
                }
            })
            return { message: "Address Added", ok: true }
        }

    } catch (error) {
        return { message: "Something went wrong", ok: false }
    }
}

export const getSessions = async () => {
    try {

        return await auth()
    } catch (error) {
        console.log("error in getSession", error);
        return null
    }
}

