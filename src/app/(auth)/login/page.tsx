'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useAuthUIStore } from '@/store'
import { useRouter } from 'next/navigation'
import { Button, Input } from '@/components/ui'
import { Header } from '@/components/layout'
import { ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'

export default function LoginPage() {
    const router = useRouter()
    const { setUserRole } = useAuthUIStore()
    const [isLoading, setIsLoading] = React.useState(false)
    const [error, setError] = React.useState<string | null>(null)

    // Form State
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        // Initialize Supabase
        const supabase = createClient()

        try {
            const { data, error: authError } = await supabase.auth.signInWithPassword({
                email,
                password
            })

            if (authError) throw authError

            // 1. Fetch User Profile to get Role
            const { data: profile, error: profileError } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', data.user.id)
                .single()

            // Default role if profile missing (fallback)
            let role = 'buyer'
            if (profile?.role) {
                role = profile.role
            } else {
                // Basic role inference for MVP/Mock users if they don't have profile row yet
                if (email.includes('admin')) role = 'admin'
                else if (email.includes('vendor')) role = 'vendor'
            }

            // 2. Update Store
            setUserRole(role as any)

            // 3. Redirect
            if (role === 'admin') router.push('/dashboard/admin/overview')
            else if (role === 'vendor') router.push('/dashboard/vendor/overview')
            else router.push('/dashboard/buyer/library')

        } catch (err: any) {
            console.error('Login Error:', err)
            setError(err.message || 'Falha ao realizar login. Verifique suas credenciais.')
        } finally {
            setIsLoading(false)
        }
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

                        {error && (
                            <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-100 text-sm">
                                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleLogin} className="space-y-4">
                            <Input
                                placeholder="E-mail"
                                type="email"
                                required
                                className="bg-white/5"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Input
                                placeholder="Senha"
                                type="password"
                                required
                                className="bg-white/5"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

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
                                Modo Integrado Supabase:
                            </p>
                            <ul className="space-y-1 list-disc list-inside">
                                <li>Login real via Supabase Auth</li>
                                <li>Verifica tabela 'profiles' para role</li>
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
