'use client'

import { getUserIdByEmail } from "@/actions/authActions"
import { createCompleteOrder, createOrder } from "@/actions/orderAction"
import { getUserAddress } from "@/actions/userAction"
import useCartStore from "@/store/cartStore"
import { Session } from "next-auth"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"
import toast from "react-hot-toast"
import useRazorpay from "react-razorpay"

const CheckoutButton = ({ session }: { session: Session | null }) => {
    const { totalPrice, items, clearCart } = useCartStore()
    const [loading, setLoading] = useState(false)
    const { push } = useRouter()
    const [Razorpay] = useRazorpay()

    const getOrderId = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount: `${totalPrice}` })
            })

            if (!res.ok) {
                throw new Error("Failed to create order")
            }

            const data = await res.json()
            return data.orderId
        } catch (error) {

            toast.error("Failed to create order")
            console.error(error)

            return null
        }
    }

    const checkoutHandler = async () => {
        setLoading(true)
        try {
            if (!session?.user) {
                toast.error('You must be logged in to checkout.')
                push("/login")
                return
            }
            const orderId: string = await getOrderId()
            if (!orderId) {
                return
            }
            const userIdData = await getUserIdByEmail(session.user.email!)
            if (!userIdData) return null

            const address = await getUserAddress(userIdData.id)
            if (!address) {
                toast.error("You don't have any address")
                const e = document.getElementById('profile_modal') as HTMLDialogElement
                e.showModal()
                return
            }


            const razorpay = new Razorpay({
                amount: `${totalPrice * 100}`,
                currency: "INR",
                key: process.env.RAZORPAY_SECRET_KEY!,
                name: "Chor Bazar",
                order_id: orderId,
                description: "Chor Bazar Checkout",
                prefill: {
                    name: session.user.name ? session.user.name : undefined,
                    email: session.user.email ? session.user.email : undefined,
                    contact: "8010512106",
                    method: "upi"
                },
                theme: {
                    color: "#121212",
                    backdrop_color: "#ffffff"
                },
                redirect: true,
                handler: async (response: any) => {
                    try {

                        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/verification`, {
                            method: "POST",
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                razorpayPaymentId: response.razorpay_payment_id,
                                razorpayOrderId: response.razorpay_order_id,
                                razorpaySignature: response.razorpay_signature,
                            })
                        })

                        const data = await res.json();

                        if (data.ok) {
                            const res = await createCompleteOrder(totalPrice, userIdData.id, response.razorpay_order_id, response.razorpay_payment_id, response.razorpay_signature, items)
                            console.log("order-id", orderId);

                            if (res?.status) {
                                push(`/order-success/${response.razorpay_payment_id}`)
                                toast.success("Payment successful")
                                clearCart()
                            }
                        } else {
                            toast.error("Payment failed")
                            console.error(data.message)
                        }

                    } catch (error) {
                        toast.error("Failed to verify payment")
                        console.error(error)
                    }
                }
            })

            razorpay.on("payment.failed", (res: any) => {
                toast.error("Payment failed")
                console.error(res)
            })
            razorpay.open()
        } catch (error) {
            console.log('====================================');
            console.log(error);
            console.log('====================================');
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <button
            onClick={checkoutHandler}
            disabled={loading}
            className='btn btn-primary btn-block rounded-2xl'
            type="button">{
                loading ? <span className="loading loading-spinner"></span> :
                    "Checkout"
            }</button>
    )
}

export default CheckoutButton