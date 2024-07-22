import React from 'react'
import Container from '../container'
import { CiLocationArrow1, CiWallet } from 'react-icons/ci'
import { GoPackageDependencies } from 'react-icons/go'
import { RiCustomerServiceLine } from 'react-icons/ri'

const ExtraInfo = () => {
    return (
        <Container>
            <div className='grid grid-cols-4 pb-10 mb-10 pt-10
            gap-1
            border-4 border-primary
            '>
                <div className="flex 
                 items-center justify-center md:gap-5 gap-2
                border-r-2
                ">
                    <div className=''>
                        <CiLocationArrow1 className="
                        xl:text-5xl
                        lg:text-4xl
                        md:text-2xl
                        sm:text-lg 
                        text-sm
                        " fill='dark' />
                    </div>
                    <div>
                        <p className="font-semibold 
                        xl:text-lg
                        lg:text-md
                        md:text-xs text-[0.4rem]
                        ">
                            All Over India Shipping
                        </p>
                        <p className="text-gray-700
                        xl:text-lg
                        lg:text-md
                        md:text-xs text-[0.4rem]
                        ">
                            Order above ₹ 4000
                        </p>
                    </div>
                </div>
                <div className="flex 
                 items-center justify-center md:gap-5 gap-2
                border-r-2
                ">
                    <div className=''>
                        <GoPackageDependencies className="
                        xl:text-5xl
                        lg:text-4xl
                        md:text-2xl
                        sm:text-lg 
                        text-sm
                        " fill='dark' />
                    </div>
                    <div>
                        <p className="font-semibold 
                        xl:text-lg
                        lg:text-md
                        md:text-xs text-[0.4rem]
                        ">
                            Easy 30 Day Return
                        </p>
                        <p className="text-gray-700
                        xl:text-lg
                        lg:text-md
                        md:text-xs text-[0.4rem]
                        ">
                            Back return in 7 days
                        </p>
                    </div>
                </div>
                <div className="flex 
                 items-center justify-center md:gap-5 gap-2
                border-r-2
                ">
                    <div className=''>
                        <CiWallet className="
                        xl:text-5xl
                        lg:text-4xl
                        md:text-2xl
                        sm:text-lg 
                        text-sm
                        " fill='dark' />
                    </div>
                    <div>
                        <p className="font-semibold 
                        xl:text-lg
                        lg:text-md
                        md:text-xs text-[0.4rem]
                        ">
                            Money Back Guarantee
                        </p>
                        <p className="text-gray-700
                        xl:text-lg
                        lg:text-md
                        md:text-xs text-[0.4rem]
                        ">
                            Guarantee within 30 days                        </p>
                    </div>
                </div>
                <div className="flex 
                 items-center justify-center md:gap-5 gap-2
                ">
                    <div className=''>
                        <RiCustomerServiceLine className="
                        xl:text-5xl
                        lg:text-4xl
                        md:text-2xl
                        sm:text-lg 
                        text-sm
                        " fill='dark' />
                    </div>
                    <div>
                        <p className="font-semibold 
                        xl:text-lg
                        lg:text-md
                        md:text-xs text-[0.4rem]
                        ">
                            Easy Online Support
                        </p>
                        <p className="text-gray-700
                        xl:text-lg
                        lg:text-md
                        md:text-xs text-[0.4rem]
                        ">
                            Any time support                       </p>
                    </div>
                </div>
            </div>
        </Container>
    )
}



export default ExtraInfo