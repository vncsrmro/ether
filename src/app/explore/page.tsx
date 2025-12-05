'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Header, Footer, CartDrawer } from '@/components/layout'
import { ProductCard } from '@/components/ui'
import { FilterSidebar, FilterSidebarTrigger, SearchBar, type FilterState } from '@/components/filters'
import { mockProducts, filterOptions } from '@/lib/mock-data'
import { Grid3X3, LayoutGrid, ArrowUpDown, X } from 'lucide-react'
import { cn } from '@/lib/utils'

type SortOption = 'newest' | 'popular' | 'price-low' | 'price-high'

export default function ExplorePage() {
    const t = useTranslations()
    const [searchQuery, setSearchQuery] = React.useState('')
    const [filters, setFilters] = React.useState<FilterState>({
        categories: [],
        resolutions: [],
        fps: [],
        codecs: [],
        priceRange: null,
        exclusive: null
    })
    const [sortBy, setSortBy] = React.useState<SortOption>('newest')
    const [viewMode, setViewMode] = React.useState<'grid' | 'large'>('grid')
    const [isMobileFilterOpen, setMobileFilterOpen] = React.useState(false)

    // Filter and sort products
    const filteredProducts = React.useMemo(() => {
        let result = [...mockProducts]

        // Search
        if (searchQuery) {
            const query = searchQuery.toLowerCase()
            result = result.filter(p =>
                p.title.toLowerCase().includes(query) ||
                p.tags.some(tag => tag.toLowerCase().includes(query))
            )
        }

        // Categories (tags)
        if (filters.categories.length > 0) {
            result = result.filter(p =>
                p.tags.some(tag =>
                    filters.categories.some(cat =>
                        tag.toLowerCase().includes(cat.toLowerCase())
                    )
                )
            )
        }

        // Resolution
        if (filters.resolutions.length > 0) {
            result = result.filter(p => filters.resolutions.includes(p.resolution))
        }

        // FPS
        if (filters.fps.length > 0) {
            result = result.filter(p => filters.fps.includes(p.fps))
        }

        // Codec
        if (filters.codecs.length > 0) {
            result = result.filter(p => filters.codecs.includes(p.codec))
        }

        // Price Range
        if (filters.priceRange) {
            result = result.filter(p =>
                p.price >= filters.priceRange!.min &&
                p.price <= filters.priceRange!.max
            )
        }

        // Exclusive
        if (filters.exclusive === true) {
            result = result.filter(p => p.is_exclusive)
        }

        // Sort
        switch (sortBy) {
            case 'newest':
                result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                break
            case 'popular':
                // Mock popularity - would use actual views/sales in production
                result.sort((a, b) => (b.is_exclusive ? 1 : 0) - (a.is_exclusive ? 1 : 0))
                break
            case 'price-low':
                result.sort((a, b) => a.price - b.price)
                break
            case 'price-high':
                result.sort((a, b) => b.price - a.price)
                break
        }

        return result
    }, [searchQuery, filters, sortBy])

    const activeFiltersCount =
        filters.categories.length +
        filters.resolutions.length +
        filters.fps.length +
        filters.codecs.length +
        (filters.priceRange ? 1 : 0) +
        (filters.exclusive !== null ? 1 : 0)

    const sortOptions: { value: SortOption; label: string }[] = [
        { value: 'newest', label: 'Mais Recentes' },
        { value: 'popular', label: 'Mais Populares' },
        { value: 'price-low', label: 'Menor Preço' },
        { value: 'price-high', label: 'Maior Preço' },
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
                        className="mb-8"
                    >
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                            {t('nav.explore')}
                        </h1>
                        <p className="text-white/60">
                            Descubra nossa biblioteca completa de loops de VJ premium
                        </p>
                    </motion.div>

                    {/* Search & Controls Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="flex flex-col lg:flex-row gap-4 mb-8"
                    >
                        <SearchBar
                            value={searchQuery}
                            onChange={setSearchQuery}
                            className="flex-1"
                            suggestions={filterOptions.categories}
                            recentSearches={['neon', 'abstract', 'particles']}
                        />

                        <div className="flex items-center gap-3">
                            {/* Mobile Filter Trigger */}
                            <FilterSidebarTrigger
                                onClick={() => setMobileFilterOpen(true)}
                                activeCount={activeFiltersCount}
                            />

                            {/* Sort Dropdown */}
                            <div className="relative group">
                                <button className="flex items-center gap-2 px-4 py-3 rounded-xl glass hover:bg-white/10 transition-colors text-sm">
                                    <ArrowUpDown className="w-4 h-4" />
                                    <span className="hidden sm:inline">
                                        {sortOptions.find(o => o.value === sortBy)?.label}
                                    </span>
                                </button>
                                <div className="absolute right-0 top-full mt-2 w-48 py-2 rounded-xl glass opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                                    {sortOptions.map(option => (
                                        <button
                                            key={option.value}
                                            onClick={() => setSortBy(option.value)}
                                            className={cn(
                                                "w-full px-4 py-2 text-sm text-left transition-colors",
                                                sortBy === option.value
                                                    ? "text-cyan-400 bg-cyan-500/10"
                                                    : "text-white/70 hover:text-white hover:bg-white/5"
                                            )}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* View Mode Toggle */}
                            <div className="hidden sm:flex items-center gap-1 p-1 rounded-xl glass">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={cn(
                                        "p-2 rounded-lg transition-colors",
                                        viewMode === 'grid'
                                            ? "bg-white/10 text-cyan-400"
                                            : "text-white/50 hover:text-white"
                                    )}
                                >
                                    <Grid3X3 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setViewMode('large')}
                                    className={cn(
                                        "p-2 rounded-lg transition-colors",
                                        viewMode === 'large'
                                            ? "bg-white/10 text-cyan-400"
                                            : "text-white/50 hover:text-white"
                                    )}
                                >
                                    <LayoutGrid className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Active Filters Tags */}
                    {activeFiltersCount > 0 && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="flex flex-wrap gap-2 mb-6"
                        >
                            {filters.categories.map(cat => (
                                <span
                                    key={cat}
                                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-cyan-500/20 text-cyan-400"
                                >
                                    {cat}
                                    <button
                                        onClick={() => setFilters({
                                            ...filters,
                                            categories: filters.categories.filter(c => c !== cat)
                                        })}
                                        className="hover:text-white"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </span>
                            ))}
                            {filters.resolutions.map(res => (
                                <span
                                    key={res}
                                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-violet-500/20 text-violet-400"
                                >
                                    {res}
                                    <button
                                        onClick={() => setFilters({
                                            ...filters,
                                            resolutions: filters.resolutions.filter(r => r !== res)
                                        })}
                                        className="hover:text-white"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </span>
                            ))}
                        </motion.div>
                    )}

                    {/* Main Content */}
                    <div className="flex gap-8">
                        {/* Desktop Sidebar */}
                        <div className="hidden lg:block">
                            <FilterSidebar
                                filters={filters}
                                onFilterChange={setFilters}
                                className="sticky top-28"
                            />
                        </div>

                        {/* Product Grid */}
                        <div className="flex-1">
                            {filteredProducts.length > 0 ? (
                                <>
                                    <p className="text-sm text-white/50 mb-4">
                                        {filteredProducts.length} {filteredProducts.length === 1 ? 'resultado' : 'resultados'}
                                    </p>
                                    <div className={cn(
                                        "grid gap-6",
                                        viewMode === 'grid'
                                            ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                                            : "grid-cols-1 sm:grid-cols-2"
                                    )}>
                                        {filteredProducts.map((product, idx) => (
                                            <motion.div
                                                key={product.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: idx * 0.05 }}
                                            >
                                                <Link href={`/product/${product.id}`}>
                                                    <ProductCard product={product} />
                                                </Link>
                                            </motion.div>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-center py-16"
                                >
                                    <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
                                        <Grid3X3 className="w-10 h-10 text-white/30" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-white mb-2">
                                        Nenhum resultado encontrado
                                    </h3>
                                    <p className="text-white/60 mb-6">
                                        Tente ajustar seus filtros ou buscar por outro termo
                                    </p>
                                    <button
                                        onClick={() => {
                                            setSearchQuery('')
                                            setFilters({
                                                categories: [],
                                                resolutions: [],
                                                fps: [],
                                                codecs: [],
                                                priceRange: null,
                                                exclusive: null
                                            })
                                        }}
                                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-medium hover:opacity-90 transition-opacity"
                                    >
                                        Limpar Filtros
                                    </button>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />

            {/* Mobile Filter Drawer */}
            <AnimatePresence>
                {isMobileFilterOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                            onClick={() => setMobileFilterOpen(false)}
                        />
                        <FilterSidebar
                            filters={filters}
                            onFilterChange={setFilters}
                            isMobile
                            onClose={() => setMobileFilterOpen(false)}
                        />
                    </>
                )}
            </AnimatePresence>
        </>
    )
}
