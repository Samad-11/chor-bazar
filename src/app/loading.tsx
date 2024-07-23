import Container from '@/components/container'
import React from 'react'

const HomeLoading = () => {
    return (
        <div className='h-screen'>
            <div className="flex
        justify-center items-center
        skeleton h-28 w-screen rounded-none bg-slate-100 shadow-sm">
                <div className="skeleton h-12 w-1/3 rounded-full "></div>
            </div>
            <Container>
                <div className="skeleton w-full h-80 mt-12 rounded-2xl bg-slate-200
            grid grid-cols-3
            px-16
            py-10
            gap-4
            ">
                    <div className="col-span-2 flex flex-col justify-between h-full">
                        <div className="skeleton h-12 w-full "></div>
                        <div className="skeleton h-8 w-full"></div>
                        <div className="skeleton h-12 rounded-full w-full"></div>
                    </div>
                    <div className="col-span-1 skeleton ">
                    </div>
                </div>
                <div className="skeleton h-40 mt-14 w-full"></div>
            </Container>
        </div>
    )
}

export default HomeLoading