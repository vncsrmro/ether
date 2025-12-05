'use client'

import React from 'react'
import { UploadForm } from '@/components/vendor/UploadForm'

export default function NewProductPage() {
    return (
        <div className="space-y-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold text-white mb-2">Novo Produto</h1>
                <p className="text-white/60 mb-8">Adicione um novo loop ao catálogo global da ETHER.</p>
                <UploadForm />
            </div>
        </div>
    )
}
