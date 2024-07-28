import { getUserIdByEmail } from '@/actions/authActions'
import { getUserAddress } from '@/actions/userAction'
import React from 'react'
import UserAddressForm from './UserAddressForm'
import { Address } from '@prisma/client'

const UserAddress = ({ address, userId }: { address: Address | null, userId: string }) => {

    return (
        <div>
            <h5 className='text-center font-semibold '>Contact Details</h5>
            <UserAddressForm userAddress={address} userId={userId} />
        </div>
    )
}

export default UserAddress