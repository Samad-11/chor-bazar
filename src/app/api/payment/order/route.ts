import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_SECRET_KEY!,
})

export async function POST(req: NextRequest) {
    try {
        const { amount } = await req.json() as { amount: string }
        const order = await razorpay.orders.create({
            amount: parseFloat(amount) * 100, // Amount in paisa
            currency: "INR",
        })
        return NextResponse.json({
            orderId: order.id, ok: true
        }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: error, ok: false }, { status: 500 })
    }
}

export async function GET() {
    try {

        return NextResponse.json({ message: "TEST DONE" })
    } catch (error) {
        return NextResponse.json({ message: "TEST FAILED" })
    }
}