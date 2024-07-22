import { Category } from '@prisma/client'
import React from 'react'

const CategoryTable = ({ categories }: { categories: Category[] }) => {
    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>Name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {/* row */}
                    {
                        categories.map((category, indx) => (
                            <tr key={indx}
                                className="hover"
                            >
                                <th>{indx + 1}</th>
                                <td
                                    className='text-lg'
                                >{category.name}</td>
                                <td>
                                    <button className='btn rounded-2xl'>...</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default CategoryTable