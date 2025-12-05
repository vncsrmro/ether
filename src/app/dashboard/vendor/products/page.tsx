'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit, MoreVertical, Eye, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui'
import { mockVendorProducts } from '@/lib/mock-vendor-data'
import { useUIStore } from '@/store'

export default function VendorProductsPage() {
    const { openModal } = useUIStore()

    const handleDelete = (product: any) => {
        openModal('CONFIRM', {
            title: 'Excluir Produto',
            description: `Tem certeza que deseja excluir "${product.title}"? Esta ação não pode ser desfeita.`,
            variant: 'danger',
            confirmText: 'Excluir Definitivamente',
            onConfirm: () => {
                console.log('Deleting:', product.id)
                // Call API here
            },
            details: [
                { label: 'Status', value: product.status },
                { label: 'Vendas Totais', value: product.sales.toString() }
            ]
        })
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Meus Produtos</h1>
                    <p className="text-white/60">Gerencie seu catálogo, preços e status.</p>
                </div>
                <Link href="/dashboard/vendor/products/new">
                    <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Novo Produto
                    </Button>
                </Link>
            </div>

            <div className="rounded-2xl glass overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-white/10 bg-white/5">
                            <th className="p-4 text-xs font-medium text-white/50 uppercase">Produto</th>
                            <th className="p-4 text-xs font-medium text-white/50 uppercase">Status</th>
                            <th className="p-4 text-xs font-medium text-white/50 uppercase">Preço</th>
                            <th className="p-4 text-xs font-medium text-white/50 uppercase">Vendas</th>
                            <th className="p-4 text-xs font-medium text-white/50 uppercase text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {mockVendorProducts.map((product, idx) => (
                            <tr key={product.id} className="hover:bg-white/5 transition-colors">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-12 h-12 rounded-lg bg-black overflow-hidden flex-shrink-0 cursor-pointer hover:ring-2 ring-cyan-500/50 transition-all"
                                            onClick={() => openModal('VIDEO_PREVIEW', product)}
                                        >
                                            <img src={product.assets?.[0]?.thumb} className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-white">{product.title}</p>
                                            <p className="text-xs text-white/40 uppercase">{product.resolution} • {product.fps}FPS</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-500/10 text-green-400 capitalize">
                                        {product.status}
                                    </span>
                                </td>
                                <td className="p-4 text-white/80">R$ {product.price.toFixed(2)}</td>
                                <td className="p-4 text-white/80">{product.sales}</td>
                                <td className="p-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            className="h-8 w-8 p-0"
                                            onClick={() => openModal('VIDEO_PREVIEW', product)}
                                        >
                                            <Eye className="w-4 h-4" />
                                        </Button>
                                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                            <Edit className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            className="h-8 w-8 p-0 text-red-400 hover:text-red-500 hover:bg-red-500/10"
                                            onClick={() => handleDelete(product)}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
