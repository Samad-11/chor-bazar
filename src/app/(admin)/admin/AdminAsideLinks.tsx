'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { BiCategoryAlt } from 'react-icons/bi'
import { CgMenuGridO } from 'react-icons/cg'
import { GoPackage } from 'react-icons/go'
import { LuMessageCircle } from 'react-icons/lu'
import { PiUsersFour } from 'react-icons/pi'
import { TbShoppingBag } from 'react-icons/tb'

const AdminAsideLinks = () => {
    const asideLinks = [
        {
            name: "overview",
            href: "/admin/overview",
            icon: <CgMenuGridO fontWeight={800}
                className='size-8' />
        },
        {
            name: "products",
            href: "/admin/products",
            icon: <TbShoppingBag fontWeight={800}
                className='size-8' />
        },
        {
            name: "orders",
            href: "/admin/orders",
            icon: <GoPackage fontWeight={800}
                className='size-8' />
        },
        {
            name: "users",
            href: "/admin/users",
            icon: <PiUsersFour fontWeight={800}
                className='size-8' />
        },
        {
            name: "categories",
            href: "/admin/categories",
            icon: <BiCategoryAlt fontWeight={800}
                className='size-8' />
        },
        {
            name: "reviews",
            href: "/admin/reviews",
            icon: <LuMessageCircle fontWeight={800}
                className='size-8' />
        },
    ]

    const pathname = usePathname();


    return (
        <div className='flex flex-col gap-4   pt-10'>
            {
                asideLinks.map((link, indx) => {

                    return (
                        <Link
                            key={link.href + indx}
                            href={link.href}
                            className={`flex justify-start gap-3 items-center
                font-medium
                text-xl
                text-gray-700
                mb-5
                capitalize
    
                transition-all
                hover:text-white
                hover:bg-black
                rounded-2xl
                px-3
                py-2
                ${pathname.includes(link.href.split("/")[2]) ? "text-white bg-black" : ""}
                `}
                        >
                            {link.icon}
                            <span>{link.name}</span>
                        </Link>
                    )
                })
            }
        </div>
    )
}

export default AdminAsideLinks