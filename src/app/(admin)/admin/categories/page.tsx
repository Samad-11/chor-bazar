import { getAllCategories } from '@/actions/productActions'
import Link from 'next/link';
import React from 'react'
import CategoryTable from './CategoryTable';

const CategoryPage = async () => {
    const data = await getAllCategories();

    return (
        <div>
            <div className='flex justify-between items-center '>
                <h3 className='text-xl font-semibold'>Categories</h3>
                <Link href='/admin/categories/add'
                    className='btn btn-primary rounded-lg'
                >Add</Link>
            </div>
            {
                data.categories &&
                <CategoryTable categories={data.categories} />
            }
        </div>
    )
}

export default CategoryPage