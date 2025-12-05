'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Search, X, Clock, TrendingUp } from 'lucide-react'

interface SearchBarProps {
    value: string
    onChange: (value: string) => void
    placeholder?: string
    className?: string
    suggestions?: string[]
    recentSearches?: string[]
    onSearch?: (query: string) => void
}

export function SearchBar({
    value,
    onChange,
    placeholder = 'Pesquisar loops...',
    className,
    suggestions = [],
    recentSearches = [],
    onSearch
}: SearchBarProps) {
    const [isFocused, setIsFocused] = React.useState(false)
    const [showDropdown, setShowDropdown] = React.useState(false)
    const inputRef = React.useRef<HTMLInputElement>(null)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (value.trim() && onSearch) {
            onSearch(value.trim())
            setShowDropdown(false)
        }
    }

    const handleSuggestionClick = (suggestion: string) => {
        onChange(suggestion)
        if (onSearch) onSearch(suggestion)
        setShowDropdown(false)
    }

    const handleClear = () => {
        onChange('')
        inputRef.current?.focus()
    }

    const filteredSuggestions = suggestions.filter(s =>
        s.toLowerCase().includes(value.toLowerCase())
    )

    return (
        <div className={cn("relative", className)}>
            <form onSubmit={handleSubmit}>
                <div
                    className={cn(
                        "relative flex items-center rounded-2xl transition-all duration-300",
                        "bg-white/5 border",
                        isFocused
                            ? "border-cyan-500/50 shadow-[0_0_20px_rgba(0,240,255,0.15)]"
                            : "border-white/10 hover:border-white/20"
                    )}
                >
                    <Search className="absolute left-4 w-5 h-5 text-white/40" />
                    <input
                        ref={inputRef}
                        type="text"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        onFocus={() => {
                            setIsFocused(true)
                            setShowDropdown(true)
                        }}
                        onBlur={() => {
                            setIsFocused(false)
                            // Delay to allow click on suggestions
                            setTimeout(() => setShowDropdown(false), 200)
                        }}
                        placeholder={placeholder}
                        className={cn(
                            "w-full py-3 pl-12 pr-12 bg-transparent text-white placeholder:text-white/40",
                            "focus:outline-none text-sm"
                        )}
                    />
                    {value && (
                        <button
                            type="button"
                            onClick={handleClear}
                            className="absolute right-4 p-1 hover:bg-white/10 rounded-full transition-colors"
                        >
                            <X className="w-4 h-4 text-white/40" />
                        </button>
                    )}
                </div>
            </form>

            {/* Dropdown */}
            <AnimatePresence>
                {showDropdown && (filteredSuggestions.length > 0 || recentSearches.length > 0) && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 mt-2 rounded-2xl glass overflow-hidden z-50"
                    >
                        {/* Recent Searches */}
                        {recentSearches.length > 0 && !value && (
                            <div className="p-3 border-b border-white/10">
                                <div className="flex items-center gap-2 px-2 mb-2 text-xs text-white/50">
                                    <Clock className="w-3 h-3" />
                                    <span>Pesquisas Recentes</span>
                                </div>
                                {recentSearches.slice(0, 3).map((search, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleSuggestionClick(search)}
                                        className="w-full px-3 py-2 text-sm text-left text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                                    >
                                        {search}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Suggestions */}
                        {filteredSuggestions.length > 0 && (
                            <div className="p-3">
                                <div className="flex items-center gap-2 px-2 mb-2 text-xs text-white/50">
                                    <TrendingUp className="w-3 h-3" />
                                    <span>Sugestões</span>
                                </div>
                                {filteredSuggestions.slice(0, 5).map((suggestion, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleSuggestionClick(suggestion)}
                                        className="w-full px-3 py-2 text-sm text-left text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                                    >
                                        {suggestion}
                                    </button>
                                ))}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
