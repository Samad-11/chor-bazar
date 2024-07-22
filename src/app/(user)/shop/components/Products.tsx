import { getAllProduct2 } from '@/actions/productActions'
import ProductCard from '@/components/ProductCard'
import React from 'react'

const Products = async ({ query, page, category }: { query: string, page: number, category: string }) => {
    const data = await getAllProduct2(query, category)
    if (data === undefined) {
        return null
    }
    const products = data.products
    if (!products) {
        return null
    }
    return (
        <div>
            <div className="
        flex
        lg:justify-between
        justify-center
        flex-wrap
        gap-8
        ">

                {
                    products.map((product, indx) => {
                        return (
                            <ProductCard product={product} key={indx} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Products