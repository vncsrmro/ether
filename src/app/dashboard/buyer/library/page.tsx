'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { StatsCard } from '@/components/dashboard/StatsCard'
import { LibraryGrid } from '@/components/buyer/LibraryGrid'
import { mockLibrary, mockOrders, mockWishlist } from '@/lib/mock-user-data'
import { Download, ShoppingBag, Heart } from 'lucide-react'

export default function BuyerLibraryPage() {
    const stats = [
        { title: 'Downloads', value: mockLibrary.length, icon: Download },
        { title: 'Pedidos', value: mockOrders.length, icon: ShoppingBag },
        { title: 'Favoritos', value: mockWishlist.length, icon: Heart },
    ]

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Minha Biblioteca</h1>
                <p className="text-white/60">Gerencie seus loops e downloads.</p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {stats.map((stat, idx) => (
                    <StatsCard
                        key={stat.title}
                        title={stat.title}
                        value={stat.value}
                        icon={stat.icon}
                        delay={idx * 0.1}
                    />
                ))}
            </div>

            {/* Library Grid */}
            <section>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white">Uploads Recentes</h2>
                    {/* Filter controls could go here */}
                </div>
                <LibraryGrid items={mockLibrary} />
            </section>
        </div>
    )
}
