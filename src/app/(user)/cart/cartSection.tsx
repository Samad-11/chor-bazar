'use client'
import useCartStore from '@/store/cartStore'
import ClearCartButton from './ClearCartButton'
import { numberToCurrency } from '@/utils/supportFunctions'
import Link from 'next/link'
import { FaLongArrowAltLeft } from 'react-icons/fa'
import CheckoutButton from './CheckoutButton'
import { Session } from 'next-auth'
import { useEffect, useState } from 'react'
import { getSession } from '@/actions/userAction'

const CartSection = () => {
    const [session, setSession] = useState<Session | null>(null)
    useEffect(() => {
        getSession().then(data => setSession(data))
    }, [])
    const { totalItems, totalPrice } = useCartStore()

    if (totalItems === 0) {
        return <></>
    }

    return (
        <div className='flex justify-between items-center pt-10'>
            <div>
                <ClearCartButton />
            </div>
            <div className='flex flex-col gap-y-3 w-72 border justify-between
            p-4 rounded-2xl shadow-sm
            '>
                <div className='flex justify-between'>
                    <div>
                        <h3 className='text-lg font-semibold'>Subtotal</h3>
                    </div>
                    <div>
                        <span>
                            {numberToCurrency(totalPrice)}
                        </span>
                    </div>
                </div>
                <div className="flex1 text-xs text-gray-400">
                    Taxes and shipping calculate at checkout
                </div>
                <div className="flex-1">
                    <CheckoutButton session={session} />
                </div>
                <div className="flex-1">
                    <Link href={"/shop"} className='flex gap-2 items-center text-sm text-gray-500 link link-hover'>
                        <FaLongArrowAltLeft />
                        <span>Continue shopping</span>
                    </Link>
                </div>
            </div>

        </div>
    )
}

export default CartSection