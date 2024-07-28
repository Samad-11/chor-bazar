"use server"

import prisma from "@/lib/prisma"
import { CartItem } from "@/store/cartStore"

export async function createPayment(razorpayOrderId: string, razorpayPaymentId: string, razorpaySignature: string, orderId: string) {
    try {
        const payment = await prisma.payment.create({
            data: {
                razorpayOrderId,
                razorpayPaymentId,
                razorpaySignature,
                orderId
            }
        })
        if (payment) {
            return payment.id
        }
    } catch (error) {

    }
}

export async function createOrder(total: number, userId: string) {

    try {
        const newOrder = await prisma.order.create({
            data: {
                total,
                userId
            }
        })
        if (newOrder) {
            return newOrder.id
        }
        console.log("new order not created")
    } catch (error) {
        console.log("error in create Order", error);

    }
}

export async function createOrderItems(items: CartItem[], orderId: string) {
    const data = items.map((i, indx) => {
        return {
            price: i.price,
            productColor: i.color,
            quantity: i.quantity,
            orderId,
            productId: i.productId
        }
    })
    try {
        const items = await prisma.orderItem.createMany({
            data
        })
        if (items) {
            return true
        }
    } catch (error) {

    }
}


export async function createCompleteOrder(total: number, userId: string, razorpayOrderId: string, razorpayPaymentId: string, razorpaySignature: string, items: CartItem[]) {
    try {
        const orderId = await createOrder(total, userId)
        if (!orderId) return null
        const paymentId = await createPayment(razorpayOrderId, razorpayPaymentId, razorpaySignature, orderId)
        if (!paymentId) return null
        const orderItems = await createOrderItems(items, orderId)
        if (!orderItems) return null
        console.log('====================================');
        console.log("Order created successfully");
        console.log('====================================');
        return {
            status: true
        }
    } catch (error) {
        console.error("Something went wrong in create complete order", error)
        return {
            status: false
        }
    }
}