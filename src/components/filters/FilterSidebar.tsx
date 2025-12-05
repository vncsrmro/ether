'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { filterOptions } from '@/lib/mock-data'
import {
    ChevronDown,
    X,
    SlidersHorizontal,
    Check
} from 'lucide-react'

export interface FilterState {
    categories: string[]
    resolutions: string[]
    fps: number[]
    codecs: string[]
    priceRange: { min: number; max: number } | null
    exclusive: boolean | null
}

interface FilterSidebarProps {
    filters: FilterState
    onFilterChange: (filters: FilterState) => void
    className?: string
    isMobile?: boolean
    onClose?: () => void
}

interface FilterSectionProps {
    title: string
    children: React.ReactNode
    defaultOpen?: boolean
}

function FilterSection({ title, children, defaultOpen = true }: FilterSectionProps) {
    const [isOpen, setIsOpen] = React.useState(defaultOpen)

    return (
        <div className="border-b border-white/10 pb-4">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full py-2 text-sm font-medium text-white hover:text-cyan-400 transition-colors"
            >
                {title}
                <ChevronDown
                    className={cn(
                        "w-4 h-4 transition-transform",
                        isOpen && "rotate-180"
                    )}
                />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <div className="pt-2 space-y-2">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

interface CheckboxItemProps {
    label: string
    checked: boolean
    onChange: (checked: boolean) => void
}

function CheckboxItem({ label, checked, onChange }: CheckboxItemProps) {
    return (
        <label className="flex items-center gap-3 cursor-pointer group">
            <div
                className={cn(
                    "w-5 h-5 rounded border flex items-center justify-center transition-all",
                    checked
                        ? "bg-gradient-to-r from-cyan-500 to-violet-500 border-transparent"
                        : "border-white/20 hover:border-white/40"
                )}
                onClick={() => onChange(!checked)}
            >
                {checked && <Check className="w-3 h-3 text-white" />}
            </div>
            <span className="text-sm text-white/70 group-hover:text-white transition-colors">
                {label}
            </span>
        </label>
    )
}

export function FilterSidebar({
    filters,
    onFilterChange,
    className,
    isMobile = false,
    onClose
}: FilterSidebarProps) {
    const toggleCategory = (cat: string) => {
        const newCategories = filters.categories.includes(cat)
            ? filters.categories.filter(c => c !== cat)
            : [...filters.categories, cat]
        onFilterChange({ ...filters, categories: newCategories })
    }

    const toggleResolution = (res: string) => {
        const newResolutions = filters.resolutions.includes(res)
            ? filters.resolutions.filter(r => r !== res)
            : [...filters.resolutions, res]
        onFilterChange({ ...filters, resolutions: newResolutions })
    }

    const toggleFps = (fps: number) => {
        const newFps = filters.fps.includes(fps)
            ? filters.fps.filter(f => f !== fps)
            : [...filters.fps, fps]
        onFilterChange({ ...filters, fps: newFps })
    }

    const toggleCodec = (codec: string) => {
        const newCodecs = filters.codecs.includes(codec)
            ? filters.codecs.filter(c => c !== codec)
            : [...filters.codecs, codec]
        onFilterChange({ ...filters, codecs: newCodecs })
    }

    const setPriceRange = (range: { min: number; max: number } | null) => {
        onFilterChange({ ...filters, priceRange: range })
    }

    const clearFilters = () => {
        onFilterChange({
            categories: [],
            resolutions: [],
            fps: [],
            codecs: [],
            priceRange: null,
            exclusive: null
        })
    }

    const activeFiltersCount =
        filters.categories.length +
        filters.resolutions.length +
        filters.fps.length +
        filters.codecs.length +
        (filters.priceRange ? 1 : 0) +
        (filters.exclusive !== null ? 1 : 0)

    const content = (
        <>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <SlidersHorizontal className="w-5 h-5 text-cyan-400" />
                    <h3 className="font-semibold text-white">Filtros</h3>
                    {activeFiltersCount > 0 && (
                        <span className="px-2 py-0.5 text-xs rounded-full bg-cyan-500/20 text-cyan-400">
                            {activeFiltersCount}
                        </span>
                    )}
                </div>
                {isMobile && onClose && (
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                )}
            </div>

            {/* Clear All */}
            {activeFiltersCount > 0 && (
                <button
                    onClick={clearFilters}
                    className="w-full mb-4 py-2 px-4 text-sm text-white/60 hover:text-white border border-white/10 hover:border-white/20 rounded-xl transition-all"
                >
                    Limpar todos os filtros
                </button>
            )}

            {/* Categories */}
            <FilterSection title="Categorias">
                {filterOptions.categories.map(cat => (
                    <CheckboxItem
                        key={cat}
                        label={cat}
                        checked={filters.categories.includes(cat)}
                        onChange={() => toggleCategory(cat)}
                    />
                ))}
            </FilterSection>

            {/* Resolution */}
            <FilterSection title="Resolução">
                {filterOptions.resolutions.map(res => (
                    <CheckboxItem
                        key={res}
                        label={res}
                        checked={filters.resolutions.includes(res)}
                        onChange={() => toggleResolution(res)}
                    />
                ))}
            </FilterSection>

            {/* FPS */}
            <FilterSection title="FPS">
                {filterOptions.fps.map(fps => (
                    <CheckboxItem
                        key={fps}
                        label={`${fps} fps`}
                        checked={filters.fps.includes(fps)}
                        onChange={() => toggleFps(fps)}
                    />
                ))}
            </FilterSection>

            {/* Codec */}
            <FilterSection title="Codec">
                {filterOptions.codecs.map(codec => (
                    <CheckboxItem
                        key={codec}
                        label={codec}
                        checked={filters.codecs.includes(codec)}
                        onChange={() => toggleCodec(codec)}
                    />
                ))}
            </FilterSection>

            {/* Price Range */}
            <FilterSection title="Faixa de Preço">
                {filterOptions.priceRanges.map((range, idx) => (
                    <CheckboxItem
                        key={idx}
                        label={range.label}
                        checked={
                            filters.priceRange?.min === range.min &&
                            filters.priceRange?.max === range.max
                        }
                        onChange={(checked) =>
                            setPriceRange(checked ? { min: range.min, max: range.max } : null)
                        }
                    />
                ))}
            </FilterSection>

            {/* Exclusive Only */}
            <FilterSection title="Especial" defaultOpen={false}>
                <CheckboxItem
                    label="Apenas Exclusivos"
                    checked={filters.exclusive === true}
                    onChange={(checked) =>
                        onFilterChange({ ...filters, exclusive: checked ? true : null })
                    }
                />
            </FilterSection>
        </>
    )

    if (isMobile) {
        return (
            <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                className="fixed inset-y-0 left-0 z-50 w-80 bg-black/95 backdrop-blur-xl border-r border-white/10 p-6 overflow-y-auto"
            >
                {content}
            </motion.div>
        )
    }

    return (
        <aside className={cn(
            "w-64 p-6 rounded-2xl glass",
            className
        )}>
            {content}
        </aside>
    )
}

export function FilterSidebarTrigger({
    onClick,
    activeCount
}: {
    onClick: () => void
    activeCount: number
}) {
    return (
        <button
            onClick={onClick}
            className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-xl glass hover:bg-white/10 transition-colors"
        >
            <SlidersHorizontal className="w-5 h-5" />
            <span>Filtros</span>
            {activeCount > 0 && (
                <span className="px-2 py-0.5 text-xs rounded-full bg-cyan-500/20 text-cyan-400">
                    {activeCount}
                </span>
            )}
        </button>
    )
}
