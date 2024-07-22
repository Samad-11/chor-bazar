import dynamic from 'next/dynamic'
import Link from 'next/link'
import React, { Suspense } from 'react'
import { CiDesktop, CiLaptop, CiMobile2, CiMonitor, CiSearch, CiShop } from 'react-icons/ci'
import { SlEarphones } from 'react-icons/sl'
import { TbDeviceWatch } from 'react-icons/tb'
import SearchInput from '../SearchInput'

const Navbar = () => {
    const NavbarCart = dynamic(() => import('./NavbarCart'), { ssr: false })

    return (
        <div className='sticky top-0 z-40'>

            <div className="navbar bg-primary 
        
        justify-between
        lg:py-8 
        md:py-6
        sm:py-4
        ">
                <div className="">
                    <Link href={'/'} className="text-3xl font-bold font-caveat">Chor Bazar</Link>
                </div>
                <div className='flex-1 px-32 hidden md:block'>
                    <label className='label input input-bordered flex items-center gap-2'>
                        <Suspense>
                            <SearchInput />
                        </Suspense>
                        <div className=''>
                            <CiSearch fill='grey' size={30} className='' />
                        </div>
                    </label>
                </div>
                <div className="flex-none">
                    <NavbarCart />
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            <li><a>Settings</a></li>
                            <li><a>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* <NavBottom /> */}
        </div>
    )
}

export const category = [

    {
        name: "Phone",
        icon: <CiMobile2 />,
        href: "/"
    },
    {
        name: "Laptop",
        icon: <CiLaptop />,
        href: "/"
    },
    {
        name: "Desktop",
        icon: <CiDesktop />,
        href: "/"
    },
    {
        name: "Watch",
        icon: <TbDeviceWatch />,
        href: "/"
    },
    {
        name: "TV",
        icon: <CiMonitor />,
        href: "/"
    },
    {
        name: "Accessory",
        icon: <SlEarphones />,
        href: "/"
    },
]
const NavBottom = () => {
    return (
        <div className='w-full px-10 py-5 shadow-md bg-white'>
            <div className='flex w-full justify-between items-center overflow-x-auto overflow-scroll gap-8'>
                {
                    category.map((category, indx) => (

                        <Link key={category.name + indx} href={category.href} className={`flex items-center
                            gap-2
                             pb-3
                             mb-2
                            font-semibold
                        ${category.name == "All" ? "text-purple-500 border-b-4 border-b-purple-500" : "text-primary"
                            }
                        `}>
                            {category.icon}
                            <span> {category.name}</span>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default Navbar