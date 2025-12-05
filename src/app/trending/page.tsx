'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Header, Footer, CartDrawer } from '@/components/layout'
import { ProductCard } from '@/components/ui'
import { mockProducts, mockVendors, vendorStats } from '@/lib/mock-data'
import { Flame, Clock, Calendar, Trophy, TrendingUp, Star } from 'lucide-react'
import { cn } from '@/lib/utils'

type TimeFilter = 'today' | 'week' | 'month' | 'all'

export default function TrendingPage() {
    const t = useTranslations()
    const [timeFilter, setTimeFilter] = React.useState<TimeFilter>('week')

    // Sort products by "popularity" (mock - using exclusivity and date)
    const trendingProducts = React.useMemo(() => {
        const now = new Date()
        const filterDate = {
            today: new Date(now.setHours(0, 0, 0, 0)),
            week: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
            month: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
            all: new Date(0)
        }[timeFilter]

        return [...mockProducts]
            .filter(p => new Date(p.created_at) >= filterDate)
            .sort((a, b) => {
                // Prioritize exclusive products
                if (a.is_exclusive && !b.is_exclusive) return -1
                if (!a.is_exclusive && b.is_exclusive) return 1
                // Then by date
                return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
            })
    }, [timeFilter])

    // Top sellers
    const topSellers = React.useMemo(() => {
        return [...mockVendors]
            .map(v => ({
                ...v,
                stats: vendorStats[v.id] || { products: 0, sales: 0, rating: 0 }
            }))
            .sort((a, b) => b.stats.sales - a.stats.sales)
            .slice(0, 6)
    }, [])

    const timeFilters: { value: TimeFilter; label: string; icon: React.ReactNode }[] = [
        { value: 'today', label: 'Hoje', icon: <Clock className="w-4 h-4" /> },
        { value: 'week', label: 'Esta Semana', icon: <Calendar className="w-4 h-4" /> },
        { value: 'month', label: 'Este Mês', icon: <Calendar className="w-4 h-4" /> },
        { value: 'all', label: 'Todos', icon: <Flame className="w-4 h-4" /> }
    ]

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
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 mb-6">
                            <Flame className="w-5 h-5 text-orange-400" />
                            <span className="text-orange-400 font-medium">{t('nav.trending')}</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Em Alta <span className="text-gradient">Agora</span>
                        </h1>
                        <p className="text-white/60 max-w-2xl mx-auto">
                            Os loops mais populares e baixados do momento. Veja o que os artistas visuais estão usando.
                        </p>
                    </motion.div>

                    {/* Time Filter Tabs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="flex justify-center gap-2 mb-12"
                    >
                        {timeFilters.map(filter => (
                            <button
                                key={filter.value}
                                onClick={() => setTimeFilter(filter.value)}
                                className={cn(
                                    "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all",
                                    timeFilter === filter.value
                                        ? "bg-gradient-to-r from-cyan-500 to-violet-500 text-white shadow-lg shadow-cyan-500/25"
                                        : "glass text-white/60 hover:text-white hover:bg-white/10"
                                )}
                            >
                                {filter.icon}
                                <span className="hidden sm:inline">{filter.label}</span>
                            </button>
                        ))}
                    </motion.div>

                    {/* Top Sellers Section */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-16"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <Trophy className="w-6 h-6 text-yellow-400" />
                            <h2 className="text-2xl font-bold text-white">Top Artistas</h2>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                            {topSellers.map((seller, idx) => (
                                <Link key={seller.id} href={`/vendors/${seller.id}`}>
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.3 + idx * 0.05 }}
                                        className="group relative p-4 rounded-2xl glass text-center hover:bg-white/10 transition-all"
                                    >
                                        {/* Rank Badge */}
                                        <div className={cn(
                                            "absolute -top-2 -left-2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                                            idx === 0 && "bg-gradient-to-r from-yellow-400 to-orange-400 text-black",
                                            idx === 1 && "bg-gradient-to-r from-gray-300 to-gray-400 text-black",
                                            idx === 2 && "bg-gradient-to-r from-amber-600 to-amber-700 text-white",
                                            idx > 2 && "bg-white/10 text-white/60"
                                        )}>
                                            {idx + 1}
                                        </div>

                                        <div className="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden ring-2 ring-white/10 group-hover:ring-cyan-500/50 transition-all">
                                            {seller.avatar_url ? (
                                                <img
                                                    src={seller.avatar_url}
                                                    alt={seller.brand_name || ''}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center text-xl font-bold">
                                                    {(seller.brand_name || 'V')[0]}
                                                </div>
                                            )}
                                        </div>
                                        <h3 className="text-sm font-medium text-white truncate group-hover:text-cyan-400 transition-colors">
                                            {seller.brand_name}
                                        </h3>
                                        <div className="flex items-center justify-center gap-1 text-xs text-yellow-400 mt-1">
                                            <Star className="w-3 h-3 fill-current" />
                                            <span>{seller.stats.rating}</span>
                                        </div>
                                        <p className="text-xs text-white/50 mt-1">
                                            {seller.stats.sales} vendas
                                        </p>
                                    </motion.div>
                                </Link>
                            ))}
                        </div>
                    </motion.section>

                    {/* Trending Products */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <TrendingUp className="w-6 h-6 text-cyan-400" />
                            <h2 className="text-2xl font-bold text-white">Produtos em Alta</h2>
                            <span className="text-white/40 text-sm">
                                {trendingProducts.length} resultados
                            </span>
                        </div>

                        {trendingProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {trendingProducts.map((product, idx) => (
                                    <motion.div
                                        key={product.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 + idx * 0.05 }}
                                        className="relative"
                                    >
                                        {/* Rank Number */}
                                        <div className="absolute -top-3 -left-3 z-10 w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 flex items-center justify-center text-sm font-bold text-white shadow-lg">
                                            #{idx + 1}
                                        </div>
                                        <Link href={`/product/${product.id}`}>
                                            <ProductCard product={product} />
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <Flame className="w-16 h-16 mx-auto mb-4 text-white/20" />
                                <h3 className="text-xl font-semibold text-white mb-2">
                                    Nenhum produto encontrado
                                </h3>
                                <p className="text-white/60">
                                    Não há produtos em alta para este período
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
