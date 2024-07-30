'use client'

import { Session } from "next-auth"
import { useEffect, useState } from "react"
import NavbarCart from "../NavbarCart"
import Image from "next/image"
import { FaUser } from "react-icons/fa"
import Link from "next/link"
import ProfileButton from "@/components/ProfileButton"
import LogoutButton from "@/components/LogoutButton"
import LoginWithGoogle from "@/components/LoginWithGoogle"
import { Address } from "@prisma/client"
import { getUserIdByEmail } from "@/actions/authActions"
import { getSession, getUserAddress } from "@/actions/userAction"

const NavBarRight = () => {
    const [session, setSession] = useState<Session | null>
        (null)
    const [userId, setUserId] = useState<string | null>(null)
    const [address, setAddress] = useState<Address | null>(null)
    useEffect(() => {
        getSession().then(data => setSession(data))
        if (session?.user.id) {
            getUserIdByEmail(session?.user.id).then(data => {
                data ? setUserId(data.id) : setUserId(null)
            })
            if (userId) {
                getUserAddress(userId).then(data => setAddress(data))
            }

        }

    }, [session?.user.id, userId])

    return (
        <div className="flex-none gap-2">
            <div>
                <h3>
                    Hello, {' '}
                    {
                        session?.user ?
                            session.user.name :
                            'Guest'
                    }
                </h3>
            </div>
            <NavbarCart />
            <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    {
                        session?.user.image ?
                            <div className="w-10 rounded-full relative">
                                <Image
                                    fill
                                    className='object-cover'
                                    alt={"user Image"}
                                    src={session?.user.image} />
                            </div>
                            :
                            <FaUser className='text-2xl' />
                    }
                </div>
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                    {
                        session?.user ?
                            <>
                                <li><Link href={'/order'}>Orders</Link></li>
                                <li><ProfileButton userId={userId} session={session} address={address} /></li>
                                <div className="divider"></div>
                                <li><LogoutButton /></li>
                            </> : <>
                                <li><Link href={"/api/auth/signin"}>Login</Link></li>
                                <li><Link href={"/register"}>Register</Link></li>
                                {/* <li><LoginWithGoogle /></li> */}
                            </>
                    }
                </ul>
            </div>
        </div>
    )
}

export default NavBarRight