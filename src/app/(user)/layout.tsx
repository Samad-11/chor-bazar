import MainLayout from '@/components/layout/MainLayout';
import React from 'react'

export default function UserLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <MainLayout>
            {children}
        </MainLayout>

    );
}