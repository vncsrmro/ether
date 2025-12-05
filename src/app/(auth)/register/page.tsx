'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useAuthUIStore } from '@/store'
import { useRouter } from 'next/navigation'
import { Button, Input } from '@/components/ui'
import { Header, Footer } from '@/components/layout'
import { ShoppingBag, Store, ArrowRight, Video, AlertCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'

export default function RegisterPage() {
    const router = useRouter()
    const { setAuthMode, setUserRole } = useAuthUIStore()
    const [accountType, setAccountType] = React.useState<'buyer' | 'vendor'>('buyer')
    const [isLoading, setIsLoading] = React.useState(false)
    const [error, setError] = React.useState<string | null>(null)

    // Form State
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [brandName, setBrandName] = React.useState('')
    const [name, setName] = React.useState('')

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        const supabase = createClient()

        try {
            // 1. Sign Up
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: name
                    }
                }
            })

            if (authError) throw authError

            if (authData.user) {
                // 2. Create Profile row
                // Note: If you have a Trigger to create profile on auth.user created, this might fail or be redundant.
                // Assuming manual creation or upsert for safety.
                const { error: profileError } = await supabase
                    .from('profiles')
                    .upsert({
                        id: authData.user.id,
                        email: email,
                        role: accountType,
                        brand_name: accountType === 'vendor' ? brandName : null
                    })

                if (profileError) throw profileError

                // 3. Update Local State
                setUserRole(accountType)

                // 4. Redirect
                router.push(accountType === 'vendor' ? '/dashboard/vendor/overview' : '/dashboard/buyer/library')
            }

        } catch (err: any) {
            console.error('Registration Error:', err)
            setError(err.message || 'Erro ao criar conta. Tente novamente.')
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
                            <h1 className="text-3xl font-bold text-white mb-2">Crie sua conta</h1>
                            <p className="text-white/60">Junte-se à comunidade ETHER hoje.</p>
                        </div>

                        {error && (
                            <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-100 text-sm">
                                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                                {error}
                            </div>
                        )}

                        {/* Account Type Selector */}
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div
                                onClick={() => setAccountType('buyer')}
                                className={cn(
                                    "cursor-pointer p-4 rounded-xl border transition-all text-center",
                                    accountType === 'buyer'
                                        ? "bg-cyan-500/10 border-cyan-500 text-cyan-400"
                                        : "bg-white/5 border-transparent hover:bg-white/10 text-white/60"
                                )}
                            >
                                <ShoppingBag className="w-6 h-6 mx-auto mb-2" />
                                <span className="font-medium text-sm">Quero Comprar</span>
                            </div>
                            <div
                                onClick={() => setAccountType('vendor')}
                                className={cn(
                                    "cursor-pointer p-4 rounded-xl border transition-all text-center",
                                    accountType === 'vendor'
                                        ? "bg-violet-500/10 border-violet-500 text-violet-400"
                                        : "bg-white/5 border-transparent hover:bg-white/10 text-white/60"
                                )}
                            >
                                <Store className="w-6 h-6 mx-auto mb-2" />
                                <span className="font-medium text-sm">Quero Vender</span>
                            </div>
                        </div>

                        <form onSubmit={handleRegister} className="space-y-4">
                            <Input
                                placeholder="Nome Completo"
                                type="text"
                                required
                                className="bg-white/5"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
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

                            {accountType === 'vendor' && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                >
                                    <Input
                                        placeholder="Nome da Marca / Artista"
                                        type="text"
                                        required
                                        className="bg-white/5 border-violet-500/30 focus:border-violet-500"
                                        value={brandName}
                                        onChange={(e) => setBrandName(e.target.value)}
                                    />
                                    <p className="text-xs text-white/40 mt-2 px-1">
                                        O nome que aparecerá no seu perfil de vendedor.
                                    </p>
                                </motion.div>
                            )}

                            <Button
                                type="submit"
                                size="lg"
                                className={cn(
                                    "w-full mt-4",
                                    accountType === 'vendor'
                                        ? "bg-gradient-to-r from-violet-600 to-purple-600"
                                        : "bg-gradient-to-r from-cyan-500 to-blue-500"
                                )}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
                                ) : (
                                    <>
                                        Criar Conta {accountType === 'vendor' ? 'de Vendedor' : ''}
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </>
                                )}
                            </Button>
                        </form>

                        <div className="mt-6 text-center text-sm">
                            <span className="text-white/60">Já tem uma conta? </span>
                            <Link href="/login" className="text-white font-medium hover:underline">
                                Entrar
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </main>
        </>
    )
}
