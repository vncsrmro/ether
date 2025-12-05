'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { mockOrders } from '@/lib/mock-user-data'
import { ArrowUpRight, Download } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui'

export default function BuyerOrdersPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Histórico de Pedidos</h1>
                <p className="text-white/60">Visualize suas compras anteriores e notas fiscais.</p>
            </div>

            <div className="rounded-2xl glass overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/10 bg-white/5">
                                <th className="p-4 text-xs font-medium text-white/50 uppercase">ID do Pedido</th>
                                <th className="p-4 text-xs font-medium text-white/50 uppercase">Data</th>
                                <th className="p-4 text-xs font-medium text-white/50 uppercase">Status</th>
                                <th className="p-4 text-xs font-medium text-white/50 uppercase">Itens</th>
                                <th className="p-4 text-xs font-medium text-white/50 uppercase">Total</th>
                                <th className="p-4 text-xs font-medium text-white/50 uppercase text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {mockOrders.map((order, idx) => (
                                <motion.tr
                                    key={order.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="hover:bg-white/5 transition-colors"
                                >
                                    <td className="p-4 font-mono text-sm text-cyan-400">
                                        <Link href={`#`} className="hover:underline">{order.id}</Link>
                                    </td>
                                    <td className="p-4 text-sm text-white/70">
                                        {new Date(order.date).toLocaleDateString('pt-BR')}
                                    </td>
                                    <td className="p-4">
                                        <span className={cn(
                                            "inline-flex items-center px-2 py-1 rounded text-xs font-medium capitalize",
                                            order.status === 'completed' ? "bg-green-500/10 text-green-400" :
                                                order.status === 'refunded' ? "bg-red-500/10 text-red-400" :
                                                    "bg-yellow-500/10 text-yellow-400"
                                        )}>
                                            {order.status === 'completed' ? 'Concluído' :
                                                order.status === 'refunded' ? 'Reembolsado' : 'Processando'}
                                        </span>
                                    </td>
                                    <td className="p-4 text-sm text-white/70">
                                        {order.items.length} produto(s)
                                    </td>
                                    <td className="p-4 text-sm font-bold text-white">
                                        R$ {order.total.toFixed(2)}
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                                <Download className="w-4 h-4" />
                                            </Button>
                                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                                <ArrowUpRight className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
