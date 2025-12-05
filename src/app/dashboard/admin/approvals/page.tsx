'use client'

import React from 'react'
import { mockPendingApprovals } from '@/lib/mock-admin-data'
import { Check, X, Eye } from 'lucide-react'
import { Button } from '@/components/ui'
import { useUIStore } from '@/store'

export default function ApprovalsPage() {
    const { openModal } = useUIStore()

    const handleAction = (action: 'approve' | 'reject', item: any) => {
        openModal('ADMIN_REVIEW', {
            action,
            productTitle: item.title,
            onConfirm: (reason?: string) => {
                console.log(`Confirmed ${action} for ${item.id}. Reason: ${reason}`)
                // Here we would call the actual API to update status
            }
        })
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Fila de Aprovação</h1>
                <p className="text-white/60">Revise e aprove novos produtos enviados pelos vendedores.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockPendingApprovals.map((item, idx) => (
                    <div key={item.id} className="rounded-2xl glass overflow-hidden flex flex-col">
                        <div className="aspect-video relative bg-black group cursor-pointer" onClick={() => openModal('VIDEO_PREVIEW', item)}>
                            <img src={item.thumb} className="w-full h-full object-cover" />
                            <div className="absolute top-2 right-2 px-2 py-1 bg-black/60 backdrop-blur rounded text-xs text-white font-mono">
                                PENDING
                            </div>
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Eye className="w-8 h-8 text-white/80" />
                            </div>
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                            <h3 className="font-bold text-white mb-1">{item.title}</h3>
                            <p className="text-sm text-white/50 mb-4">por {item.vendor}</p>

                            <div className="flex items-center justify-between text-sm text-white/70 mb-6 bg-white/5 p-3 rounded-lg">
                                <span>Preço: R$ {item.price.toFixed(2)}</span>
                                <span>Preview 4K</span>
                            </div>

                            <div className="mt-auto grid grid-cols-2 gap-3">
                                <Button
                                    className="bg-green-500 hover:bg-green-600 text-white"
                                    onClick={() => handleAction('approve', item)}
                                >
                                    <Check className="w-4 h-4 mr-2" /> Aprovar
                                </Button>
                                <Button
                                    variant="secondary"
                                    className="hover:bg-red-500/20 hover:text-red-400"
                                    onClick={() => handleAction('reject', item)}
                                >
                                    <X className="w-4 h-4 mr-2" /> Rejeitar
                                </Button>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="mt-2 w-full text-white/40"
                                onClick={() => openModal('VIDEO_PREVIEW', item)}
                            >
                                <Eye className="w-4 h-4 mr-2" /> Visualizar Detalhes
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
