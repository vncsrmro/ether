'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Header, Footer, CartDrawer } from '@/components/layout'
import { Button } from '@/components/ui'
import {
    Check,
    Zap,
    Crown,
    Rocket,
    HelpCircle,
    ArrowRight
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function PricingPage() {
    const [vendorCommission, setVendorCommission] = React.useState(75)

    const buyerFeatures = [
        'Sem taxas extras no checkout',
        'Download instantâneo após compra',
        'Licença comercial incluída',
        'Suporte por e-mail',
        'Acesso a previews em alta qualidade',
        'Histórico de compras completo'
    ]

    const sellerTiers = [
        {
            name: 'Starter',
            commission: 75,
            description: 'Para quem está começando',
            features: [
                'Comissão de 75%',
                'Até 20 uploads/mês',
                'Suporte por e-mail',
                'Analytics básico'
            ],
            icon: <Zap className="w-6 h-6" />,
            popular: false
        },
        {
            name: 'Pro',
            commission: 80,
            description: 'Para artistas ativos',
            features: [
                'Comissão de 80%',
                'Uploads ilimitados',
                'Suporte prioritário',
                'Analytics avançado',
                'Badge verificado',
                'Destaque na home'
            ],
            icon: <Crown className="w-6 h-6" />,
            popular: true
        },
        {
            name: 'Enterprise',
            commission: 85,
            description: 'Para estúdios e agências',
            features: [
                'Comissão de 85%',
                'Uploads ilimitados',
                'Gerente de conta',
                'API de integração',
                'Relatórios customizados',
                'Pagamentos semanais'
            ],
            icon: <Rocket className="w-6 h-6" />,
            popular: false
        }
    ]

    const faqs = [
        {
            question: 'Como funciona o sistema de comissões?',
            answer: 'Quando você vende um loop, você recebe a porcentagem correspondente ao seu tier. Por exemplo, no tier Pro com 80% de comissão, se você vender um loop por R$50, você recebe R$40.'
        },
        {
            question: 'Quando recebo meus pagamentos?',
            answer: 'Os pagamentos são processados mensalmente via Stripe. Você pode configurar sua conta bancária ou PayPal para receber os valores.'
        },
        {
            question: 'Existe alguma taxa para compradores?',
            answer: 'Não! Compradores pagam apenas o preço do produto, sem taxas adicionais. O preço que você vê é o preço final.'
        },
        {
            question: 'Posso mudar de tier depois?',
            answer: 'Sim! Você pode fazer upgrade a qualquer momento. O novo tier é ativado imediatamente após a confirmação.'
        }
    ]

    return (
        <>
            <Header />
            <CartDrawer />

            <main className="min-h-screen pt-24 pb-16">
                {/* Hero */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Preços <span className="text-gradient">Transparentes</span>
                        </h1>
                        <p className="text-white/60 max-w-2xl mx-auto text-lg">
                            Sem surpresas. Sem taxas escondidas. Ganhe mais com seu trabalho.
                        </p>
                    </motion.div>
                </section>

                {/* For Buyers */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="rounded-3xl glass p-8 md:p-12"
                    >
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                            Para Compradores
                        </h2>
                        <p className="text-white/60 mb-8">
                            Simples e direto. Pague apenas pelo que você escolher.
                        </p>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <div className="text-5xl font-bold text-gradient mb-4">
                                    R$ 0
                                </div>
                                <p className="text-white/60 mb-6">
                                    Sem taxas adicionais. O preço do produto é o preço final.
                                </p>
                                <Link href="/explore">
                                    <Button>
                                        Começar a Comprar
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 gap-3">
                                {buyerFeatures.map((feature, idx) => (
                                    <div key={idx} className="flex items-center gap-3">
                                        <div className="w-5 h-5 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 flex items-center justify-center flex-shrink-0">
                                            <Check className="w-3 h-3 text-white" />
                                        </div>
                                        <span className="text-white/80">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* For Sellers */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                            Para Vendedores
                        </h2>
                        <p className="text-white/60">
                            Escolha o plano ideal para o seu negócio
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {sellerTiers.map((tier, idx) => (
                            <motion.div
                                key={tier.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className={cn(
                                    "relative p-8 rounded-3xl",
                                    tier.popular
                                        ? "bg-gradient-to-b from-cyan-500/20 to-violet-500/20 border-2 border-cyan-500/50"
                                        : "glass"
                                )}
                            >
                                {tier.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 text-sm font-semibold text-white">
                                        Mais Popular
                                    </div>
                                )}

                                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500/20 to-violet-500/20 flex items-center justify-center text-cyan-400 mb-4">
                                    {tier.icon}
                                </div>

                                <h3 className="text-xl font-bold text-white mb-1">{tier.name}</h3>
                                <p className="text-white/50 text-sm mb-4">{tier.description}</p>

                                <div className="mb-6">
                                    <span className="text-4xl font-bold text-white">{tier.commission}%</span>
                                    <span className="text-white/50 ml-2">de comissão</span>
                                </div>

                                <ul className="space-y-3 mb-8">
                                    {tier.features.map((feature, fIdx) => (
                                        <li key={fIdx} className="flex items-center gap-3">
                                            <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                                            <span className="text-white/70 text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Button
                                    variant={tier.popular ? "default" : "secondary"}
                                    className="w-full"
                                >
                                    Começar como {tier.name}
                                </Button>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Commission Calculator */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="rounded-3xl glass p-8 md:p-12"
                    >
                        <h2 className="text-2xl font-bold text-white mb-6 text-center">
                            Calculadora de Ganhos
                        </h2>

                        <div className="max-w-xl mx-auto">
                            <div className="mb-6">
                                <label className="block text-white/60 mb-2">
                                    Sua comissão: {vendorCommission}%
                                </label>
                                <input
                                    type="range"
                                    min="75"
                                    max="85"
                                    step="5"
                                    value={vendorCommission}
                                    onChange={(e) => setVendorCommission(Number(e.target.value))}
                                    className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-cyan-500"
                                />
                                <div className="flex justify-between text-xs text-white/40 mt-1">
                                    <span>Starter (75%)</span>
                                    <span>Pro (80%)</span>
                                    <span>Enterprise (85%)</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4 text-center">
                                {[29.90, 49.90, 99.90].map(price => (
                                    <div key={price} className="p-4 rounded-xl bg-white/5">
                                        <p className="text-white/50 text-sm mb-1">Venda de R${price}</p>
                                        <p className="text-2xl font-bold text-gradient">
                                            R${(price * vendorCommission / 100).toFixed(2)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* FAQ */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                            Perguntas Frequentes
                        </h2>
                    </motion.div>

                    <div className="max-w-3xl mx-auto space-y-4">
                        {faqs.map((faq, idx) => (
                            <motion.details
                                key={idx}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05 }}
                                className="group rounded-2xl glass overflow-hidden"
                            >
                                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                                    <div className="flex items-center gap-3">
                                        <HelpCircle className="w-5 h-5 text-cyan-400" />
                                        <span className="font-medium text-white">{faq.question}</span>
                                    </div>
                                    <span className="text-white/50 group-open:rotate-45 transition-transform">+</span>
                                </summary>
                                <div className="px-6 pb-6 pt-0">
                                    <p className="text-white/60 pl-8">{faq.answer}</p>
                                </div>
                            </motion.details>
                        ))}
                    </div>
                </section>
            </main>

            <Footer />
        </>
    )
}
