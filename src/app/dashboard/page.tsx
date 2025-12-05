import { getProfile } from '@/app/actions/auth'
import { redirect } from 'next/navigation'
import { DashboardOverview } from '@/components/dashboard/Overview'

export default async function DashboardPage() {
    const profile = await getProfile()

    if (!profile) {
        redirect('/login')
    }

    return <DashboardOverview profile={profile} />
}
