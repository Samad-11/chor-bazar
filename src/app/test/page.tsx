'use client'
import { uploadFile } from '@/actions/productActions'
import { customSuccess, customError } from '@/utils/customToast'
import Image from 'next/image'
import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

const TestPage = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [image, setImage] = useState<FileList | null>(null)
    const formData = new FormData()

    const myPromise = new Promise((resolve, reject) => {
        fetch("https://jsonplaceholder.typicode.com/todos/1")
            .then((response) => response.json())
            .then((json) => setTimeout(() => {
                reject(json)
            }, 5000))
    })


    useEffect(() => {
        if (image) {
            let i: number;
            for (i = 0; i < image.length; i++) {
                formData.append(`image-${i}`, image[i])
            }
            formData.append('total-images', `${i}`)
        }

        // toast.promise(myPromise, {
        //     loading: "Adding your products",
        //     error: "Something went wrong",
        //     success: "Product Added successfully"
        // })

    }, [image])



    return (
        <div>

            <Image
                src={'https://abdus-samad-bucket-1.s3.ap-southeast-2.amazonaws.com/05b4170c-6274-4e6b-a4d4-35d17f96d327motoBlue3.jpg'}
                alt='Hello'
                width={200}
                height={200}
            />
            <div className='flex justify-center gap-5'>
                <button type="button"
                    onClick={() => customSuccess('Test')}
                >Success</button>
                <button type="button"
                    onClick={() => customError('Something went wrong')}
                >Error</button>
                <button type="button"
                    onClick={async () => {
                        await toast.promise(myPromise, {
                            loading: "Adding your products",
                            error: "Something went wrong",
                            success: "Product Added successfully"
                        })

                    }
                    }
                >Pending</button>
            </div>
            <form action={() => uploadFile(formData)} >
                <input type="file" name="file" id="file"
                    placeholder='Upload Imge'
                    typeof='image/*'
                    multiple={true}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setImage(e.target.files)
                    }}
                />
                <button type="submit">Upload</button>
            </form>
        </div>
    )
}

export default TestPage