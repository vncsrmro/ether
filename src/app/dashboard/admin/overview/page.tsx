'use client'

import React from 'react'
import { StatsCard } from '@/components/dashboard/StatsCard'
import { mockAdminStats, mockPendingApprovals } from '@/lib/mock-admin-data'
import { Users, DollarSign, Package, AlertCircle, Check, X } from 'lucide-react'
import { Button } from '@/components/ui'
import Link from 'next/link'

export default function AdminOverviewPage() {
    const stats = [
        { title: 'Usuários Totais', value: mockAdminStats.totalUsers, trend: 12, icon: Users },
        { title: 'Receita da Plataforma', value: `R$ ${mockAdminStats.totalRevenue.toLocaleString()}`, trend: mockAdminStats.revenueGrowth, icon: DollarSign },
        { title: 'Produtos Ativos', value: mockAdminStats.activeProducts, icon: Package },
        { title: 'Aprovações Pendentes', value: mockAdminStats.pendingApprovals, icon: AlertCircle, className: "border-yellow-500/30 bg-yellow-500/5" },
    ]

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Painel Administrativo</h1>
                <p className="text-white/60">Visão geral do sistema e tarefas pendentes.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, idx) => (
                    <StatsCard key={idx} {...stat} delay={idx * 0.1} />
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                <div className="p-6 rounded-2xl glass">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-white">Fila de Aprovação Recente</h3>
                        <Link href="/dashboard/admin/approvals" className="text-sm text-cyan-400 hover:underline">Ver tudo</Link>
                    </div>
                    <div className="space-y-4">
                        {mockPendingApprovals.map(item => (
                            <div key={item.id} className="flex gap-4 p-3 rounded-xl bg-white/5 border border-white/5">
                                <img src={item.thumb} className="w-16 h-12 object-cover rounded bg-black" />
                                <div className="flex-1">
                                    <h4 className="font-medium text-white text-sm">{item.title}</h4>
                                    <p className="text-xs text-white/50">{item.vendor} • R$ {item.price}</p>
                                </div>
                                <div className="flex gap-2">
                                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-green-400 hover:bg-green-500/20">
                                        <Check className="w-4 h-4" />
                                    </Button>
                                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-400 hover:bg-red-500/20">
                                        <X className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-6 rounded-2xl glass flex items-center justify-center text-white/30">
                    [Chart Placeholder: Revenue vs Payouts]
                </div>
            </div>
        </div>
    )
}
