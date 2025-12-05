'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { Profile } from '@/types'
import { vendorStats } from '@/lib/mock-data'
import { Star, Package, TrendingUp } from 'lucide-react'

interface VendorCardProps {
    vendor: Profile
    className?: string
}

export function VendorCard({ vendor, className }: VendorCardProps) {
    const stats = vendorStats[vendor.id] || { products: 0, sales: 0, rating: 0 }

    return (
        <Link href={`/vendors/${vendor.id}`}>
            <motion.div
                className={cn(
                    "group relative p-6 rounded-2xl glass overflow-hidden",
                    "transition-all duration-500 hover:-translate-y-2",
                    className
                )}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{
                    boxShadow: '0 0 30px rgba(0, 240, 255, 0.2), 0 0 60px rgba(112, 0, 255, 0.1)',
                    borderColor: 'rgba(255, 255, 255, 0.2)'
                }}
            >
                {/* Gradient Background on Hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-violet-500/10" />
                </div>

                <div className="relative">
                    {/* Avatar */}
                    <div className="flex items-center gap-4 mb-4">
                        <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-white/10 group-hover:ring-cyan-500/50 transition-all">
                            {vendor.avatar_url ? (
                                <img
                                    src={vendor.avatar_url}
                                    alt={vendor.brand_name || 'Vendor'}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center text-xl font-bold">
                                    {(vendor.brand_name || 'V')[0]}
                                </div>
                            )}
                        </div>
                        <div>
                            <h3 className="font-semibold text-white group-hover:text-cyan-400 transition-colors">
                                {vendor.brand_name || 'Unknown Vendor'}
                            </h3>
                            <div className="flex items-center gap-1 text-sm text-yellow-400">
                                <Star className="w-4 h-4 fill-current" />
                                <span>{stats.rating}</span>
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2 text-white/60">
                            <Package className="w-4 h-4" />
                            <span className="text-sm">{stats.products} produtos</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/60">
                            <TrendingUp className="w-4 h-4" />
                            <span className="text-sm">{stats.sales} vendas</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link>
    )
}
