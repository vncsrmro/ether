'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { User, Lock, Bell, CreditCard, Save } from 'lucide-react'
import { Button, Input } from '@/components/ui'
import { useAuthUIStore } from '@/store'

export default function SettingsPage() {
    const { userRole } = useAuthUIStore()

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Configurações</h1>
                <p className="text-white/60">Gerencie seu perfil e preferências da conta.</p>
            </div>

            {/* Tabs / Sections */}
            <div className="grid gap-8">

                {/* Profile Section */}
                <section className="glass rounded-2xl p-6 sm:p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                            <User className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl font-bold text-white">Perfil Público</h2>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-8 items-start">
                        <div className="flex-shrink-0">
                            <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center text-white/20 border-2 border-dashed border-white/20 cursor-pointer hover:border-cyan-500 hover:text-cyan-500 transition-all">
                                <span className="text-xs">Alterar Foto</span>
                            </div>
                        </div>

                        <div className="flex-1 w-full space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm text-white/60 mb-1.5 block">Nome de Exibição</label>
                                    <Input defaultValue="Alex Design" className="bg-black/20" />
                                </div>
                                <div>
                                    <label className="text-sm text-white/60 mb-1.5 block">E-mail</label>
                                    <Input defaultValue="alex@ether.com" disabled className="bg-black/20 opacity-50 cursor-not-allowed" />
                                </div>
                            </div>

                            {userRole === 'vendor' && (
                                <div>
                                    <label className="text-sm text-white/60 mb-1.5 block">Bio do Vendedor</label>
                                    <textarea
                                        className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-500/50 outline-none resize-none h-24"
                                        defaultValue="Visual artist creating futuristic loops."
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end">
                        <Button>
                            <Save className="w-4 h-4 mr-2" />
                            Salvar Alterações
                        </Button>
                    </div>
                </section>

                {/* Security Section */}
                <section className="glass rounded-2xl p-6 sm:p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-lg bg-violet-500/10 text-violet-400">
                            <Lock className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl font-bold text-white">Segurança</h2>
                    </div>

                    <div className="space-y-4 max-w-md">
                        <Button variant="outline" className="w-full justify-between">
                            Alterar Senha
                            <span className="text-xs text-white/40">Última alteração há 3 meses</span>
                        </Button>
                        <Button variant="outline" className="w-full justify-between hover:border-red-500/50 hover:text-red-400">
                            Autenticação de Dois Fatores (2FA)
                            <span className="text-xs text-white/40">Desativado</span>
                        </Button>
                    </div>
                </section>

                {/* Notifications */}
                <section className="glass rounded-2xl p-6 sm:p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-lg bg-yellow-500/10 text-yellow-400">
                            <Bell className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl font-bold text-white">Notificações</h2>
                    </div>

                    <div className="space-y-4">
                        {['Novas Vendas', 'Atualizações de Produtos', 'Newsletters'].map((item) => (
                            <div key={item} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors">
                                <span className="text-white/80">{item}</span>
                                <div className="h-6 w-11 bg-cyan-500 rounded-full relative cursor-pointer">
                                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </div>
        </div>
    )
}
