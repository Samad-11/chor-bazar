import React from 'react'
import CartTable from './CartTable'
import CartSection from './cartSection'
import useCartStore from '@/store/cartStore'

const CartPage = () => {
    return (
        <div
            className='pt-10 px-8 min-h-screen'
        >
            <h1
                className='text-3xl text-center font-semibold'
            >Shopping Cart</h1>

            <CartTable />
            <CartSection />
        </div>
    )
}

export default CartPage