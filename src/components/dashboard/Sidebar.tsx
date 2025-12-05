'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import {
    LayoutDashboard,
    Package,
    Upload,
    BarChart3,
    Wallet,
    Settings,
    Users,
    ShoppingCart,
    FileCheck,
    Menu,
    X,
    LogOut,
    ChevronRight,
    Globe,
} from 'lucide-react'
import type { Profile } from '@/types'

interface DashboardSidebarProps {
    profile: Profile
}

export function DashboardSidebar({ profile }: DashboardSidebarProps) {
    const t = useTranslations()
    const pathname = usePathname()
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [isMobileOpen, setIsMobileOpen] = useState(false)

    const isAdmin = profile.role === 'admin'
    const isVendor = profile.role === 'vendor'

    const vendorLinks = [
        { href: '/dashboard', icon: LayoutDashboard, label: t('dashboard.overview') },
        { href: '/dashboard/products', icon: Package, label: t('admin.products') },
        { href: '/dashboard/upload', icon: Upload, label: t('dashboard.uploads') },
        { href: '/dashboard/analytics', icon: BarChart3, label: t('dashboard.analytics') },
        { href: '/dashboard/payouts', icon: Wallet, label: t('dashboard.payouts') },
        { href: '/dashboard/settings', icon: Settings, label: t('dashboard.settings') },
    ]

    const adminLinks = [
        { href: '/dashboard', icon: LayoutDashboard, label: t('dashboard.overview') },
        { href: '/dashboard/review', icon: FileCheck, label: t('admin.reviewQueue') },
        { href: '/dashboard/products', icon: Package, label: t('admin.products') },
        { href: '/dashboard/orders', icon: ShoppingCart, label: t('admin.orders') },
        { href: '/dashboard/users', icon: Users, label: t('admin.users') },
        { href: '/dashboard/commissions', icon: Wallet, label: t('admin.commissions') },
        { href: '/dashboard/settings', icon: Settings, label: t('dashboard.settings') },
    ]

    const links = isAdmin ? adminLinks : vendorLinks

    const SidebarContent = () => (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="p-4 border-b border-white/[0.06]">
                <Link href="/" className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-xl overflow-hidden flex-shrink-0">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-violet-500 to-silver" />
                        <div className="absolute inset-[2px] bg-black rounded-lg flex items-center justify-center">
                            <span className="text-lg font-bold holographic-text">E</span>
                        </div>
                    </div>
                    {!isCollapsed && (
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-xl font-bold tracking-tight text-white"
                        >
                            ETHER
                        </motion.span>
                    )}
                </Link>
            </div>

            {/* Profile Badge */}
            <div className="p-4 border-b border-white/[0.06]">
                <div className={cn(
                    'flex items-center gap-3 p-3 rounded-xl bg-white/[0.02]',
                    isCollapsed && 'justify-center'
                )}>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-white">
                            {profile.brand_name?.[0] || profile.email[0].toUpperCase()}
                        </span>
                    </div>
                    {!isCollapsed && (
                        <div className="min-w-0">
                            <p className="text-sm font-medium text-white truncate">
                                {profile.brand_name || 'Minha Conta'}
                            </p>
                            <p className="text-xs text-white/50 capitalize">
                                {profile.role === 'admin' ? 'Administrador' :
                                    profile.role === 'vendor' ? 'Vendedor' : 'Comprador'}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {links.map((link) => {
                    const isActive = pathname === link.href
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200',
                                isActive
                                    ? 'bg-gradient-to-r from-cyan-500/20 to-violet-500/20 text-white'
                                    : 'text-white/60 hover:text-white hover:bg-white/5',
                                isCollapsed && 'justify-center px-2'
                            )}
                        >
                            <link.icon className={cn(
                                'w-5 h-5 flex-shrink-0',
                                isActive && 'text-cyan-400'
                            )} />
                            {!isCollapsed && (
                                <span className="text-sm font-medium">{link.label}</span>
                            )}
                            {!isCollapsed && isActive && (
                                <ChevronRight className="w-4 h-4 ml-auto text-cyan-400" />
                            )}
                        </Link>
                    )
                })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-white/[0.06] space-y-2">
                <Link
                    href="/"
                    className={cn(
                        'flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-colors',
                        isCollapsed && 'justify-center px-2'
                    )}
                >
                    <Globe className="w-5 h-5" />
                    {!isCollapsed && <span className="text-sm">Ver Loja</span>}
                </Link>
                <form action="/api/auth/logout" method="POST">
                    <button
                        type="submit"
                        className={cn(
                            'flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/60 hover:text-red-400 hover:bg-red-500/10 transition-colors w-full',
                            isCollapsed && 'justify-center px-2'
                        )}
                    >
                        <LogOut className="w-5 h-5" />
                        {!isCollapsed && <span className="text-sm">{t('auth.logout')}</span>}
                    </button>
                </form>
            </div>
        </div>
    )

    return (
        <>
            {/* Desktop Sidebar */}
            <aside
                className={cn(
                    'hidden lg:flex flex-col fixed left-0 top-0 bottom-0 z-40 bg-[#0a0a0a] border-r border-white/[0.06] transition-all duration-300',
                    isCollapsed ? 'w-20' : 'w-64'
                )}
            >
                <SidebarContent />

                {/* Collapse Toggle */}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                >
                    <ChevronRight className={cn(
                        'w-4 h-4 transition-transform',
                        isCollapsed ? '' : 'rotate-180'
                    )} />
                </button>
            </aside>

            {/* Mobile Menu Toggle */}
            <button
                onClick={() => setIsMobileOpen(true)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-xl bg-white/5 border border-white/10 text-white"
            >
                <Menu className="w-5 h-5" />
            </button>

            {/* Mobile Sidebar */}
            <AnimatePresence>
                {isMobileOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileOpen(false)}
                            className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                        />
                        <motion.aside
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                            className="lg:hidden fixed left-0 top-0 bottom-0 w-64 bg-[#0a0a0a] border-r border-white/[0.06] z-50"
                        >
                            <button
                                onClick={() => setIsMobileOpen(false)}
                                className="absolute top-4 right-4 p-2 rounded-xl text-white/50 hover:text-white"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <SidebarContent />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}
