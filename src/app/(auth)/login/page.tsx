'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { login } from '@/app/actions/auth'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react'

export default function LoginPage() {
    const t = useTranslations()
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    async function handleSubmit(formData: FormData) {
        setIsLoading(true)
        setError(null)

        const result = await login(formData)

        if (result?.error) {
            setError(result.error)
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[#050505]">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[150px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-[150px]" />
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
                        {t('auth.login')}
                    </h1>
                    <p className="text-white/50 text-center mb-8">
                        Acesse sua conta para continuar
                    </p>

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

                        <Input
                            name="password"
                            type="password"
                            label={t('auth.password')}
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

                        <div className="flex items-center justify-end">
                            <Link
                                href="/forgot-password"
                                className="text-sm text-white/50 hover:text-white transition-colors"
                            >
                                {t('auth.forgotPassword')}
                            </Link>
                        </div>

                        <Button
                            type="submit"
                            variant="default"
                            size="lg"
                            className="w-full"
                            disabled={isLoading}
                            magnetic
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    {t('auth.login')}
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </Button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-white/50 text-sm">
                            {t('auth.noAccount')}{' '}
                            <Link
                                href="/register"
                                className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
                            >
                                {t('auth.register')}
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center text-white/30 text-xs mt-8">
                    {t('footer.madeWith')}{' '}
                    <a
                        href="https://inovasys.digital"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gradient hover:opacity-80"
                    >
                        InovaSys
                    </a>
                </p>
            </motion.div>
        </div>
    )
}
