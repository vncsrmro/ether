'use client'

import React from 'react'
import { StatsCard } from '@/components/dashboard/StatsCard'
import { DollarSign, TrendingUp, Download, Calendar } from 'lucide-react'
import { Button } from '@/components/ui'

export default function AdminFinancePage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Financeiro da Plataforma</h1>
                    <p className="text-white/60">Controle de receitas, comissões e repasses.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">
                        <Calendar className="w-4 h-4 mr-2" />
                        Nov 2023
                    </Button>
                    <Button>
                        <Download className="w-4 h-4 mr-2" />
                        Relatório Mensal
                    </Button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Volume Total (GMV)"
                    value="R$ 142.500"
                    trend={15}
                    icon={TrendingUp}
                    className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20"
                />
                <StatsCard
                    title="Receita Líquida"
                    value="R$ 28.450"
                    subValue="20% das vendas"
                    trend={12}
                    icon={DollarSign}
                    className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-500/30"
                />
                <StatsCard
                    title="Repasses Pendentes"
                    value="R$ 14.200"
                    subValue="45 vendedores"
                    icon={DollarSign}
                />
                <StatsCard
                    title="Ticket Médio"
                    value="R$ 125,00"
                    trend={-2}
                    icon={TrendingUp}
                />
            </div>

            {/* Main Content Area */}
            <div className="grid lg:grid-cols-3 gap-8">
                {/* Recent Payouts Table */}
                <div className="lg:col-span-2 rounded-2xl glass p-6">
                    <h3 className="font-bold text-white mb-6">Últimos Repasses & Comissões</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-white/10 text-xs text-white/40 uppercase">
                                    <th className="pb-3">Data</th>
                                    <th className="pb-3">Tipo</th>
                                    <th className="pb-3">Beneficiário</th>
                                    <th className="pb-3 text-right">Valor</th>
                                    <th className="pb-3 text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-sm">
                                {[1, 2, 3, 4, 5].map((_, i) => (
                                    <tr key={i} className="group hover:bg-white/5 transition-colors">
                                        <td className="py-3 text-white/60">05/12/2023</td>
                                        <td className="py-3 text-white">Venda #123{i}</td>
                                        <td className="py-3 text-white/80">Alex Design</td>
                                        <td className="py-3 text-right font-mono text-white">R$ 49.90</td>
                                        <td className="py-3 text-right">
                                            <span className="px-2 py-0.5 rounded bg-green-500/10 text-green-400 text-xs">Pago</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Platform Fees Box */}
                <div className="rounded-2xl glass p-6 h-fit sticky top-24">
                    <h3 className="font-bold text-white mb-4">Configuração de Taxas</h3>
                    <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                            <p className="text-xs text-white/40 mb-1">Comissão Padrão (Marketplace)</p>
                            <div className="flex items-end justify-between">
                                <span className="text-2xl font-bold text-white">20%</span>
                                <Button size="sm" variant="ghost" className="h-6 text-xs text-cyan-400">Alterar</Button>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                            <p className="text-xs text-white/40 mb-1">Taxa Fixa por Transação</p>
                            <div className="flex items-end justify-between">
                                <span className="text-2xl font-bold text-white">R$ 0,00</span>
                                <Button size="sm" variant="ghost" className="h-6 text-xs text-cyan-400">Alterar</Button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/10">
                        <p className="text-xs text-white/40 mb-2">Conexão Stripe</p>
                        <div className="flex items-center gap-2 text-green-400 text-sm font-medium">
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                            Conectado e Operacional
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
