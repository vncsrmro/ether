'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { StatsCard } from '@/components/dashboard/StatsCard'
import { mockVendorStats, mockRecentSales } from '@/lib/mock-vendor-data'
import { DollarSign, ShoppingBag, Package, Star, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui'
import Link from 'next/link'

export default function VendorOverviewPage() {
    const stats = [
        { title: 'Receita Total', value: `R$ ${mockVendorStats.totalRevenue.toLocaleString('pt-BR')}`, trend: mockVendorStats.revenueTrend, icon: DollarSign },
        { title: 'Vendas', value: mockVendorStats.totalSales, trend: mockVendorStats.salesTrend, icon: ShoppingBag },
        { title: 'Produtos Ativos', value: mockVendorStats.totalProducts, trend: mockVendorStats.productTrend, icon: Package },
        { title: 'Avaliação Média', value: mockVendorStats.rating, icon: Star },
    ]

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Visão Geral</h1>
                    <p className="text-white/60">Bem-vindo de volta! Aqui está como estão suas vendas.</p>
                </div>
                <Link href="/dashboard/vendor/products/new">
                    <Button className="bg-gradient-to-r from-cyan-500 to-violet-500">
                        Novo Upload
                    </Button>
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, idx) => (
                    <StatsCard
                        key={stat.title}
                        title={stat.title}
                        value={stat.value}
                        trend={stat.trend}
                        icon={stat.icon}
                        delay={idx * 0.1}
                    />
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Chart Area (Mock placeholder) */}
                <div className="lg:col-span-2 p-6 rounded-2xl glass min-h-[400px]">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-white">Desempenho de Vendas</h3>
                        <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-sm text-white/70">
                            <option>Últimos 30 dias</option>
                            <option>Este ano</option>
                        </select>
                    </div>
                    {/* Mock Chart Visual */}
                    <div className="flex items-end justify-between h-[300px] gap-2 px-2">
                        {[...Array(12)].map((_, i) => {
                            const height = 40 + Math.random() * 60;
                            return (
                                <div key={i} className="w-full bg-white/5 rounded-t-lg relative group overflow-hidden">
                                    <div
                                        className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-cyan-500/50 to-violet-500/50 transition-all duration-1000"
                                        style={{ height: `${height}%` }}
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="p-6 rounded-2xl glass">
                    <h3 className="font-bold text-white mb-6">Vendas Recentes</h3>
                    <div className="space-y-6">
                        {mockRecentSales.map((sale, idx) => (
                            <div key={sale.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-green-500/10 text-green-400">
                                        <DollarSign className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-white">{sale.product}</p>
                                        <p className="text-xs text-white/40">{sale.buyer}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-white">+R$ {sale.revenue.toFixed(2)}</p>
                                    <p className="text-xs text-white/40">Agora mesmo</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Button variant="ghost" className="w-full mt-4 text-white/50 hover:text-white">
                        Ver todas as transações
                    </Button>
                </div>
            </div>
        </div>
    )
}
