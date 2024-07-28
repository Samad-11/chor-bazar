import { redirect } from 'next/navigation'
import React from 'react'

const OrderSuccess = ({ searchParams }: { searchParams: { referer: string } }) => {
    if (!searchParams.referer) {
        redirect('/')
    }
    return (
        <div
            className='flex justify-center items-center h-screen w-screen'
        >
            <h1>
                Your order has been placed successfully
            </h1>
            <h2>Your payment id is : {searchParams.referer}</h2>
        </div>
    )
}

export default OrderSuccess