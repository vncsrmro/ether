'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useAuthUIStore } from '@/store'
import { useRouter } from 'next/navigation'
import { ShieldAlert, CreditCard, ShoppingBag } from 'lucide-react'

export default function DashboardPage() {
    const { userRole } = useAuthUIStore()
    const router = useRouter()

    React.useEffect(() => {
        // Redirect based on role
        if (userRole === 'vendor') {
            router.push('/dashboard/vendor/overview')
        } else if (userRole === 'admin') {
            router.push('/dashboard/admin/overview')
        } else if (userRole === 'buyer') {
            router.push('/dashboard/buyer/library')
        }
    }, [userRole, router])

    // Fallback UI while redirecting or for guests
    return (
        <div className="flex items-center justify-center h-[60vh]">
            <div className="text-center">
                <div className="animate-spin w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full mx-auto mb-4" />
                <p className="text-white/60">Redirecionando para seu painel...</p>
            </div>
        </div>
    )
}
