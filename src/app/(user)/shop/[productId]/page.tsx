import Container from '@/components/container'
import { products } from '@/utils/dummy/products'
import React from 'react'
import ProductDetails from './ProductDetails'
import ExtraInfo from '@/components/Home/ExtraInfo'
import { getProductById } from '@/actions/productActions'

const ProductPage = async ({ params }: { params: { productId: string } }) => {
    const data = await getProductById(params.productId)
    return (
        <Container>
            {
                data.product &&
                <>
                    <ProductDetails product={data.product} />
                    <div className="divider"></div>
                    <ExtraInfo />
                </>
            }
        </Container>
    )
}

export default ProductPage