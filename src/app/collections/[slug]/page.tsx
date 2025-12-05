'use client'

import * as React from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Header, Footer, CartDrawer } from '@/components/layout'
import { ProductCard } from '@/components/ui'
import { mockCollections, mockProducts } from '@/lib/mock-data'
import { ArrowLeft, Layers } from 'lucide-react'

export default function CollectionDetailPage() {
    const params = useParams()
    const slug = params.slug as string

    const collection = mockCollections.find(c => c.slug === slug)
    const products = collection
        ? mockProducts.filter(p => collection.product_ids.includes(p.id))
        : []

    if (!collection) {
        return (
            <>
                <Header />
                <main className="min-h-screen pt-24 pb-16 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-white mb-4">Coleção não encontrada</h1>
                        <Link href="/collections" className="text-cyan-400 hover:underline">
                            ← Voltar para coleções
                        </Link>
                    </div>
                </main>
                <Footer />
            </>
        )
    }

    return (
        <>
            <Header />
            <CartDrawer />

            <main className="min-h-screen pt-24 pb-16">
                {/* Hero */}
                <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
                    <img
                        src={collection.cover_image}
                        alt={collection.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />

                    <div className="absolute inset-0 flex items-end">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <Link
                                    href="/collections"
                                    className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-4 transition-colors"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Voltar para Coleções
                                </Link>

                                {collection.featured && (
                                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-cyan-500 to-violet-500 text-white mb-4 ml-4">
                                        Destaque
                                    </span>
                                )}

                                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                    {collection.title}
                                </h1>
                                <p className="text-white/70 max-w-2xl text-lg">
                                    {collection.description}
                                </p>
                                <div className="flex items-center gap-2 mt-4 text-white/50">
                                    <Layers className="w-5 h-5" />
                                    <span>{products.length} loops nesta coleção</span>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    >
                        {products.map((product, idx) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + idx * 0.05 }}
                            >
                                <Link href={`/product/${product.id}`}>
                                    <ProductCard product={product} />
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>

                    {products.length === 0 && (
                        <div className="text-center py-16">
                            <Layers className="w-16 h-16 mx-auto mb-4 text-white/20" />
                            <h3 className="text-xl font-semibold text-white mb-2">
                                Nenhum produto nesta coleção
                            </h3>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </>
    )
}
