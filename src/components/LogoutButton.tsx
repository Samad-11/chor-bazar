'use client'
import { customSuccess } from '@/utils/customToast'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useRef } from 'react'
import toast from 'react-hot-toast'

const LogoutButton = () => {
    const { refresh } = useRouter()
    const toastRef = useRef<string>()
    return (
        <span onClick={async () => {
            toastRef.current = toast.loading("Logging Out")
            await signOut({ redirect: false, callbackUrl: "/" })
            refresh()
            toast.dismiss(toastRef.current)
            customSuccess("Log out successfully")
        }}>Logout</span>
    )
}

export default LogoutButton