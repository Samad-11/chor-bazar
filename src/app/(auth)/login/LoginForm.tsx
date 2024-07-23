'use client'

import { customError, customSuccess } from '@/utils/customToast'
import { Session } from 'next-auth'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { FormEvent, useRef, useState } from 'react'
import toast from 'react-hot-toast'

const LoginForm = ({ session }: { session: Session | null }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { push, refresh } = useRouter()
    const toastRef = useRef<string>()

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        toastRef.current = toast.loading("Signing...")
        const res = await signIn("credentials", {
            callbackUrl: "/",
            email,
            password,
            redirect: false
        })
        toast.dismiss(toastRef.current)

        if (res?.ok) {
            push("/")
            refresh()
            customSuccess("Sign in successful")
        } else {
            customError("Something went wrong")
        }

    }
    return (
        <div className=' mt-20'>
            <form onSubmit={handleLogin} className='max-w-md flex flex-col gap-4 mx-auto'>
                <label className="input input-bordered flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                        <path
                            d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                    </svg>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="text" className="grow" placeholder="Email" />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            fillRule="evenodd"
                            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                            clipRule="evenodd" />
                    </svg>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password" className="grow" placeholder='Password' />
                </label>

                <label className="btn btn-block btn-primary flex items-center gap-2">
                    <button type="submit">Submit</button>
                </label>
                <div className='flex gap-2 items-center text-primary'>
                    <p>Don&apos; have an account </p>
                    <Link className='font-semibold link-hover' href={"/register"}>Register now</Link>
                </div>
            </form>
        </div>
    )
}

export default LoginForm