'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { StatsCard } from '@/components/dashboard/StatsCard'
import { DollarSign, TrendingUp, CreditCard, Download } from 'lucide-react'
import { Button } from '@/components/ui'
import { mockRecentSales, mockVendorStats } from '@/lib/mock-vendor-data'

export default function VendorFinancePage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Financeiro</h1>
                    <p className="text-white/60">Acompanhe seus ganhos e saques.</p>
                </div>
                <Button>
                    <Download className="w-4 h-4 mr-2" />
                    Exportar Relatório
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatsCard
                    title="Saldo Disponível"
                    value="R$ 3.450,00"
                    icon={DollarSign}
                    className="bg-gradient-to-br from-cyan-900/40 to-violet-900/40 border-cyan-500/30"
                />
                <StatsCard
                    title="A Receber"
                    value="R$ 890,00"
                    subValue="Próximo pagamento: 15/12"
                    icon={TrendingUp}
                />
                <StatsCard
                    title="Total Sacado"
                    value="R$ 8.110,00"
                    icon={CreditCard}
                />
            </div>

            <div className="rounded-2xl glass p-8">
                <h3 className="font-bold text-white mb-6">Histórico de Transações</h3>
                <div className="space-y-4">
                    {mockRecentSales.map((sale, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                                    <DollarSign className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-medium text-white">Venda realizada</p>
                                    <p className="text-xs text-white/40">{new Date(sale.date).toLocaleDateString()} • {sale.product}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-white text-lg">+ R$ {sale.revenue.toFixed(2)}</p>
                                <p className="text-xs text-green-400">Processado</p>
                            </div>
                        </div>
                    ))}
                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 opacity-60">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/40">
                                <CreditCard className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="font-medium text-white">Saque para Conta ****1234</p>
                                <p className="text-xs text-white/40">01/12/2023</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="font-bold text-white text-lg">- R$ 1.500,00</p>
                            <p className="text-xs text-white/40">Concluído</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
