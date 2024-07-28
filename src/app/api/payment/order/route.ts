import razorpay from "@/lib/razorpay";
import { NextRequest, NextResponse } from "next/server";

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