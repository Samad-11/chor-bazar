import Container from '@/components/container'
import React, { ReactNode } from 'react'

const AuthLayout = ({ children }: { children: ReactNode }) => {
    return (
        <Container>

            {children}
        </Container>
    )
}

export default AuthLayout