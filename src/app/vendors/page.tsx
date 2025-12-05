'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Header, Footer, CartDrawer } from '@/components/layout'
import { VendorCard } from '@/components/ui'
import { SearchBar } from '@/components/filters'
import { mockVendors, vendorStats } from '@/lib/mock-data'
import { Users, Search, Star, TrendingUp, Package } from 'lucide-react'
import { cn } from '@/lib/utils'

type SortOption = 'popular' | 'rating' | 'products' | 'newest'

export default function VendorsPage() {
    const t = useTranslations()
    const [searchQuery, setSearchQuery] = React.useState('')
    const [sortBy, setSortBy] = React.useState<SortOption>('popular')

    const filteredVendors = React.useMemo(() => {
        let result = [...mockVendors]

        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase()
            result = result.filter(v =>
                v.brand_name?.toLowerCase().includes(query) ||
                v.email.toLowerCase().includes(query)
            )
        }

        // Sort
        switch (sortBy) {
            case 'popular':
                result.sort((a, b) =>
                    (vendorStats[b.id]?.sales || 0) - (vendorStats[a.id]?.sales || 0)
                )
                break
            case 'rating':
                result.sort((a, b) =>
                    (vendorStats[b.id]?.rating || 0) - (vendorStats[a.id]?.rating || 0)
                )
                break
            case 'products':
                result.sort((a, b) =>
                    (vendorStats[b.id]?.products || 0) - (vendorStats[a.id]?.products || 0)
                )
                break
            case 'newest':
                result.sort((a, b) =>
                    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
                )
                break
        }

        return result
    }, [searchQuery, sortBy])

    const sortOptions: { value: SortOption; label: string; icon: React.ReactNode }[] = [
        { value: 'popular', label: 'Mais Populares', icon: <TrendingUp className="w-4 h-4" /> },
        { value: 'rating', label: 'Melhor Avaliados', icon: <Star className="w-4 h-4" /> },
        { value: 'products', label: 'Mais Produtos', icon: <Package className="w-4 h-4" /> },
        { value: 'newest', label: 'Mais Recentes', icon: <Users className="w-4 h-4" /> }
    ]

    // Stats
    const totalSellers = mockVendors.length
    const totalProducts = Object.values(vendorStats).reduce((acc, s) => acc + s.products, 0)
    const totalSales = Object.values(vendorStats).reduce((acc, s) => acc + s.sales, 0)

    return (
        <>
            <Header />
            <CartDrawer />

            <main className="min-h-screen pt-24 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Page Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 mb-6">
                            <Users className="w-5 h-5 text-cyan-400" />
                            <span className="text-cyan-400 font-medium">{t('nav.vendors')}</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Nossos <span className="text-gradient">Artistas</span>
                        </h1>
                        <p className="text-white/60 max-w-2xl mx-auto">
                            Conheça os talentosos motion designers por trás dos loops mais incríveis do marketplace.
                        </p>
                    </motion.div>

                    {/* Stats Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="grid grid-cols-3 gap-4 mb-12"
                    >
                        <div className="text-center p-6 rounded-2xl glass">
                            <p className="text-3xl font-bold text-gradient mb-1">{totalSellers}</p>
                            <p className="text-sm text-white/50">Artistas</p>
                        </div>
                        <div className="text-center p-6 rounded-2xl glass">
                            <p className="text-3xl font-bold text-gradient mb-1">{totalProducts}</p>
                            <p className="text-sm text-white/50">Produtos</p>
                        </div>
                        <div className="text-center p-6 rounded-2xl glass">
                            <p className="text-3xl font-bold text-gradient mb-1">{totalSales.toLocaleString()}</p>
                            <p className="text-sm text-white/50">Vendas</p>
                        </div>
                    </motion.div>

                    {/* Search & Sort */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col sm:flex-row gap-4 mb-8"
                    >
                        <SearchBar
                            value={searchQuery}
                            onChange={setSearchQuery}
                            placeholder="Buscar artistas..."
                            className="flex-1"
                        />

                        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
                            {sortOptions.map(option => (
                                <button
                                    key={option.value}
                                    onClick={() => setSortBy(option.value)}
                                    className={cn(
                                        "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all",
                                        sortBy === option.value
                                            ? "bg-gradient-to-r from-cyan-500 to-violet-500 text-white"
                                            : "glass text-white/60 hover:text-white hover:bg-white/10"
                                    )}
                                >
                                    {option.icon}
                                    <span className="hidden md:inline">{option.label}</span>
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Vendors Grid */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        {filteredVendors.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredVendors.map((vendor, idx) => (
                                    <motion.div
                                        key={vendor.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 + idx * 0.05 }}
                                    >
                                        <VendorCard vendor={vendor} />
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <Search className="w-16 h-16 mx-auto mb-4 text-white/20" />
                                <h3 className="text-xl font-semibold text-white mb-2">
                                    Nenhum artista encontrado
                                </h3>
                                <p className="text-white/60">
                                    Tente buscar por outro nome
                                </p>
                            </div>
                        )}
                    </motion.div>
                </div>
            </main>

            <Footer />
        </>
    )
}
