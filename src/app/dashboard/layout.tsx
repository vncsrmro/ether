import { redirect } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { getProfile } from '@/app/actions/auth'
import { DashboardSidebar } from '@/components/dashboard/Sidebar'

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const profile = await getProfile()

    if (!profile) {
        redirect('/login')
    }

    const messages = await getMessages()

    return (
        <NextIntlClientProvider messages={messages}>
            <div className="min-h-screen bg-[#050505]">
                <DashboardSidebar profile={profile} />
                <main className="lg:pl-64 min-h-screen">
                    <div className="p-4 lg:p-8">
                        {children}
                    </div>
                </main>
            </div>
        </NextIntlClientProvider>
    )
}
