'use client'
import { Category } from '@prisma/client'
import React, { useEffect, useRef, useState } from 'react'
import ColorOptions from './ColorOption'
import { testFormdata } from '@/actions/productActions'
import toast from 'react-hot-toast'
import SubmitButton from '@/components/SubmitButton'
import { useRouter } from 'next/navigation'

const AddProduct = ({ categories }: { categories: Category[] }) => {
    const [noOfColorFields, setNoOfColorFields] = useState(1)
    const formRef = useRef<HTMLFormElement>(null)
    useEffect(() => {
    }, [noOfColorFields])


    return (
        <div>
            <form
                ref={formRef}
                action={async (e: FormData) => {
                    const res = await toast.promise(testFormdata(e), {
                        error: "Something went Wrong",
                        loading: "Adding Product in progress",
                        success: "Product Added Successfully"
                    })
                    if (res.ok) {
                        formRef.current?.reset()

                    }
                }} className='flex space-y-4 gap-x-3 items-center flex-wrap'>
                <label className="form-control w-full max-w-xs ">
                    <div className="label">
                        <span className="label-text">Product Name</span>
                    </div>
                    <input
                        name='name'
                        type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs rounded-2xl" />
                </label>
                <label className="form-control w-full max-w-xs ">
                    <div className="label">
                        <span className="label-text">Product Price</span>
                    </div>
                    <input
                        name='price'
                        type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs rounded-2xl" />
                </label>

                <label className="form-control w-full max-w-xs ">
                    <div className="label">
                        <span className="label-text">Product Brand</span>
                    </div>
                    <input
                        name='brand'
                        type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs rounded-2xl" />
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Product Category</span>
                    </div>
                    <select
                        name='categoryId'
                        defaultValue={""} className="select select-bordered rounded-2xl">
                        <option disabled value={""} className=''>Pick one</option>
                        {
                            categories.map((category, i) => (
                                <option key={i} value={category.id}>{category.name}</option>
                            ))
                        }
                    </select>
                </label>
                <label className="form-control w-full ">
                    <div className="label">
                        <span className="label-text">Product Description</span>
                    </div>
                    <textarea
                        name='description'
                        placeholder="Type here" rows={10} className="textarea flex-grow textarea-bordered w-full rounded-2xl" />
                </label>
                {
                    Array.from({ length: noOfColorFields }).map((_, indx) => (
                        <ColorOptions setNoOfColorFields={setNoOfColorFields} key={indx} sno={indx + 1} />
                    ))
                }
                <input type="hidden" name="noOfColorFields" value={noOfColorFields} />
                <div
                    className=' w-full flex justify-end pt-3'
                >
                    <button type="button"
                        onClick={() => setNoOfColorFields(prev => prev + 1)}
                        className='btn btn-outline btn-primary rounded-2xl font-bold text-lg border-2'
                    >+</button>
                </div>
                <div className='w-full'>
                    <SubmitButton />
                </div>
            </form>
        </div>
    )
}

export default AddProduct