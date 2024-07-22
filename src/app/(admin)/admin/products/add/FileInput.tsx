"use client"

import { useState } from "react"
import { MdDeleteOutline } from "react-icons/md"

const FileInput = ({ sno, }: { sno: number }) => {
    const [noOfFiles, setNoOfFiles] = useState(1)



    return (
        <>
            {
                Array.from({ length: noOfFiles }).map((_, indx) => (

                    <label key={indx} className="form-control max-w-[10rem]">
                        <div className="label">
                            <span className="label-text-alt">Images - {indx + 1}</span>
                            {
                                indx !== 0 &&
                                <span className="label-text-alt">
                                    <button type="button"
                                        onClick={() => {
                                            setNoOfFiles(prev => prev - 1)
                                        }}
                                        className="btn btn-xs btn-error rounded-md"
                                    >
                                        <MdDeleteOutline />
                                    </button>
                                </span>
                            }
                        </div>
                        <input
                            type="file"
                            name={`color-${sno}-image-${indx + 1}`}
                            className="file-input file-input-bordered w-full rounded-2xl" />

                    </label>
                ))
            }
            <input type="hidden" value={noOfFiles} name={`color-${sno}-image-size`} />
            <div className="h-full flex items-end  ">
                <button type="button"
                    onClick={() => setNoOfFiles(prev => prev + 1)}
                    className="btn btn-outline btn-md rounded-xl font-semibold"
                >+</button>
            </div>
        </>
    )
}

export default FileInput