import React, { ReactNode } from 'react'

const Container = ({ children }: { children: ReactNode }) => {
    return (
        <div
            className='
        xl:px-20
        lg:px-16
        md:px-12
        sm:px-8
        px-4
        '
        >
            {children}
        </div>
    )
}

export default Container