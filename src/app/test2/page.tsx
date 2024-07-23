import { auth } from '@/auth'
import Container from '@/components/container'
import React from 'react'

const Test2Page = async () => {
    const session = await auth()
    return (
        <div>
            <pre>
                {
                    JSON.stringify(session, null, 2)
                }
            </pre>
        </div>
    )
}

export default Test2Page