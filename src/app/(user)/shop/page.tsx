import Container from '@/components/container'
import Filter from '@/components/shop/Filter'
import React, { Suspense } from 'react'
import { getAllCategories } from '@/actions/productActions'
import Products from './components/Products'

const ShopPage = async ({ searchParams }: {
    searchParams?: {
        query?: string,
        page?: string,
        category?: string
    }
}) => {
    const data = await getAllCategories()
    const categories = data.categories
    const query = searchParams?.query || "";
    const page = Number(searchParams?.page) || 1
    const category = searchParams?.category || ""


    return (
        <div
            className='min-h-screen'
        >
            <Container>
                <Filter categories={categories} />
                <Products category={category} page={page} query={query} />
            </Container>

        </div >
    )
}

export default ShopPage