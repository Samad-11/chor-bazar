import { auth } from '@/auth'
import Container from '@/components/container'
import React from 'react'
import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'



const Test2Page = async () => {
    const session = await auth()
    console.log("GOOGLE_CLIENT_ID", process.env.GOOGLE_CLIENT_ID);
    console.log("GOOGLE_CLIENT_SECRET", process.env.GOOGLE_CLIENT_SECRET);


    return (
        <div>
            <pre>
                {
                    JSON.stringify(session?.user, null, 2)
                }
            </pre>
        </div>
    )
}

export default Test2Page