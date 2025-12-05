'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import {
    CreditCard,
    Lock,
    Check,
    Loader2,
    ShoppingBag,
    ArrowLeft,
    Download,
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useCartStore } from '@/store'
import { cn } from '@/lib/utils'

type CheckoutStep = 'cart' | 'payment' | 'processing' | 'complete'

export function CheckoutFlow() {
    const t = useTranslations()
    const [step, setStep] = useState<CheckoutStep>('cart')
    const { items, getTotal, clearCart } = useCartStore()
    const [isProcessing, setIsProcessing] = useState(false)

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(price)
    }

    const handlePayment = async () => {
        setStep('payment')
    }

    const handleConfirmPayment = async () => {
        setIsProcessing(true)
        setStep('processing')

        // Simulate payment processing
        await new Promise((resolve) => setTimeout(resolve, 3000))

        setStep('complete')
        clearCart()
    }

    if (items.length === 0 && step === 'cart') {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                >
                    <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">
                        <ShoppingBag className="w-10 h-10 text-white/30" />
                    </div>
                    <h2 className="text-xl font-semibold text-white mb-2">
                        Carrinho vazio
                    </h2>
                    <p className="text-white/50 mb-6">
                        Adicione loops ao seu carrinho para continuar
                    </p>
                    <Link href="/">
                        <Button magnetic>
                            Explorar Loops
                        </Button>
                    </Link>
                </motion.div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#050505]">
            {/* Header */}
            <header className="border-b border-white/[0.06]">
                <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-xl overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-violet-500 to-silver" />
                            <div className="absolute inset-[2px] bg-black rounded-lg flex items-center justify-center">
                                <span className="text-lg font-bold holographic-text">E</span>
                            </div>
                        </div>
                        <span className="text-xl font-bold text-white">ETHER</span>
                    </Link>

                    {/* Step Indicator */}
                    <div className="flex items-center gap-2">
                        {['cart', 'payment', 'complete'].map((s, i) => (
                            <div key={s} className="flex items-center">
                                <div className={cn(
                                    'w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors',
                                    step === s || (step === 'processing' && s === 'payment')
                                        ? 'bg-gradient-to-r from-cyan-500 to-violet-500 text-white'
                                        : step === 'complete' || (step === 'payment' && s === 'cart') || (step === 'processing' && s === 'cart')
                                            ? 'bg-green-500/20 text-green-400'
                                            : 'bg-white/5 text-white/50'
                                )}>
                                    {(step === 'complete' && s !== 'complete') ||
                                        (step === 'payment' && s === 'cart') ||
                                        (step === 'processing' && s === 'cart') ? (
                                        <Check className="w-4 h-4" />
                                    ) : (
                                        i + 1
                                    )}
                                </div>
                                {i < 2 && (
                                    <div className={cn(
                                        'w-8 h-px',
                                        ((step === 'payment' || step === 'processing') && s === 'cart') || (step === 'complete' && (s === 'cart' || s === 'payment'))
                                            ? 'bg-green-500/50'
                                            : 'bg-white/10'
                                    )} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 py-12">
                <AnimatePresence mode="wait">
                    {/* Cart Review */}
                    {step === 'cart' && (
                        <motion.div
                            key="cart"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                        >
                            <h1 className="text-2xl font-bold text-white mb-8">
                                Resumo do Pedido
                            </h1>

                            <div className="grid lg:grid-cols-3 gap-8">
                                {/* Items */}
                                <div className="lg:col-span-2 space-y-4">
                                    {items.map((item) => (
                                        <div
                                            key={item.product.id}
                                            className="flex gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]"
                                        >
                                            <div
                                                className="w-24 h-16 rounded-lg bg-cover bg-center flex-shrink-0"
                                                style={{
                                                    backgroundImage: `url(${item.product.assets?.[0]?.s3_key_thumb || ''})`,
                                                    backgroundColor: '#1a1a2e',
                                                }}
                                            />
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-medium text-white truncate">
                                                    {item.product.title}
                                                </h3>
                                                <p className="text-sm text-white/50">
                                                    {item.product.resolution} • {item.product.fps} FPS
                                                </p>
                                            </div>
                                            <span className="text-lg font-semibold text-gradient">
                                                {formatPrice(item.product.price)}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* Summary */}
                                <div className="p-6 rounded-xl bg-white/[0.02] border border-white/[0.06] h-fit">
                                    <h3 className="font-semibold text-white mb-4">Total</h3>
                                    <div className="space-y-2 mb-6">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-white/50">Subtotal</span>
                                            <span className="text-white">{formatPrice(getTotal())}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-white/50">Taxas</span>
                                            <span className="text-white">R$ 0,00</span>
                                        </div>
                                        <div className="h-px bg-white/10 my-4" />
                                        <div className="flex justify-between">
                                            <span className="font-semibold text-white">Total</span>
                                            <span className="text-xl font-bold text-gradient">
                                                {formatPrice(getTotal())}
                                            </span>
                                        </div>
                                    </div>
                                    <Button onClick={handlePayment} className="w-full" magnetic>
                                        <CreditCard className="w-4 h-4" />
                                        Ir para Pagamento
                                    </Button>
                                    <p className="text-xs text-white/30 text-center mt-4 flex items-center justify-center gap-1">
                                        <Lock className="w-3 h-3" />
                                        Pagamento seguro via Stripe
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Payment Form */}
                    {step === 'payment' && (
                        <motion.div
                            key="payment"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <button
                                onClick={() => setStep('cart')}
                                className="flex items-center gap-2 text-white/50 hover:text-white mb-6 transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Voltar ao carrinho
                            </button>

                            <h1 className="text-2xl font-bold text-white mb-8">
                                Pagamento
                            </h1>

                            <div className="max-w-lg">
                                <div className="p-6 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-4">
                                    <Input
                                        label="Número do Cartão"
                                        placeholder="1234 5678 9012 3456"
                                        icon={<CreditCard className="w-4 h-4" />}
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                        <Input
                                            label="Validade"
                                            placeholder="MM/AA"
                                        />
                                        <Input
                                            label="CVV"
                                            placeholder="123"
                                            type="password"
                                        />
                                    </div>
                                    <Input
                                        label="Nome no Cartão"
                                        placeholder="Como aparece no cartão"
                                    />

                                    <div className="pt-4">
                                        <Button
                                            onClick={handleConfirmPayment}
                                            className="w-full"
                                            size="lg"
                                            magnetic
                                        >
                                            Pagar {formatPrice(getTotal())}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Processing */}
                    {step === 'processing' && (
                        <motion.div
                            key="processing"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-24"
                        >
                            <div className="relative w-24 h-24 mx-auto mb-8">
                                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 animate-pulse opacity-50" />
                                <div className="absolute inset-2 rounded-full bg-[#050505] flex items-center justify-center">
                                    <Loader2 className="w-10 h-10 text-cyan-400 animate-spin" />
                                </div>
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">
                                Preparando seus arquivos...
                            </h2>
                            <p className="text-white/50">
                                Processando pagamento e gerando download
                            </p>
                        </motion.div>
                    )}

                    {/* Complete */}
                    {step === 'complete' && (
                        <motion.div
                            key="complete"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-24"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', delay: 0.2 }}
                                className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-8"
                            >
                                <Check className="w-12 h-12 text-green-400" />
                            </motion.div>
                            <h2 className="text-2xl font-bold text-white mb-2">
                                Compra Concluída!
                            </h2>
                            <p className="text-white/50 mb-8">
                                Seus loops estão prontos para download
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button size="lg" magnetic>
                                    <Download className="w-5 h-5" />
                                    Baixar Arquivos
                                </Button>
                                <Link href="/">
                                    <Button variant="secondary" size="lg">
                                        Continuar Explorando
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    )
}
