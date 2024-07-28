import React from 'react'
import CartTable from './CartTable'
import CartSection from './cartSection'
import useCartStore from '@/store/cartStore'
import { auth } from '@/auth'

const CartPage = async () => {
    const session = await auth()
    return (
        <div
            className='pt-10 px-8 min-h-screen'
        >
            <h1
                className='text-3xl text-center font-semibold'
            >Shopping Cart</h1>

            <CartTable />
            <CartSection session={session} />
        </div>
    )
}

export default CartPage