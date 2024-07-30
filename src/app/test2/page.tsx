import { getSession } from '@/actions/testAction'
import { auth } from '@/auth'
import Container from '@/components/container'
import React, { FC } from 'react'
import Test2Component from './Test2Component'


const page = () => {

    return (
        <div>
            <Test2Component />
        </div>
    )
}

export default page
