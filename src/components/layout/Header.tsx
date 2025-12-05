'use client'

import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { useUIStore, useCartStore } from '@/store'
import { Button } from '@/components/ui/Button'
import {
    Search,
    ShoppingCart,
    Menu,
    X,
    Globe,
    User
} from 'lucide-react'
import { cn } from '@/lib/utils'

export function Header() {
    const t = useTranslations()
    const {
        isMobileMenuOpen,
        setMobileMenuOpen,
        locale,
        setLocale,
        toggleCart
    } = useUIStore()
    const cartItemCount = useCartStore((state) => state.getItemCount())

    const navLinks = [
        { href: '/explore', label: t('nav.explore') },
        { href: '/trending', label: t('nav.trending') },
        { href: '/collections', label: t('nav.collections') },
        { href: '/vendors', label: t('nav.vendors') },
    ]

    const toggleLocale = () => {
        setLocale(locale === 'pt-BR' ? 'en' : 'pt-BR')
        // Force page reload to update translations
        window.location.reload()
    }

    return (
        <header className="fixed top-0 left-0 right-0 z-50">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-xl border-b border-white/[0.06]" />

            <nav className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative w-10 h-10 rounded-xl overflow-hidden holo-hover">
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-violet-500 to-silver opacity-80 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute inset-[2px] bg-black rounded-lg flex items-center justify-center">
                                <span className="text-lg font-bold holographic-text">E</span>
                            </div>
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white hidden sm:block group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-violet-500 transition-all duration-300">
                            ETHER
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm font-medium text-white/60 hover:text-white transition-colors relative group"
                            >
                                {link.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-cyan-500 to-violet-500 group-hover:w-full transition-all duration-300" />
                            </Link>
                        ))}
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-3">
                        {/* Search */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="hidden sm:flex text-white/60 hover:text-white"
                        >
                            <Search className="w-5 h-5" />
                        </Button>

                        {/* Language Toggle */}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleLocale}
                            className="text-white/60 hover:text-white"
                        >
                            <Globe className="w-5 h-5" />
                        </Button>

                        {/* Cart */}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleCart}
                            className="relative text-white/60 hover:text-white"
                        >
                            <ShoppingCart className="w-5 h-5" />
                            {cartItemCount > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 text-[10px] font-bold flex items-center justify-center"
                                >
                                    {cartItemCount}
                                </motion.span>
                            )}
                        </Button>

                        {/* User */}
                        <Link href="/login">
                            <Button
                                variant="secondary"
                                size="sm"
                                className="hidden sm:flex"
                            >
                                <User className="w-4 h-4" />
                                <span>{t('auth.login')}</span>
                            </Button>
                        </Link>

                        {/* Mobile Menu Toggle */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="lg:hidden text-white/60 hover:text-white"
                            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-5 h-5" />
                            ) : (
                                <Menu className="w-5 h-5" />
                            )}
                        </Button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="lg:hidden overflow-hidden"
                        >
                            <div className="py-4 space-y-2 border-t border-white/[0.06]">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className="block py-3 px-4 text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                                <div className="pt-4 px-4">
                                    <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                                        <Button variant="default" className="w-full">
                                            {t('auth.login')}
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </header>
    )
}
