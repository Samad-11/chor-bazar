'use client'

import { Session } from "next-auth"
import Image from "next/image"
import { Suspense, useRef } from "react"
import { GoPerson } from "react-icons/go"
import UserAddress from "./UserAddress"
import { Address } from "@prisma/client"

const ProfileButton = ({ session, address, userId }: { session: Session, address: Address | null, userId: string | null | undefined }) => {
    const formRef = useRef<HTMLDialogElement>(null)
    const handleModal = () => {
        formRef?.current?.showModal()
        console.log("modal click");

    }
    return (
        <div className="" onClick={handleModal}>
            <span>Profile</span>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <dialog ref={formRef} id="profile_modal" className="modal modal-bottom sm:modal-middle" style={{ zIndex: -50 }}>
                <div className="modal-box w-full h-full">
                    <div className="grid-cols-2 grid w-full gap-y-10 gap-x-3">
                        <div>
                            <h3 className="font-bold text-lg">{session.user.name}</h3>
                            <div>
                                <p>{session.user.email}</p>
                            </div>
                        </div>
                        <div className="grid content-center justify-center">
                            <div className="size-40 border-2 border-black rounded-full relative
                            flex items-center justify-center
                            ">
                                {
                                    session.user.image
                                        ? <Image
                                            fill
                                            className="object-cover rounded-full"
                                            src={session?.user?.image} alt="User Image" /> :
                                        <GoPerson className="text-5xl fill-current text-black" />
                                }
                            </div>
                        </div>
                        <div className="col-span-2">
                            {
                                session.user.email && userId &&
                                <Suspense>
                                    <UserAddress address={address} userId={userId} />
                                </Suspense>
                            }
                        </div>
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default ProfileButton