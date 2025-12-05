'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StatsCardProps {
    title: string
    value: string | number
    trend?: number
    icon?: React.ElementType
    subValue?: string
    className?: string
    delay?: number
}

export function StatsCard({
    title,
    value,
    trend,
    icon: Icon,
    subValue,
    className,
    delay = 0
}: StatsCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            className={cn("p-6 rounded-2xl glass relative overflow-hidden group", className)}
        >
            <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                    <p className="text-sm font-medium text-white/60">{title}</p>
                    {Icon && (
                        <div className="p-2 rounded-lg bg-white/5 text-white/60 group-hover:text-cyan-400 group-hover:bg-cyan-500/10 transition-colors">
                            <Icon className="w-5 h-5" />
                        </div>
                    )}
                </div>

                <div className="flex items-end gap-3 mb-1">
                    <h3 className="text-3xl font-bold text-white">{value}</h3>

                    {trend !== undefined && (
                        <div className={cn(
                            "flex items-center text-xs font-medium px-2 py-1 rounded-full mb-1",
                            trend > 0 ? "bg-green-500/20 text-green-400" :
                                trend < 0 ? "bg-red-500/20 text-red-400" :
                                    "bg-white/10 text-white/60"
                        )}>
                            {trend > 0 ? <ArrowUpRight className="w-3 h-3 mr-1" /> :
                                trend < 0 ? <ArrowDownRight className="w-3 h-3 mr-1" /> :
                                    <Minus className="w-3 h-3 mr-1" />}
                            {Math.abs(trend)}%
                        </div>
                    )}
                </div>

                {subValue && (
                    <p className="text-xs text-white/40">{subValue}</p>
                )}
            </div>

            {/* Decorative Glow */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br from-cyan-500/10 to-violet-500/10 rounded-full blur-2xl group-hover:from-cyan-500/20 group-hover:to-violet-500/20 transition-all" />
        </motion.div>
    )
}
