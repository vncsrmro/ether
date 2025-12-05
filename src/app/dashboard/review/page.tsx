import { redirect } from 'next/navigation'
import { getProfile } from '@/app/actions/auth'
import { ReviewQueue } from '@/components/dashboard/ReviewQueue'

export default async function ReviewPage() {
    const profile = await getProfile()

    if (!profile || profile.role !== 'admin') {
        redirect('/dashboard')
    }

    return <ReviewQueue />
}
