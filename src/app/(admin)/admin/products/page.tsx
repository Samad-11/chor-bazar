import React from 'react'
import ProductTable from './components/productTable'
import { getAllProducts, getProductsCount } from '@/actions/productActions'
import Link from 'next/link';

const ProductPage = async () => {
    const res1 = await getAllProducts();
    const res2 = await getProductsCount();

    return (
        <div>
            <div className='flex justify-between items-center '>
                <h3 className='text-xl font-semibold'>Products</h3>
                <Link href='/admin/products/add'
                    className='btn btn-primary rounded-lg'
                >Add</Link>
            </div>
            <ProductTable productCount={res2.productCount} products={res1.products} />
        </div>
    )
}

export default ProductPage