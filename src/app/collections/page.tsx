'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Header, Footer, CartDrawer } from '@/components/layout'
import { CollectionCard } from '@/components/ui'
import { mockCollections } from '@/lib/mock-data'
import { Layers, Sparkles, Grid3X3 } from 'lucide-react'
import { cn } from '@/lib/utils'

type CollectionFilter = 'all' | 'featured' | 'new'

export default function CollectionsPage() {
    const t = useTranslations()
    const [filter, setFilter] = React.useState<CollectionFilter>('all')

    const filteredCollections = React.useMemo(() => {
        switch (filter) {
            case 'featured':
                return mockCollections.filter(c => c.featured)
            case 'new':
                return [...mockCollections].sort((a, b) =>
                    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
                ).slice(0, 4)
            default:
                return mockCollections
        }
    }, [filter])

    const filters: { value: CollectionFilter; label: string; icon: React.ReactNode }[] = [
        { value: 'all', label: 'Todas', icon: <Grid3X3 className="w-4 h-4" /> },
        { value: 'featured', label: 'Destaques', icon: <Sparkles className="w-4 h-4" /> },
        { value: 'new', label: 'Recentes', icon: <Layers className="w-4 h-4" /> }
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
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-500/20 to-purple-500/20 border border-violet-500/30 mb-6">
                            <Layers className="w-5 h-5 text-violet-400" />
                            <span className="text-violet-400 font-medium">{t('nav.collections')}</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Coleções <span className="text-gradient">Curadas</span>
                        </h1>
                        <p className="text-white/60 max-w-2xl mx-auto">
                            Conjuntos temáticos organizados pela nossa equipe para facilitar sua busca pelo visual perfeito.
                        </p>
                    </motion.div>

                    {/* Filter Tabs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="flex justify-center gap-2 mb-12"
                    >
                        {filters.map(f => (
                            <button
                                key={f.value}
                                onClick={() => setFilter(f.value)}
                                className={cn(
                                    "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all",
                                    filter === f.value
                                        ? "bg-gradient-to-r from-cyan-500 to-violet-500 text-white shadow-lg shadow-cyan-500/25"
                                        : "glass text-white/60 hover:text-white hover:bg-white/10"
                                )}
                            >
                                {f.icon}
                                <span>{f.label}</span>
                            </button>
                        ))}
                    </motion.div>

                    {/* Featured Collection Hero (if showing all) */}
                    {filter === 'all' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="mb-12"
                        >
                            <Link href={`/collections/${mockCollections[0].slug}`}>
                                <div className="group relative rounded-3xl overflow-hidden aspect-[21/9]">
                                    <img
                                        src={mockCollections[0].cover_image}
                                        alt={mockCollections[0].title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-cyan-500 to-violet-500 text-white mb-4">
                                            <Sparkles className="w-3 h-3" />
                                            Coleção em Destaque
                                        </span>
                                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                                            {mockCollections[0].title}
                                        </h2>
                                        <p className="text-white/70 max-w-xl">
                                            {mockCollections[0].description}
                                        </p>
                                        <div className="flex items-center gap-2 mt-4 text-white/50">
                                            <Layers className="w-4 h-4" />
                                            <span>{mockCollections[0].product_ids.length} loops</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    )}

                    {/* Collections Grid */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredCollections.map((collection, idx) => (
                                <motion.div
                                    key={collection.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 + idx * 0.05 }}
                                >
                                    <CollectionCard collection={collection} />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Empty State */}
                    {filteredCollections.length === 0 && (
                        <div className="text-center py-16">
                            <Layers className="w-16 h-16 mx-auto mb-4 text-white/20" />
                            <h3 className="text-xl font-semibold text-white mb-2">
                                Nenhuma coleção encontrada
                            </h3>
                            <p className="text-white/60">
                                Não há coleções disponíveis com este filtro
                            </p>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </>
    )
}
