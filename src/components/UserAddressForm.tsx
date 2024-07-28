'use client'

import { addUpdateUserAddress } from '@/actions/userAction'
import { Address } from '@prisma/client'
import Email from 'next-auth/providers/email'
import { useRouter } from 'next/navigation'
import React, { ButtonHTMLAttributes, ChangeEvent, MouseEvent, SyntheticEvent, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'

const UserAddressForm = ({ userAddress, userId }: { userAddress: Address | null, userId: string }) => {

    const [phone, setPhone] = useState(userAddress?.phone || "")
    const [address1, setAddress1] = useState(userAddress?.address1 || "")
    const [address2, setAddress2] = useState(userAddress?.address2 || "")
    const [city, setCity] = useState(userAddress?.city || "")
    const [state, setState] = useState(userAddress?.state || "")
    const [pin, setPin] = useState(userAddress?.pin || "")
    const router = useRouter()

    const [activeInputs, setActiveInputs] = useState({
        phone: true,
        address1: true,
        address2: true,
        city: true,
        state: true,
        pin: true
    })

    const [formdataState, setFormdataState] = useState<FormData | null>(null)
    const [activeUpdate, setActiveUpdate] = useState(true)

    const toastRef = useRef<string | null>(null)

    const handleEditClick = (inputName: string) => {

        setActiveInputs((prevState) => ({ ...prevState, [inputName]: false }))
        setActiveUpdate(false)
    }

    useEffect(() => {
        const formdata = new FormData
        formdata.append("phone", phone)
        formdata.append("address1", address1)
        formdata.append("address2", address2)
        formdata.append("city", city)
        formdata.append("state", state)
        formdata.append("pin", pin)
        setFormdataState(formdata)
    }, [phone, address1, address2, city, state, pin])


    return (
        <form action={async (e: FormData) => {
            toastRef.current = toast.loading("Updating your address")

            if (!formdataState) {
                return
            }
            const { ok } = await addUpdateUserAddress(formdataState, userId)
            toast.dismiss(toastRef.current)
            if (!ok) {
                toast.error("Failed to update address")
                return
            }
            router.refresh()
            toast.success("Address Updated Successfully")
        }}>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Phone number</span>
                </div>
                <input
                    value={phone}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
                    name='phone' type="text"
                    disabled={activeInputs.phone}

                    placeholder="Type here" className="input
                    input-bordered w-full max-w-xs" />
                {
                    activeInputs.phone &&
                    <div className='label flex justify-end'>
                        <button type='button' className='label-text'
                            onClick={(e) => {
                                e.stopPropagation()
                                handleEditClick('phone')
                            }}
                        >Edit</button>
                    </div>
                }
            </label>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Address 1</span>
                </div>
                <input
                    value={address1}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setAddress1(e.target.value)}
                    disabled={activeInputs.address1}

                    name='address1' type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                {
                    activeInputs.address1 &&
                    <div className='label flex justify-end'>
                        <button type='button' className='label-text'
                            onClick={(e) => {
                                e.stopPropagation()
                                handleEditClick('address1')
                            }}
                        >Edit</button>
                    </div>
                }
            </label>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Address 2</span>
                </div>
                <input
                    value={address2}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setAddress2(e.target.value)}


                    name='address2' type="text"
                    disabled={activeInputs.address2}

                    placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                {
                    activeInputs.address2 &&
                    <div className='label flex justify-end'>
                        <button type='button' className='label-text'
                            onClick={(e) => {
                                e.stopPropagation()
                                handleEditClick('address2')
                            }}
                        >Edit</button>
                    </div>
                }
            </label>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">City</span>
                </div>
                <input

                    value={city}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setCity(e.target.value)}
                    name='city' type="text"
                    disabled={activeInputs.city}

                    placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                {
                    activeInputs.city &&
                    <div className='label flex justify-end'>
                        <button type='button' className='label-text'
                            onClick={(e) => {
                                e.stopPropagation()
                                handleEditClick('city')
                            }}
                        >Edit</button>
                    </div>
                }
            </label>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">State</span>
                </div>
                <input

                    value={state}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setState(e.target.value)}

                    name='state' type="text"
                    disabled={activeInputs.state}

                    placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                {
                    activeInputs.state &&
                    <div className='label flex justify-end'>
                        <button type='button' className='label-text'
                            onClick={(e) => {
                                e.stopPropagation()
                                handleEditClick('state')
                            }}
                        >Edit</button>
                    </div>
                }
            </label>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Pincode</span>
                </div>
                <input

                    value={pin}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPin(e.target.value)}

                    name='pincode' type="text"
                    disabled={activeInputs.pin}

                    placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                {
                    activeInputs.pin &&
                    <div className='label flex justify-end'>
                        <button type='button' className='label-text'
                            onClick={(e) => {
                                e.stopPropagation()
                                handleEditClick('pin')
                            }}
                        >Edit</button>
                    </div>
                }
            </label>
            <button disabled={activeUpdate}

                type="submit" className="mt-5 btn btn-primary w-full max-w-xs">Update</button>
        </form>
    )
}

export default UserAddressForm