"use client"

import { signIn } from "next-auth/react"
import { FaGoogle } from "react-icons/fa"

const LoginWithGoogle = () => {
    return (
        <button
            className="btn  text-red-500 font-extrabold btn-ghost"
            onClick={async () => {
                const res = await signIn("google", { callbackUrl: "/" })
            }}>
            Login with google
            <span><FaGoogle /></span>
        </button>
    )
}

export default LoginWithGoogle