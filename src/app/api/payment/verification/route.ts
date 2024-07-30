import { NextRequest, NextResponse } from "next/server";
import crypto from 'crypto'










const generateSignature = (razorpayOrderId: string, razorpayPaymentId: string) => {
    const keySecretId = process.env.RAZORPAY_SECRET_KEY;

    if (!keySecretId) {
        throw new Error("Secret key not defined");
    }

    const sig = crypto
        .createHmac('sha256', keySecretId)
        .update(razorpayOrderId + "|" + razorpayPaymentId)
        .digest("hex")

    return sig
}

export async function POST(req: NextRequest) {
    try {
        const { razorpayOrderId, razorpayPaymentId, razorpaySignature, items, userId, totalPrice } = await req.json();

        const signature = generateSignature(razorpayOrderId, razorpayPaymentId)

        const isVerified = signature === razorpaySignature

        if (isVerified) {
            // const orderItems = await createCompleteOrder(totalPrice, userId, razorpayOrderId, razorpayPaymentId, razorpaySignature, items)
            // if (orderItems?.status) {
            //     return NextResponse.json({ message: "Order item created", ok: true }, { status: 200 })
            // }
            return NextResponse.json({ message: "Payment verified  ", ok: true }, { status: 200 })
        }
        return NextResponse.json({ message: "Payment verification failed", ok: false }, { status: 400 })
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong", ok: false }, { status: 500 })
    }
}