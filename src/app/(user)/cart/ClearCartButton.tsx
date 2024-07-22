'use client'

import useCartStore from "@/store/cartStore"

const ClearCartButton = () => {
    const { clearCart } = useCartStore()
    return (
        <button type='button'
            onClick={clearCart}
            className='btn btn-error text-white btn-outline rounded-2xl'
        >
            Clear
        </button>
    )
}

export default ClearCartButton