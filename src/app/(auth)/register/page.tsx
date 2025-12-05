'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { register } from '@/app/actions/auth'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Mail, Lock, User, Store, ArrowRight, Loader2, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

type AccountType = 'user' | 'vendor'

export default function RegisterPage() {
    const t = useTranslations()
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [accountType, setAccountType] = useState<AccountType>('user')

    async function handleSubmit(formData: FormData) {
        setIsLoading(true)
        setError(null)

        formData.set('role', accountType)
        const result = await register(formData)

        if (result?.error) {
            setError(result.error)
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[#050505]">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-[150px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[150px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative w-full max-w-md"
            >
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-3 group">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-violet-500 to-silver" />
                            <div className="absolute inset-[2px] bg-black rounded-lg flex items-center justify-center">
                                <span className="text-xl font-bold holographic-text">E</span>
                            </div>
                        </div>
                        <span className="text-2xl font-bold tracking-tight text-white">
                            ETHER
                        </span>
                    </Link>
                </div>

                {/* Card */}
                <div className="glass-elevated rounded-2xl p-8">
                    <h1 className="text-2xl font-bold text-white mb-2 text-center">
                        {t('auth.register')}
                    </h1>
                    <p className="text-white/50 text-center mb-8">
                        Crie sua conta para começar
                    </p>

                    {/* Account Type Selection */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                        <button
                            type="button"
                            onClick={() => setAccountType('user')}
                            className={cn(
                                'p-4 rounded-xl border transition-all duration-300 text-left',
                                accountType === 'user'
                                    ? 'border-cyan-500/50 bg-cyan-500/10'
                                    : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                            )}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <User className={cn(
                                    'w-5 h-5',
                                    accountType === 'user' ? 'text-cyan-400' : 'text-white/50'
                                )} />
                                {accountType === 'user' && (
                                    <Check className="w-4 h-4 text-cyan-400" />
                                )}
                            </div>
                            <h3 className="text-sm font-medium text-white">Comprador</h3>
                            <p className="text-xs text-white/40 mt-1">Compre loops premium</p>
                        </button>

                        <button
                            type="button"
                            onClick={() => setAccountType('vendor')}
                            className={cn(
                                'p-4 rounded-xl border transition-all duration-300 text-left',
                                accountType === 'vendor'
                                    ? 'border-violet-500/50 bg-violet-500/10'
                                    : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                            )}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <Store className={cn(
                                    'w-5 h-5',
                                    accountType === 'vendor' ? 'text-violet-400' : 'text-white/50'
                                )} />
                                {accountType === 'vendor' && (
                                    <Check className="w-4 h-4 text-violet-400" />
                                )}
                            </div>
                            <h3 className="text-sm font-medium text-white">Vendedor</h3>
                            <p className="text-xs text-white/40 mt-1">Venda seus loops</p>
                        </button>
                    </div>

                    <form action={handleSubmit} className="space-y-5">
                        <Input
                            name="email"
                            type="email"
                            label={t('auth.email')}
                            placeholder="seu@email.com"
                            icon={<Mail className="w-4 h-4" />}
                            required
                            disabled={isLoading}
                        />

                        {accountType === 'vendor' && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                            >
                                <Input
                                    name="brandName"
                                    type="text"
                                    label="Nome da Marca"
                                    placeholder="Sua marca ou nome artístico"
                                    icon={<Store className="w-4 h-4" />}
                                    required={accountType === 'vendor'}
                                    disabled={isLoading}
                                />
                            </motion.div>
                        )}

                        <Input
                            name="password"
                            type="password"
                            label={t('auth.password')}
                            placeholder="Mínimo 8 caracteres"
                            icon={<Lock className="w-4 h-4" />}
                            required
                            disabled={isLoading}
                        />

                        <Input
                            name="confirmPassword"
                            type="password"
                            label={t('auth.confirmPassword')}
                            placeholder="••••••••"
                            icon={<Lock className="w-4 h-4" />}
                            required
                            disabled={isLoading}
                        />

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
                            >
                                {error}
                            </motion.div>
                        )}

                        <Button
                            type="submit"
                            variant={accountType === 'vendor' ? 'holographic' : 'default'}
                            size="lg"
                            className="w-full"
                            disabled={isLoading}
                            magnetic
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    Criar Conta
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </Button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-white/50 text-sm">
                            {t('auth.hasAccount')}{' '}
                            <Link
                                href="/login"
                                className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
                            >
                                {t('auth.login')}
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center text-white/30 text-xs mt-8">
                    Ao criar uma conta, você concorda com os{' '}
                    <Link href="/terms" className="text-white/50 hover:text-white">
                        Termos de Uso
                    </Link>
                </p>
            </motion.div>
        </div>
    )
}
