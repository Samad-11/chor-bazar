import React from 'react'
import Container from '../container'
import Image from 'next/image'
import Link from 'next/link'

const HeroBanner = () => {
    return (
        <Container>
            <div className="hero bg-secondary min-h-[30vh 
            mt-12
            mb-12
            rounded-md
            ]">
                <Link href={"/shop"} className="hero-content justify-between w-full flex-col lg:flex-row-reverse">
                    <figure className="aspect-video h-80 max-w-xs md:max-w-lg relative">
                        <Image
                            fill
                            alt='Hero banner Image'
                            className='object-contain'
                            src="https://images.unsplash.com/photo-1511467007263-aa72ed0157dd" />
                    </figure>
                    <div>
                        <h1 className="text-5xl font-bold font-poppins
                        text-secondary-content
                        
                        ">Sale! Apple Products upto 50%</h1>
                        <p className="py-6 font-semibold text-white">
                            Don&apos;t miss the chance , grab your apple product now
                        </p>
                        <button className="btn btn-primary btn-block">
                            Shop Now
                        </button>
                    </div>
                </Link>
            </div>
        </Container>
    )
}

export default HeroBanner