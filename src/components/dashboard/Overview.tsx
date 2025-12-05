'use client'

import { motion } from 'framer-motion'
import {
    TrendingUp,
    DollarSign,
    Package,
    Eye,
    ArrowUpRight,
    ArrowDownRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Profile } from '@/types'

interface DashboardOverviewProps {
    profile: Profile
}

// Mock data - replace with real data from Supabase
const vendorStats = [
    {
        label: 'Vendas Totais',
        value: 'R$ 12.450,00',
        change: '+12.5%',
        trend: 'up',
        icon: DollarSign
    },
    {
        label: 'Produtos Ativos',
        value: '24',
        change: '+3',
        trend: 'up',
        icon: Package
    },
    {
        label: 'Visualizações',
        value: '8.432',
        change: '-2.1%',
        trend: 'down',
        icon: Eye
    },
    {
        label: 'Taxa de Conversão',
        value: '3.2%',
        change: '+0.5%',
        trend: 'up',
        icon: TrendingUp
    },
]

const adminStats = [
    {
        label: 'GMV Total',
        value: 'R$ 128.450,00',
        change: '+18.2%',
        trend: 'up',
        icon: DollarSign
    },
    {
        label: 'Receita Líquida',
        value: 'R$ 25.690,00',
        change: '+15.3%',
        trend: 'up',
        icon: TrendingUp
    },
    {
        label: 'Vendedores Ativos',
        value: '156',
        change: '+12',
        trend: 'up',
        icon: Package
    },
    {
        label: 'Pendentes Revisão',
        value: '8',
        change: '-3',
        trend: 'down',
        icon: Eye
    },
]

export function DashboardOverview({ profile }: DashboardOverviewProps) {
    const isAdmin = profile.role === 'admin'
    const stats = isAdmin ? adminStats : vendorStats

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <motion.h1
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-2xl lg:text-3xl font-bold text-white"
                >
                    {isAdmin ? 'Painel Administrativo' : `Olá, ${profile.brand_name || 'Vendedor'}!`}
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-white/50 mt-1"
                >
                    {isAdmin
                        ? 'Visão geral do marketplace'
                        : 'Aqui está o resumo das suas vendas'}
                </motion.p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-colors"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 flex items-center justify-center">
                                <stat.icon className="w-5 h-5 text-cyan-400" />
                            </div>
                            <div className={cn(
                                'flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full',
                                stat.trend === 'up'
                                    ? 'bg-green-500/10 text-green-400'
                                    : 'bg-red-500/10 text-red-400'
                            )}>
                                {stat.trend === 'up' ? (
                                    <ArrowUpRight className="w-3 h-3" />
                                ) : (
                                    <ArrowDownRight className="w-3 h-3" />
                                )}
                                {stat.change}
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-white">{stat.value}</p>
                        <p className="text-sm text-white/50 mt-1">{stat.label}</p>
                    </motion.div>
                ))}
            </div>

            {/* Quick Actions / Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Sales / Orders */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
                >
                    <h3 className="text-lg font-semibold text-white mb-4">
                        {isAdmin ? 'Pedidos Recentes' : 'Vendas Recentes'}
                    </h3>
                    <div className="space-y-3">
                        {[1, 2, 3].map((_, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.02]"
                            >
                                <div className="w-12 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-violet-500/20" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-white truncate">
                                        Neon Waves Abstract
                                    </p>
                                    <p className="text-xs text-white/50">
                                        há 2 horas
                                    </p>
                                </div>
                                <span className="text-sm font-medium text-green-400">
                                    R$ 49,90
                                </span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Top Products / Pending Reviews */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
                >
                    <h3 className="text-lg font-semibold text-white mb-4">
                        {isAdmin ? 'Aguardando Revisão' : 'Mais Vendidos'}
                    </h3>
                    <div className="space-y-3">
                        {[1, 2, 3].map((_, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.02]"
                            >
                                <div className="w-12 h-8 rounded-lg bg-gradient-to-br from-violet-500/20 to-cyan-500/20" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-white truncate">
                                        Cyber Grid Matrix
                                    </p>
                                    <p className="text-xs text-white/50">
                                        {isAdmin ? 'por NeonLabs' : '124 vendas'}
                                    </p>
                                </div>
                                {isAdmin ? (
                                    <div className="flex gap-2">
                                        <button className="px-3 py-1 text-xs rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors">
                                            Aprovar
                                        </button>
                                        <button className="px-3 py-1 text-xs rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors">
                                            Rejeitar
                                        </button>
                                    </div>
                                ) : (
                                    <span className="text-sm font-medium text-white/70">
                                        R$ 6.200
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
