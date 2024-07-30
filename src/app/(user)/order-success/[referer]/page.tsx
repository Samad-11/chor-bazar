import Container from '@/components/container'
import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import React from 'react'

const OrderSuccess = async ({ params }: { params: { referer: string } }) => {

    const payment = await prisma.payment.findUnique({
        where: {
            razorpayPaymentId: params.referer
        },
        select: {
            createdAt: true, razorpayPaymentId: true
        }
    })

    if (!payment) {
        notFound()
    }
    return (
        <div
            className='flex flex-col justify-center items-center h-screen w-screen'
        >
            <h1>
                Your order has been placed successfully
            </h1>
            <h2>Your payment id is : {params.referer}</h2>
            <h3>Date and time: {payment?.createdAt.toString()}</h3>
        </div>
    )
}

export async function generateStaticParams() {
    const payments = await prisma.payment.findMany()

    return payments.map((payment) => ({
        referer: payment.razorpayPaymentId
    }))
}



export default OrderSuccess