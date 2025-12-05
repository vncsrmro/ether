'use client'

import * as React from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Header, Footer, CartDrawer } from '@/components/layout'
import { ProductCard } from '@/components/ui'
import { mockVendors, mockProducts, vendorStats } from '@/lib/mock-data'
import { ArrowLeft, Star, Package, TrendingUp, Calendar, Mail, ExternalLink } from 'lucide-react'

export default function VendorDetailPage() {
    const params = useParams()
    const vendorId = params.id as string

    const vendor = mockVendors.find(v => v.id === vendorId)
    const stats = vendor ? vendorStats[vendor.id] : null
    const products = mockProducts.filter(p => p.vendor_id === vendorId)

    if (!vendor) {
        return (
            <>
                <Header />
                <main className="min-h-screen pt-24 pb-16 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-white mb-4">Artista não encontrado</h1>
                        <Link href="/vendors" className="text-cyan-400 hover:underline">
                            ← Voltar para artistas
                        </Link>
                    </div>
                </main>
                <Footer />
            </>
        )
    }

    const joinDate = new Date(vendor.created_at).toLocaleDateString('pt-BR', {
        month: 'long',
        year: 'numeric'
    })

    return (
        <>
            <Header />
            <CartDrawer />

            <main className="min-h-screen pt-24 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Back Link */}
                    <Link
                        href="/vendors"
                        className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Voltar para Artistas
                    </Link>

                    {/* Vendor Profile Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col md:flex-row gap-8 mb-12"
                    >
                        {/* Avatar */}
                        <div className="flex-shrink-0">
                            <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden ring-4 ring-white/10">
                                {vendor.avatar_url ? (
                                    <img
                                        src={vendor.avatar_url}
                                        alt={vendor.brand_name || ''}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center text-5xl font-bold">
                                        {(vendor.brand_name || 'V')[0]}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Info */}
                        <div className="flex-1">
                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                                {vendor.brand_name}
                            </h1>

                            <div className="flex flex-wrap items-center gap-4 mb-4 text-white/60">
                                <div className="flex items-center gap-1 text-yellow-400">
                                    <Star className="w-5 h-5 fill-current" />
                                    <span className="font-semibold">{stats?.rating || 0}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>Membro desde {joinDate}</span>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-4 max-w-md">
                                <div className="p-4 rounded-xl glass text-center">
                                    <Package className="w-5 h-5 mx-auto mb-2 text-cyan-400" />
                                    <p className="text-xl font-bold text-white">{stats?.products || 0}</p>
                                    <p className="text-xs text-white/50">Produtos</p>
                                </div>
                                <div className="p-4 rounded-xl glass text-center">
                                    <TrendingUp className="w-5 h-5 mx-auto mb-2 text-violet-400" />
                                    <p className="text-xl font-bold text-white">{stats?.sales || 0}</p>
                                    <p className="text-xs text-white/50">Vendas</p>
                                </div>
                                <div className="p-4 rounded-xl glass text-center">
                                    <Star className="w-5 h-5 mx-auto mb-2 text-yellow-400" />
                                    <p className="text-xl font-bold text-white">{stats?.rating || 0}</p>
                                    <p className="text-xs text-white/50">Avaliação</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Products Section */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-white">
                                Produtos de {vendor.brand_name}
                            </h2>
                            <span className="text-white/50">
                                {products.length} {products.length === 1 ? 'produto' : 'produtos'}
                            </span>
                        </div>

                        {products.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                            </div>
                        ) : (
                            <div className="text-center py-16 rounded-2xl glass">
                                <Package className="w-16 h-16 mx-auto mb-4 text-white/20" />
                                <h3 className="text-xl font-semibold text-white mb-2">
                                    Nenhum produto ainda
                                </h3>
                                <p className="text-white/60">
                                    Este artista ainda não publicou nenhum produto
                                </p>
                            </div>
                        )}
                    </motion.section>
                </div>
            </main>

            <Footer />
        </>
    )
}
