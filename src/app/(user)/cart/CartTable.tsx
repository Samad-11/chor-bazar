'use client'
import useCartStore from '@/store/cartStore'
import { stringShortner } from '@/utils/supportFunctions'
import Image from 'next/image'
import React from 'react'
import CartTableQuantityRow from './CartTableQuantityRow'
import { useRouter } from 'next/navigation'
import { MdRemoveShoppingCart } from 'react-icons/md'
import Link from 'next/link'

const CartTable = () => {

    const router = useRouter()
    const { items, totalItems } = useCartStore()

    if (totalItems === 0) {
        return <div>

            <div className='w-full '>
                <span>
                    <MdRemoveShoppingCart
                        size={200}
                        fill='red'
                        className=' mx-auto'
                    />
                    <h2 className='text-lg font-semibold text-center text-rose-600'>Cart is empty</h2>
                    <span className='border w-screen'>

                        <Link href={"/shop"}
                            className='text-center text-blue-700 link link-hover mx-auto'
                        >
                            Continue Shopping
                        </Link>
                    </span>
                </span>
            </div>
        </div>
    }


    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr className='shadow-sm'>
                        <th className='w-10'>S.No.</th>
                        <th className='w-96'>Product</th>
                        <th className='text-center w-20'>Price</th>
                        <th className='text-center w-40'>Quantity</th>
                        <th className='text-center w-36'>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        items.map((item, indx) => (
                            <tr key={indx}
                                className='hover cursor-pointer'
                                onClick={() => {
                                    router.push(`/shop/${item.productId}`)
                                }}
                            >
                                <th>
                                    {indx + 1}
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="">
                                            <div className="relative h-14 w-14 ">
                                                <Image
                                                    fill
                                                    src={`https://abdus-samad-bucket-1.s3.ap-southeast-2.amazonaws.com/${item.imageUrl}`}
                                                    alt={'Cart Item'} />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{stringShortner(item.name)}</div>
                                            <div className="text-sm opacity-50">{item.color}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className='text-center'>
                                    {item.price}
                                </td>
                                <CartTableQuantityRow item={item} />
                                <th className='text-center'>
                                    <span className=" w-36">{item.price * item.quantity}</span>
                                </th>
                            </tr>
                        ))
                    }
                </tbody>
                {/* foot */}
                {/* <tfoot>
                    <tr className=''>
                        <th>S.No.</th>
                        <th>Product</th>
                        <th className='text-center'>Price</th>
                        <th className='text-center'>Quantity</th>
                        <th className='text-center '>Total</th>
                    </tr>
                </tfoot> */}
            </table>
        </div>
    )
}

export default CartTable