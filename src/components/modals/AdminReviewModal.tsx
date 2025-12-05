'use client'

import React from 'react'
import { Modal } from '@/components/ui/Modal'
import { Button, Input } from '@/components/ui'
import { CheckCircle, XCircle } from 'lucide-react'

interface AdminReviewModalProps {
    isOpen: boolean
    onClose: () => void
    data: {
        action: 'approve' | 'reject'
        productTitle: string
        onConfirm: (reason?: string) => void
    }
}

export function AdminReviewModal({ isOpen, onClose, data }: AdminReviewModalProps) {
    const [reason, setReason] = React.useState('')

    if (!data) return null

    const isReject = data.action === 'reject'

    const handleConfirm = () => {
        data.onConfirm(reason)
        onClose()
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={isReject ? "Rejeitar Produto" : "Aprovar Produto"}
            className="max-w-md"
        >
            <div className="p-6">
                <div className="mb-6">
                    <p className="text-white/60 text-sm mb-4">
                        Você está prestes a {isReject ? 'rejeitar' : 'aprovar'} a publicação de <strong className="text-white">{data.productTitle}</strong>.
                    </p>

                    {isReject && (
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/80">Motivo da Rejeição (Obrigatório)</label>
                            <textarea
                                className="w-full h-32 bg-black/20 border border-white/10 rounded-xl p-3 text-white focus:border-red-500/50 outline-none resize-none text-sm placeholder:text-white/20"
                                placeholder="Explique ao vendedor o motivo da rejeição..."
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                            />
                        </div>
                    )}
                </div>

                <div className="flex justify-end gap-3">
                    <Button variant="ghost" onClick={onClose}>Cancelar</Button>
                    <Button
                        variant={isReject ? 'danger' : 'default'}
                        className={isReject ? 'bg-red-500 hover:bg-red-600 border-transparent' : 'bg-green-500 hover:bg-green-600 border-transparent'}
                        onClick={handleConfirm}
                        disabled={isReject && reason.length < 5}
                    >
                        {isReject ? (
                            <>
                                <XCircle className="w-4 h-4 mr-2" />
                                Rejeitar
                            </>
                        ) : (
                            <>
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Aprovar
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </Modal>
    )
}
