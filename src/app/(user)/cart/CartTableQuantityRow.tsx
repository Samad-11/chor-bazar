'use client'

import useCartStore, { CartItem } from '@/store/cartStore'
import React, { useState } from 'react'

const CartTableQuantityRow = ({ item }: { item: CartItem }) => {
    const { increaseQuantity, decreaseQuantity } = useCartStore()
    return (
        <td className='flex justify-between items-center'>
            <button type="button"
                onClick={(e) => {
                    e.stopPropagation()
                    decreaseQuantity(item)
                }}
                className='text-lg font-bold btn btn-neutral rounded-xl btn-sm'
            >-</button>
            {
                item.quantity
            }
            <button type="button"
                onClick={(e) => {
                    e.stopPropagation()
                    increaseQuantity(item)
                }}
                className='text-lg font-bold btn btn-neutral rounded-xl btn-sm'
            >+</button>
        </td>
    )
}

export default CartTableQuantityRow