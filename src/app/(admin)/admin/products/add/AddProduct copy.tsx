/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { addProduct } from "@/actions/productActions"
import SubmitButton from "@/components/SubmitButton"
import { preColorArray } from "@/utils/preColors"
import { Category } from "@prisma/client"
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react"
import { useFormState } from "react-dom"
import toast from "react-hot-toast"

type ValueType = {
    name: string,
    price: string,
    description: string,
    brand: string,
    category: string,
    colors: ColorValue[]
}

type ColorValue = {
    name: string,
    code: string,
    images: FileList | string
}

const AddProduct = ({ categories }: { categories: Category[] }) => {
    const [colorValue, setColorValue] = useState<ColorValue[]>([])
    const initialValues: ValueType = {
        name: "",
        brand: "",
        category: "",
        description: "",
        price: "",
        colors: colorValue
    }
    const [values, setValues] = useState<ValueType>(initialValues)
    const [color, setColor] = useState(1)
    const [colorArray, setColorArray] = useState([0])
    const formData = new FormData()
    const [formDataState, setFormDataState] = useState<FormData | null>(null)
    const formRef = useRef<HTMLFormElement>(null)
    useEffect(() => {
        let temp: number[] = []
        for (let i = 0; i < color; i++) {
            temp.push(i)
        }
        setColorArray(temp)

        formData.append("name", values.name)
        formData.append("price", values.price)
        formData.append("description", values.description)
        formData.append("brand", values.brand)
        formData.append("category", values.category)

        if (formData.has("colorSize")) {
            formData.delete("colorSize")
            formData.append('colorSize', `${values.colors.length}`)
        } else { formData.append('colorSize', `${values.colors.length}`) }
        for (let i = 0; i < values.colors.length; i++) {
            if (formData.has(`${i}-color-name`)) {
                formData.delete(`${i}-color-name`)
                formData.append(`${i}-color-name`, values.colors[i].name)
            } else {
                formData.append(`${i}-color-name`, values.colors[i].name)
            }

            if (formData.has(`${i}-color-code`)) {
                formData.delete(`${i}-color-code`)
                formData.append(`${i}-color-code`, values.colors[i].code)
            } else {
                formData.append(`${i}-color-code`, values.colors[i].code)
            }

            if (formData.has(`${i}-color-image-size`)) {
                formData.delete(`${i}-color-image-size`)
                formData.append(`${i}-color-image-size`, `${values.colors[i].images.length}`)
            } else {
                formData.append(`${i}-color-image-size`, `${values.colors[i].images.length}`)
            }
            if (values.colors[i].images?.length > 0) {
                for (let j = 0; j < values.colors[i]?.images?.length; j++) {
                    if (formData.has(`${i}-color-image-${j}`)) {
                        formData.delete(`${i}-color-image-${j}`)
                        formData.append(`${i}-color-image-${j}`, values.colors[i].images[j])
                    } else {
                        formData.append(`${i}-color-image-${j}`, values.colors[i].images[j])
                    }
                }
            }
        }
        setFormDataState(formData)

    }, [color, values, colorValue])

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        if (e.target.name.startsWith('color')) {
            const { name, value } = e.target
            const indx = name.slice(name.length - 1, name.length) as unknown as number
            const [colorName, colorCode] = value.split(',')

            if (indx > colorValue.length - 1) {
                colorValue.push({ code: "", name: "", images: "" })
            }
            const colors = values.colors
            colors[indx].code = colorCode
            colors[indx].name = colorName
            setColorValue(colors)
            setValues(prev => ({ ...prev, colors }))
            return
        }
        const { name, value } = e.target
        setValues((prev) => ({ ...prev, [name]: value }))
    }


    const myPromise = new Promise((resolve) => {
        if (formDataState) {
            addProduct(formDataState)
                .then(response => response)
                .then(response => resolve(response))

        }
    })

    return (
        <div className='flex justify-center items-center'>
            <form
                ref={formRef}
                onSubmit={async (e: FormEvent) => {
                    e.preventDefault();
                    if (formDataState) {

                        toast.promise(myPromise, {
                            error: "Something went wrong",
                            loading: "Adding Product",
                            success: "Product Added Successfully"
                        })


                        // await addProduct(formDataState)
                        // formRef.current?.reset();
                        // setValues(initialValues)
                    }
                }}>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Product Name</span>
                    </div>
                    <input required
                        onChange={handleChange}
                        value={values.name}
                        name='name' type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Product Price</span>
                    </div>
                    <input required
                        onChange={handleChange}

                        value={values.price}
                        name='price' min={0} type="number" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Product Description</span>
                    </div>
                    <textarea required
                        onChange={handleChange}

                        value={values.description}
                        name='description' rows={5} placeholder="Type here" className="textarea textarea-bordered w-full max-w-xs" />
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Product Brand</span>
                    </div>
                    <input required
                        onChange={handleChange}

                        value={values.brand}
                        name='brand' type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Product category</span>
                    </div>
                    <select
                        onChange={handleChange}
                        defaultValue={''}
                        name="category"
                        className="select select-bordered">
                        <option value={''} disabled>Pick one</option>
                        {
                            categories.map((category) => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))
                        }
                    </select>

                </label>

                {
                    colorArray.map((c, i) => (
                        <div key={i}>
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Product Color</span>
                                </div>
                                <select required
                                    name={`color-${i}`}
                                    onChange={handleChange}
                                    defaultValue={""} className="select select-bordered">
                                    <option disabled value={''}>Pick one</option>
                                    {
                                        preColorArray.map((c) => (
                                            <option key={c.colorCode + i + c.colorName} value={[c.colorCode, c.colorName]}>{c.colorName}</option>

                                        ))
                                    }
                                </select>
                            </label>
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Product Images</span>
                                </div>
                                <input required
                                    name={`colorImage-${i}`}

                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        const files = e.target.files
                                        if (files instanceof FileList) {

                                            if (i > colorValue.length - 1) {
                                                colorValue.push()
                                            }
                                            const colors = colorValue
                                            colors[i].images = files
                                            setColorValue(colors)
                                            setValues(prev => ({ ...prev, colors }))

                                        }
                                    }}
                                    type="file"
                                    multiple typeof='image/*' className="file-input file-input-bordered w-full max-w-xs" />
                            </label>
                        </div>
                    ))
                }
                <label className="form-control w-full max-w-xs mt-2">
                    <button onClick={() => setColor(prev => prev + 1)} type="button" className="btn">Add Color +</button>
                </label>
                <SubmitButton />
            </form>
        </div>
    )
}

export default AddProduct