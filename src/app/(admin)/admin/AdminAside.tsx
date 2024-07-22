import Link from 'next/link'
import React from 'react'
import { BiCategoryAlt } from 'react-icons/bi'
import { CgMenuGridO } from 'react-icons/cg'
import { GoPackage } from 'react-icons/go'
import { LuMessageCircle } from 'react-icons/lu'
import { PiUsersFour } from 'react-icons/pi'
import { TbShoppingBag } from 'react-icons/tb'
import AdminAsideLinks from './AdminAsideLinks'


const AdminAside = () => {
    return (
        <aside className='border bg-gray-100 col-span-1
            px-6  pt-7
            min-h-screen
            '>
            <div
                className='fixed h-screen'
            >
                <h1
                    className='text-3xl font-bold font-caveat text-center'
                >Chor Bazar</h1>
                <AdminAsideLinks />
            </div>
        </aside>
    )
}

export default AdminAside