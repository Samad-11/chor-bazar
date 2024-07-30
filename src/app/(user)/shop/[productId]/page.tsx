import Container from '@/components/container'
import React from 'react'
import ProductDetails from './ProductDetails'
import ExtraInfo from '@/components/Home/ExtraInfo'
import { getAllProducts, getProductById } from '@/actions/productActions'




const page = async ({ params }: { params: { productId: string } }) => {
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


export async function generateStaticParams() {
    const { ok, products } = await getAllProducts()
    if (!ok || !products) return []
    return products.map((product) => ({
        productId: product.id
    }))
}

export default page