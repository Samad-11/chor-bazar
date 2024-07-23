import React from 'react'
import RegisterForm from './RegisterForm'

const RegisterUserPage = async () => {

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
            <RegisterForm />
        </div>
    )
}

export default RegisterUserPage