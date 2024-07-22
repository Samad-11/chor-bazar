import { preColorArray } from '@/utils/preColors'
import React from 'react'
import FileInput from './FileInput'
import { MdDeleteOutline } from 'react-icons/md'

const ColorOptions = ({ sno, setNoOfColorFields }: {
    sno: number, setNoOfColorFields: React.Dispatch<React.SetStateAction<number>>,
}) => {
    return (
        <>

            <div className='flex gap-x-3 h-full  w-full items-end flex-wrap'>
                <div className="label-text-alt">
                    <span className="label-text-alt">
                        {
                            sno !== 1 &&
                            <button type="button"
                                onClick={() => {
                                    setNoOfColorFields((prev) => prev - 1)
                                }}
                                className='btn btn-md rounded-2xl btn-error text-white'
                            >
                                <MdDeleteOutline size={20} />
                            </button>
                        }
                    </span>
                </div>
                <label className="form-control  max-w-sm">
                    <div className="label">
                        <span className="label-text-alt">Product Color - {sno}</span>
                    </div>
                    <select
                        name={`color-${sno}-name-code`}
                        defaultValue={""} className="select select-bordered rounded-2xl">
                        <option disabled value={""} className=''>Pick one</option>
                        {
                            preColorArray.map((color, i) => (
                                <option key={i} value={[color.colorName, color.colorCode]}>{color.colorName}</option>
                            ))
                        }
                    </select>

                </label>

                <FileInput sno={sno} />
            </div>
            <div className="divider w-full"></div>
        </>
    )
}

export default ColorOptions