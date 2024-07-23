'use client'
import React, { ChangeEvent, SyntheticEvent } from 'react'
import { category } from '../layout/Navbar'
import Rating from '../Rating'
import { Category } from '@prisma/client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const ratingFilterValueArray = [
    { name: <Rating key={1} directRating={1} /> },
    { name: <Rating key={2} directRating={2} /> },
    { name: <Rating key={3} directRating={3} /> },
    { name: <Rating key={4} directRating={4} /> },
]


const sortByValueArray = [
    { name: "Price Low to High" },
    { name: "Price High to Low" },
    { name: "Price Newest" },
    { name: "Price Most Relevance" },
]

const Filter = ({ categories }: { categories: Category[] | null }) => {
    return (
        <div className='mt-5 flex justify-between pb-10'>
            <div>
                {
                    categories &&
                    <CategoryDropDown name='Category' valueArray={categories} />
                }
                {/* <RatingDropDown name='Rating' valueArray={ratingFilterValueArray} /> */}
            </div>
            <div>

                <SortingDropDown name='Sort' position='dropdown-left dropdown-bottom' valueArray={sortByValueArray} />
            </div>
        </div>
    )
}

const CategoryDropDown = ({ name, valueArray, position }: { name: string, valueArray: any[], position?: string }) => {

    const pathname = usePathname()
    const { replace } = useRouter()
    const searchParams = useSearchParams()

    const handleClick = (e: ChangeEvent<HTMLInputElement>) => {
        const { name } = e.target
        const category = name || "";
        const params = new URLSearchParams(searchParams)
        if (category.length > 0) {
            params.set('category', category)
        } else {
            params.delete('category')
        }
        replace(`${pathname}?${params.toString()}`)
    }
    return (
        <div className={`dropdown ${position && position}`}>
            <div tabIndex={0} role="button" className="
            border-4 p-2 shadow-sm
            border-primary
            font-semibold
            ">{name}</div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                <li >
                    <div className="form-control ">
                        <label className="label cursor-pointer p-0 gap-5">
                            <input
                                checked={!searchParams.has("category")}
                                onChange={handleClick}
                                name=''
                                type="checkbox" className="checkbox justify-self-start checkbox-primary" />
                            <span className="label-text">All</span>
                        </label>
                    </div>
                </li>
                {
                    valueArray.map((value, indx) => (
                        <li key={indx}>
                            <div className="form-control ">
                                <label className="label cursor-pointer p-0 gap-5">
                                    <input
                                        checked={searchParams.get('category') === value.name}
                                        onChange={handleClick}
                                        name={value.name}
                                        type="checkbox" className="checkbox justify-self-start checkbox-primary" />
                                    <span className="label-text">{value.name}</span>
                                </label>
                            </div>
                        </li>
                    ))
                }


            </ul>
        </div>
    )
}
const RatingDropDown = ({ name, valueArray, position }: { name: string, valueArray: any[], position?: string }) => {
    return (
        <div className={`dropdown ${position && position}`}>
            <div tabIndex={0} role="button" className="
            border-4 p-2 shadow-sm
            border-primary
            font-semibold
            ">{name}</div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">

                {
                    name !== 'Sort' &&
                    <li >
                        <div className="form-control ">
                            <label className="label cursor-pointer p-0 gap-5">
                                <input
                                    type="checkbox" className="checkbox justify-self-start checkbox-primary" />
                                <span className="label-text">All</span>
                            </label>
                        </div>
                    </li>
                }
                {
                    valueArray.map((value, indx) => (
                        <li key={indx}>
                            <div className="form-control ">
                                <label className="label cursor-pointer p-0 gap-5">
                                    <input type="checkbox" className="checkbox justify-self-start checkbox-primary" />
                                    <span className="label-text">{value.name}</span>
                                </label>
                            </div>
                        </li>
                    ))
                }


            </ul>
        </div>
    )
}
const SortingDropDown = ({ name, valueArray, position }: { name: string, valueArray: any[], position?: string }) => {
    return (
        <div className={`dropdown ${position && position}`}>
            <div tabIndex={0} role="button" className="
            border-4 p-2 shadow-sm
            border-primary
            font-semibold
            ">{name}</div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">

                {
                    name !== 'Sort' &&
                    <li >
                        <div className="form-control ">
                            <label className="label cursor-pointer p-0 gap-5">
                                <input
                                    type="checkbox" className="checkbox justify-self-start checkbox-primary" />
                                <span className="label-text">All</span>
                            </label>
                        </div>
                    </li>
                }
                {
                    valueArray.map((value, indx) => (
                        <li key={indx}>
                            <div className="form-control ">
                                <label className="label cursor-pointer p-0 gap-5">
                                    <input type="checkbox" className="checkbox justify-self-start checkbox-primary" />
                                    <span className="label-text">{value.name}</span>
                                </label>
                            </div>
                        </li>
                    ))
                }


            </ul>
        </div>
    )
}
export default Filter