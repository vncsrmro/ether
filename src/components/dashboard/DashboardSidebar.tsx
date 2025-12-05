'use client'

import React from 'react'
import Link from 'next/link'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useAuthUIStore, useUIStore } from '@/store'
import {
    LayoutDashboard,
    ShoppingBag,
    Heart,
    Settings,
    LogOut,
    Upload,
    Package,
    Layers,
    DollarSign,
    Users,
    ShieldCheck,
    CheckCircle,
    Video,
    Menu,
    X
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface SidebarItem {
    icon: React.ElementType
    label: string
    href: string
}

export function DashboardSidebar() {
    const pathname = usePathname()
    const router = useRouter()
    const { userRole, setUserRole } = useAuthUIStore()
    const { isMobileMenuOpen, setMobileMenuOpen } = useUIStore()

    // Define menus based on role
    const menus: Record<string, SidebarItem[]> = {
        buyer: [
            { icon: LayoutDashboard, label: 'Visão Geral', href: '/dashboard' },
            { icon: Video, label: 'Minha Biblioteca', href: '/dashboard/buyer/library' },
            { icon: ShoppingBag, label: 'Pedidos', href: '/dashboard/buyer/orders' },
            { icon: Heart, label: 'Favoritos', href: '/dashboard/buyer/wishlist' },
            { icon: Settings, label: 'Configurações', href: '/dashboard/settings' },
        ],
        vendor: [
            { icon: LayoutDashboard, label: 'Visão Geral', href: '/dashboard/vendor/overview' },
            { icon: Video, label: 'Meus Produtos', href: '/dashboard/vendor/products' },
            { icon: Upload, label: 'Novo Upload', href: '/dashboard/vendor/products/new' },
            { icon: Layers, label: 'Coleções', href: '/dashboard/vendor/collections' },
            { icon: DollarSign, label: 'Financeiro', href: '/dashboard/vendor/finance' },
            { icon: Settings, label: 'Configurações', href: '/dashboard/settings' },
        ],
        admin: [
            { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard/admin/overview' },
            { icon: CheckCircle, label: 'Aprovações', href: '/dashboard/admin/approvals' },
            { icon: Users, label: 'Usuários', href: '/dashboard/admin/users' },
            { icon: DollarSign, label: 'Financeiro', href: '/dashboard/admin/finance' },
            { icon: Settings, label: 'Configurações', href: '/dashboard/settings' },
        ]
    }

    const currentMenu = menus[userRole] || menus['buyer']

    const handleLogout = () => {
        setUserRole('guest')
        router.push('/')
    }

    return (
        <>
            {/* Mobile Trigger */}
            <div className="lg:hidden fixed top-20 left-4 z-40">
                <button
                    onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 rounded-lg bg-black/50 border border-white/10 text-white backdrop-blur-md"
                >
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Sidebar Container */}
            <aside
                className={cn(
                    "fixed top-0 left-0 h-full w-64 bg-black/95 border-r border-white/10 backdrop-blur-xl z-30 transition-transform duration-300 pt-24 pb-8 px-4 flex flex-col",
                    isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                )}
            >
                {/* User Profile Mini */}
                <div className="mb-8 p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center font-bold text-white">
                            {userRole[0].toUpperCase()}
                        </div>
                        <div>
                            <p className="text-sm font-medium text-white capitalize">{userRole}</p>
                            <p className="text-xs text-white/50">user@ether.io</p>
                        </div>
                    </div>

                    {/* Quick Role Switcher (DEV ONLY) */}
                    <div className="flex gap-1 mt-2">
                        {(['buyer', 'vendor', 'admin'] as const).map(role => (
                            <button
                                key={role}
                                onClick={() => setUserRole(role)}
                                className={cn(
                                    "flex-1 text-[10px] py-1 rounded border transition-colors",
                                    userRole === role
                                        ? "bg-white/20 border-white/20 text-white"
                                        : "border-white/5 text-white/30 hover:bg-white/10"
                                )}
                            >
                                {role[0].toUpperCase()}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Menu Items */}
                <nav className="flex-1 space-y-1">
                    {currentMenu.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group",
                                    isActive
                                        ? "bg-gradient-to-r from-cyan-500/20 to-violet-500/20 text-white border border-white/10"
                                        : "text-white/60 hover:text-white hover:bg-white/5"
                                )}
                            >
                                <item.icon className={cn(
                                    "w-5 h-5 transition-colors",
                                    isActive ? "text-cyan-400" : "text-white/40 group-hover:text-white"
                                )} />
                                {item.label}
                            </Link>
                        )
                    })}
                </nav>

                {/* Logout */}
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors mt-auto"
                >
                    <LogOut className="w-5 h-5" />
                    Sair da Conta
                </button>
            </aside>
        </>
    )
}
