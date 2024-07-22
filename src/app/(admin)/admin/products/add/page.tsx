import React from 'react'
import AddProduct from './AddProduct'
import { getAllCategories } from '@/actions/productActions'

const ProductAddPage = async () => {
    const data = await getAllCategories();

    return (
        <div>
            {
                data.categories &&
                <AddProduct categories={data.categories} />
            }
        </div>
    )
}

export default ProductAddPage