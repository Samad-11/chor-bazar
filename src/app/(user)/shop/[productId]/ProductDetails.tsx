'use client'
import Rating from '@/components/Rating'
import { Color, ProductWithCategory } from '@/types/types'
import { calculateAverageRating, numberToCurrency } from '@/utils/supportFunctions'
import Image from 'next/image'
import crypto from 'crypto'
import React, { Dispatch, useEffect, useState } from 'react'
import useCartStore from '@/store/cartStore'
import { Category, Product, Review } from '@prisma/client'


const ProductDetails = ({ product }: { product: ProductWithCategory }) => {

    const { items, addItem } = useCartStore()
    const rating = calculateAverageRating(product.reviews)
    const [selectedColor, setSelectedColor] = useState(0)
    const [quantity, setQuantity] = useState(1)

    const handleAddToCartClick = () => {
        const id = crypto.randomBytes(20).toString('hex');
        const productId = product.id
        const name = product.name
        const price = product.price
        const color = product.colors[selectedColor].color
        const imageUrl = product.colors[selectedColor].images[0]
        addItem({ color, id, imageUrl, name, price, productId, quantity })

    }


    useEffect(() => {
    }, [items])

    return (
        <div
            className='grid 
        grid-cols-1 md:grid-cols-2
        gap-6
        pt-10
        '
        >
            <ImageSection selectedColor={product.colors[selectedColor]} />
            <div className=''>
                <div>
                    <h1 className='text-xl capitalize font-bold '>{product.name}</h1>
                    <div className="divider" />
                    <h2 className=''>
                        <span className='text-lg '>
                            Price:
                        </span>
                        <span className='font-semibold text-lg'>
                            {" " + numberToCurrency(product.price)}
                        </span>
                    </h2>
                    <div className="divider"></div>
                    <div className='flex flex-col gap-1 w-fit items-center'>
                        <Rating directRating={rating} />
                        <span className='font-medium underline text-base'>{product?.reviews?.length} Rating</span>
                    </div>

                    {
                        product.colors.length > 1 && <>
                            <div className="divider" />
                            <SetColor setSelectedColor={setSelectedColor} selectedColor={selectedColor} colors={product.colors} />
                        </>
                    }
                    <div className="divider"></div>
                    <SetQuantity quantity={quantity} setQuantity={setQuantity} />
                    <div className="divider"></div>
                    <button
                        onClick={handleAddToCartClick}
                        className='btn-block btn
                        rounded-md
                        btn-primary
                        font-semibold
                        text-lg
                        '
                    >Add to cart</button>
                    <div className="divider" />
                    <h3 className=''>
                        <span className='text-lg '>
                            Category:
                        </span>
                        <span className='font-semibold text-base'>
                            {" " + product.category.name}
                        </span>
                    </h3>
                    <h3 className=''>
                        <span className='text-lg '>
                            Brand:
                        </span>
                        <span className='font-semibold text-base'>
                            {" " + product.brand}
                        </span>
                    </h3>
                    <div className="divider"></div>
                    <p>
                        {product.description}
                    </p>
                </div>
            </div>
        </div >
    )
}

type SetColorProps = {
    colors: Color[],
    selectedColor: number,
    setSelectedColor: (val: number) => void
}
const SetColor = ({ colors, selectedColor, setSelectedColor }: SetColorProps) => {

    return (
        <div className='flex gap-2'>
            {
                colors.map((c, i) => (
                    <div className={`size-6 border-[3px] rounded-full
                        cursor-pointer
                        ${selectedColor === i && "border-secondary"}
                        `} key={i}
                        style={{
                            backgroundColor: c.colorCode
                        }}
                        onClick={() => {
                            setSelectedColor(i)
                        }}
                    ></div>
                ))
            }
        </div>
    )
}

const ImageSection = ({ selectedColor }: { selectedColor: Color }) => {
    const images = selectedColor.images
    const [image, setImage] = useState(0)

    return (
        <div className='flex col-span-1  h-[70dvh]'>
            {
                images.length > 1 &&
                <>

                    <div
                        className='w-20
                    pt-5
                    flex 
                    flex-col
                    gap-3
                    items-center
                    justify-center
                    '
                    >
                        {
                            images.map((img, indx) => (
                                <div
                                    key={indx}
                                    className={`size-14 relative
                                    group
                                    cursor-pointer
                                    `}
                                    onClick={() => {
                                        setImage(indx)
                                    }}
                                >
                                    <Image
                                        fill
                                        className={`object-contain
                                        border-2
                                        p-1
                                        rounded-sm
                                        group-hover:border-black
                                        transition-all
                                        ${image === indx && "border-black"}
                                        `}
                                        src={`https://abdus-samad-bucket-1.s3.ap-southeast-2.amazonaws.com/${images[indx]}`}
                                        alt='More Products Images'

                                    />
                                </div>
                            ))
                        }
                    </div>
                    <div className="divider divider-horizontal"></div>
                </>
            }
            <div className='flex-1 relative'>
                <Image
                    fill
                    className='object-contain'
                    src={`https://abdus-samad-bucket-1.s3.ap-southeast-2.amazonaws.com/${images[image]}`}
                    alt='Product Image' />
            </div>
        </div>
    )
}


type SetQuantityProps = {
    quantity: number,
    setQuantity: React.Dispatch<React.SetStateAction<number>>
}
const SetQuantity = ({ quantity, setQuantity }: SetQuantityProps) => {

    return (
        <div className="flex justify-between items-center gap-6 border w-32">
            <button
                onClick={() => {
                    setQuantity((prev: number) => {
                        if (prev === 1) {
                            return prev
                        }
                        return prev - 1
                    })
                }}
                className='size-8 bg-slate-500 text-lg text-white rounded-md'>
                -
            </button>
            <span className='text-lg font-semibold'>
                {quantity}
            </span>
            <button
                onClick={() => {
                    setQuantity((prev: number) => prev + 1)
                }}
                className='size-8 bg-slate-500 text-lg text-white rounded-md'>
                +
            </button>
        </div>
    )
}
export default ProductDetails