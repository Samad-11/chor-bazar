import { numberToCurrency } from '@/utils/supportFunctions'
import { Category, Product, Review } from '@prisma/client'
import Image from 'next/image'
import React from 'react'
import ProductTableRow from './ProductTableRow'
import { ProductWithCategory } from '@/types/types'


const ProductTable = ({ products, productCount }: { products: ProductWithCategory[] | null, productCount: number }) => {
    if (productCount === 0 || products === null) {
        return <div>
            No Data
        </div>
    }
    console.log(products);

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                S.No.
                            </th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row */}
                        {
                            products.map((product, i) => (
                                <ProductTableRow key={product.id + i} product={product} sno={i + 1} />
                            ))
                        }


                    </tbody>
                    {/* foot */}
                    <tfoot>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                            <th></th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    )
}

export default ProductTable