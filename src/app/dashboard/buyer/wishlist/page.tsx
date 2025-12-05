'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { mockWishlist } from '@/lib/mock-user-data'
import { ProductCard } from '@/components/ui'

export default function BuyerWishlistPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Lista de Desejos</h1>
                <p className="text-white/60">Itens que você salvou para comprar depois.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {mockWishlist.map((product, idx) => (
                    <motion.div
                        key={product.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05 }}
                    >
                        <ProductCard product={product} />
                    </motion.div>
                ))}
            </div>

            {mockWishlist.length === 0 && (
                <div className="text-center py-24">
                    <p className="text-white/40 text-lg">Sua lista de desejos está vazia.</p>
                </div>
            )}
        </div>
    )
}
