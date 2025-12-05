'use client'

import React from 'react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { AlertTriangle } from 'lucide-react'

interface ConfirmDetail {
    label: string
    value: string
}

interface ConfirmModalProps {
    isOpen: boolean
    onClose: () => void
    data: {
        title: string
        description: string
        confirmText?: string
        cancelText?: string
        variant?: 'danger' | 'warning' | 'info'
        onConfirm: () => void
        details?: ConfirmDetail[]
    }
}

export function ConfirmModal({ isOpen, onClose, data }: ConfirmModalProps) {
    if (!data) return null

    const handleConfirm = () => {
        data.onConfirm()
        onClose()
    }

    const isDanger = data.variant === 'danger'

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-md">
            <div className="p-6 text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ${isDanger ? 'bg-red-500/10 text-red-500' : 'bg-yellow-500/10 text-yellow-500'
                    }`}>
                    <AlertTriangle className="w-8 h-8" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-2">{data.title}</h3>
                <p className="text-white/60 mb-6 leading-relaxed">{data.description}</p>

                {data.details && (
                    <div className="bg-white/5 rounded-xl p-4 mb-6 text-left space-y-2">
                        {data.details.map((detail, idx) => (
                            <div key={idx} className="flex justify-between text-sm">
                                <span className="text-white/40">{detail.label}</span>
                                <span className="text-white font-medium truncate ml-4">{detail.value}</span>
                            </div>
                        ))}
                    </div>
                )}

                <div className="flex gap-3">
                    <Button variant="outline" className="flex-1" onClick={onClose}>
                        {data.cancelText || 'Cancelar'}
                    </Button>
                    <Button
                        variant={isDanger ? 'danger' : 'default'}
                        className={`flex-1 ${isDanger ? 'bg-red-500 hover:bg-red-600 border-transparent text-white' : ''}`}
                        onClick={handleConfirm}
                    >
                        {data.confirmText || 'Confirmar'}
                    </Button>
                </div>
            </div>
        </Modal>
    )
}
