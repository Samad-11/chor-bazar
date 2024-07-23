import React from 'react'
import LoginForm from './LoginForm'
import { auth } from '@/auth'

const LoginPage = async () => {
    const session = await auth()
    return (
        <div>
            <h1 className='text-3xl font-semibold 
    text-center
    pt-10
    '>Sign Up to the
                <span className='font-caveat text-neutral text-4xl'>
                    {" "} Chor Bazar
                </span>
            </h1>
            <LoginForm session={session} />
        </div>
    )
}

export default LoginPage