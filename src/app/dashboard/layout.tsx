import * as React from 'react'
import { Header } from '@/components/layout'
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Header />
            <div className="flex min-h-screen pt-16">
                <DashboardSidebar />
                <main className="flex-1 lg:ml-64 p-4 md:p-8 bg-black">
                    {children}
                </main>
            </div>
        </>
    )
}
