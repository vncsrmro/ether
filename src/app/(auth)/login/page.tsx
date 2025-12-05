'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useAuthUIStore } from '@/store'
import { useRouter } from 'next/navigation'
import { Button, Input } from '@/components/ui'
import { Header } from '@/components/layout'
import { ArrowRight, ShieldCheck } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function LoginPage() {
    const router = useRouter()
    const { setUserRole } = useAuthUIStore()
    const [isLoading, setIsLoading] = React.useState(false)
    const [email, setEmail] = React.useState('')

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        // MOCK LOGIN LOGIC BASED ON EMAIL
        setTimeout(() => {
            if (email.includes('admin')) {
                setUserRole('admin')
                router.push('/dashboard/admin/overview')
            } else if (email.includes('vendor') || email.includes('sell')) {
                setUserRole('vendor')
                router.push('/dashboard/vendor/overview')
            } else {
                setUserRole('buyer')
                router.push('/dashboard/buyer/library')
            }
        }, 1500)
    }

    return (
        <>
            <Header />
            <main className="min-h-screen pt-24 pb-16 flex items-center justify-center px-4">
                <div className="w-full max-w-md">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl"
                    >
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-white mb-2">Bem-vindo de volta</h1>
                            <p className="text-white/60">Entre para acessar sua conta.</p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-4">
                            <Input
                                placeholder="E-mail"
                                type="email"
                                required
                                className="bg-white/5"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Input placeholder="Senha" type="password" required className="bg-white/5" />

                            <div className="text-right">
                                <Link href="/forgot-password" className="text-xs text-white/50 hover:text-white transition-colors">
                                    Esqueceu a senha?
                                </Link>
                            </div>

                            <Button
                                type="submit"
                                size="lg"
                                className="w-full bg-gradient-to-r from-cyan-500 to-violet-500"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
                                ) : (
                                    <>
                                        Entrar
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </>
                                )}
                            </Button>
                        </form>

                        {/* Helper for MVP Testing */}
                        <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/5 text-xs text-white/40">
                            <p className="font-bold text-white/60 mb-2 flex items-center gap-2">
                                <ShieldCheck className="w-3 h-3" />
                                Dicas de Teste (MVP):
                            </p>
                            <ul className="space-y-1 list-disc list-inside">
                                <li>Use email com "admin" para painel Admin</li>
                                <li>Use email com "vendor" para painel Vendedor</li>
                                <li>Qualquer outro para painel Comprador</li>
                            </ul>
                        </div>

                        <div className="mt-6 text-center text-sm">
                            <span className="text-white/60">Não tem uma conta? </span>
                            <Link href="/register" className="text-white font-medium hover:underline">
                                Criar conta
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </main>
        </>
    )
}
