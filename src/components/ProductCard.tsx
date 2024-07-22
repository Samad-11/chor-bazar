'use client'
import { numberToCurrency, stringShortner } from '@/utils/supportFunctions'
import React, { Dispatch, SetStateAction, SyntheticEvent, useState } from 'react'
import Rating from './Rating'
import Image from 'next/image'
import crypto from 'crypto'
import { ProductWithCategory } from '@/types/types'
import { useRouter } from 'next/navigation'
import { Color } from '@prisma/client'
import useCartStore from '@/store/cartStore'

const ProductCard = ({ product }: { product: ProductWithCategory }) => {
    const router = useRouter()
    const [selectedColor, setSelectedColor] = useState(0)
    const { addItem } = useCartStore()
    const handleAddToCartClick = (e: SyntheticEvent) => {
        e.stopPropagation();
        const id = crypto.randomBytes(20).toString('hex');
        const productId = product.id
        const name = product.name
        const price = product.price
        const color = product.colors[selectedColor].color
        const imageUrl = product.colors[selectedColor].images[0]
        const quantity = 1

        addItem({ color, id, imageUrl, name, price, productId, quantity })
    }
    return (
        <div className="card 
        w-60
        shadow-xl pt-2
        bg-base-100
        border
        rounded-lg
        cursor-pointer
        group
        hover:shadow-sm
        transition-shadow
        "
            onClick={() => {
                router.push(`/shop/${product.id}`)
            }}
        >
            <figure className="aspect-video h-52 relative shadow-sm group-hover:scale-105 transition">
                <Image
                    fill
                    className="object-contain
                    mix-blend-multiply
                    "
                    src={`https://abdus-samad-bucket-1.s3.ap-southeast-2.amazonaws.com/${product.colors[selectedColor].images[0]}`}
                    alt={product.name} />
            </figure>
            <div className="card-body
            flex-1
            pb-0 px-2
            h-full
            
            ">
                <h3 className="card-title capitalize
                font-semibold
                text-sm
                mb-2
                
                ">
                    {stringShortner(product.name)}
                </h3>
                <div className="flex flex-col">
                    <Rating
                        reviews={product.reviews}
                        name={product.name + " (" + product.colors[0].color + ")"}
                    />
                    <span className="text-xs py-2">{
                        product?.reviews?.length === 0 ? "0" : product?.reviews?.length
                    } Reviews</span>
                </div>
                <Colors
                    setSelectedColor={setSelectedColor}
                    selectedColor={selectedColor}

                    colors={product.colors} />
                <div className="card-actions items-end gap-y-8 h-full mb-2">
                    <div className="flex gap-1 flex-wrap ">
                        <div className="badge badge-sm badge-secondary">NEW</div>
                        <div className="badge badge-sm badge-outline">{product.category.name}</div>
                        <div className="badge badge-sm badge-outline">{product.brand.toUpperCase()}</div>
                    </div>
                    <div className="grid grid-cols-2 w-full ">
                        <div
                            className=""
                        >
                            <button
                                type="button"
                                className="btn btn-primary rounded-lg 
                            btn-outline
                            btn-sm
                            p-1
                            "
                                onClick={handleAddToCartClick}
                            >Add to Cart</button>
                        </div>
                        <div className="text-sm font-semibold flex justify-center items-center">
                            <span>
                                {
                                    numberToCurrency(product.price)
                                }
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Colors = ({ colors, selectedColor, setSelectedColor }: {
    colors: Color[],
    setSelectedColor: Dispatch<SetStateAction<number>>,
    selectedColor: number
}) => {
    return (
        <div className="flex gap-1 flex-wrap justify-start items-start">
            {
                // (product.colors.length > 1) &&
                colors.map((color, i) => (

                    <button key={color.color}
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedColor(i)
                        }}
                        className={`size-4 rounded-full border-[3px] p-[.00rem] 
                            ${selectedColor === i ? "border-blue-500" : ""}
                            `}
                        style={{ backgroundColor: color.colorCode }}
                    />
                ))
            }
        </div>
    )
}

export default ProductCard