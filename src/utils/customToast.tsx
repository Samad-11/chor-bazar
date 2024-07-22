import toast, { Toaster } from 'react-hot-toast'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { CiCircleCheck, CiCircleRemove } from 'react-icons/ci'

export const customSuccess = (msg: string) => {
    toast.custom((t) => (
        <div
            className={`bg-secondary min-w-20 px-6 py-4 shadow-md rounded-2xl text-black
                flex justify-center items-center gap-3
                ${t.visible ? 'animate-enter' : 'animate-leave'
                }`}
        >
            <span>
                {msg}
            </span>
            <CiCircleCheck className='text-green-800 font-bold size-7' />
        </div>
    ))
}
export const customError = (msg: string) => {
    toast.custom((t) => (
        <div
            className={`bg-secondary min-w-20 px-6 py-4 shadow-md rounded-2xl text-black
                flex justify-center items-center gap-3
                ${t.visible ? 'animate-enter' : 'animate-leave'
                }`}
        >
            <span>
                {msg}
            </span>
            <CiCircleRemove className='text-rose-800 font-bold size-7' />
        </div>
    ))
}
export const customPending = (msg: string) => {
    toast.custom((t) => {
        t.type = "loading"
        return (
            <div
                className={`bg-secondary min-w-20 px-6 py-4 shadow-md rounded-2xl text-black
                flex justify-center items-center gap-3
                ${t.visible ? 'animate-enter' : 'animate-leave'
                    }`}
            >
                <span>
                    {msg}
                </span>
                <AiOutlineLoading3Quarters className='text-slate-800 font-bold size-7 animate-spin' />
            </div>
        )
    })
}