import Link from 'next/link'
import React, { ReactNode } from 'react'
import { CgMenuGridO } from 'react-icons/cg'
import AdminAside from './AdminAside'
import AdminMainTop from './AminMainTop'

const AdminLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
    return (
        <div
            className='
            grid
            grid-cols-7
            '
        >
            <AdminAside />
            <div className='border col-span-6 px-5 py-7'>
                <AdminMainTop />
                <main>
                    {children}
                </main>
            </div>
        </div>
    )
}

export default AdminLayout