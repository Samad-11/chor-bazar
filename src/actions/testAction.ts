"use server"

import { auth } from "@/auth";
import { Session } from "next-auth";

export async function getSession(): Promise<Session | null> {
    try {

        return await auth()
    } catch (error) {
        console.log("error getsession");
        return null
    }
}