'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/Button'
import { Upload, DollarSign, Zap, Shield } from 'lucide-react'

const features = [
    {
        icon: Upload,
        titleKey: 'upload',
        title: 'Upload Fácil',
        titleEn: 'Easy Upload',
        description: 'Faça upload dos seus loops com preview automático gerado por FFmpeg.',
        descriptionEn: 'Upload your loops with automatic FFmpeg-generated previews.',
    },
    {
        icon: DollarSign,
        titleKey: 'earnings',
        title: 'Ganhos Justos',
        titleEn: 'Fair Earnings',
        description: 'Receba até 80% de cada venda diretamente na sua conta Stripe.',
        descriptionEn: 'Earn up to 80% of each sale directly to your Stripe account.',
    },
    {
        icon: Zap,
        titleKey: 'instant',
        title: 'Entrega Instantânea',
        titleEn: 'Instant Delivery',
        description: 'Downloads gerados sob demanda com nossa tecnologia Zip-on-the-fly.',
        descriptionEn: 'On-demand downloads with our Zip-on-the-fly technology.',
    },
    {
        icon: Shield,
        titleKey: 'license',
        title: 'Licença Comercial',
        titleEn: 'Commercial License',
        description: 'Todos os loops incluem licença comercial para uso profissional.',
        descriptionEn: 'All loops include commercial license for professional use.',
    },
]

export function FeaturesSection() {
    const t = useTranslations()

    return (
        <section className="relative py-24 sm:py-32 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 grid-pattern opacity-50" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                        Por que escolher o{' '}
                        <span className="holographic-text">ETHER</span>?
                    </h2>
                    <p className="text-lg text-white/50">
                        A plataforma definitiva para VJs e Motion Designers monetizarem seu trabalho.
                    </p>
                </motion.div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.titleKey}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-cyan-500/30 transition-all duration-500"
                        >
                            {/* Glow Effect */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative">
                                {/* Icon */}
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <feature.icon className="w-6 h-6 text-cyan-400" />
                                </div>

                                {/* Content */}
                                <h3 className="text-lg font-semibold text-white mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-white/50">
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-16"
                >
                    <Button variant="holographic" size="lg" magnetic>
                        Começar a Vender
                    </Button>
                </motion.div>
            </div>
        </section>
    )
}
