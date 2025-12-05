'use client'

import React from 'react'
import { CollectionEditor } from '@/components/vendor/CollectionEditor'

export default function NewCollectionPage() {
    return (
        <div className="space-y-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-white mb-2">Criar Coleção</h1>
                <p className="text-white/60 mb-8">Curadoria de produtos para ofertas especiais.</p>
                <CollectionEditor />
            </div>
        </div>
    )
}
