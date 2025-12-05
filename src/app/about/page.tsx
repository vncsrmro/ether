'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Header, Footer, CartDrawer } from '@/components/layout'
import { Button } from '@/components/ui'
import { mockProducts, mockVendors, vendorStats } from '@/lib/mock-data'
import {
    Sparkles,
    Users,
    Download,
    Shield,
    Zap,
    Globe,
    Heart,
    ArrowRight
} from 'lucide-react'

export default function AboutPage() {
    // Calculate stats
    const totalProducts = mockProducts.length
    const totalVendors = mockVendors.length
    const totalDownloads = Object.values(vendorStats).reduce((acc, s) => acc + s.sales, 0) * 3

    const values = [
        {
            icon: <Sparkles className="w-8 h-8" />,
            title: 'Qualidade Premium',
            description: 'Cada loop passa por uma curadoria rigorosa para garantir os mais altos padrões de qualidade.'
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: 'Comunidade Criativa',
            description: 'Conectamos artistas visuais talentosos com produtores que buscam conteúdo excepcional.'
        },
        {
            icon: <Shield className="w-8 h-8" />,
            title: 'Licenciamento Claro',
            description: 'Licenças transparentes para uso comercial. Sem surpresas, sem complicações legais.'
        }
    ]

    const stats = [
        { value: `${totalProducts}+`, label: 'Loops Premium' },
        { value: `${totalVendors}+`, label: 'Artistas' },
        { value: `${(totalDownloads / 1000).toFixed(0)}K+`, label: 'Downloads' },
        { value: '4.9', label: 'Avaliação Média' }
    ]

    return (
        <>
            <Header />
            <CartDrawer />

            <main className="min-h-screen pt-24 pb-16">
                {/* Hero Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-violet-500/20 border border-cyan-500/30 mb-6">
                            <Heart className="w-5 h-5 text-cyan-400" />
                            <span className="text-cyan-400 font-medium">Nossa História</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                            Elevando a Arte Visual <br />
                            <span className="text-gradient">ao Próximo Nível</span>
                        </h1>

                        <p className="text-lg md:text-xl text-white/60 mb-8 max-w-3xl mx-auto">
                            A ETHER nasceu da paixão por motion graphics e da vontade de criar um espaço
                            onde artistas visuais pudessem compartilhar seu trabalho com o mundo.
                        </p>
                    </motion.div>
                </section>

                {/* Stats Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-6"
                    >
                        {stats.map((stat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="text-center p-8 rounded-2xl glass"
                            >
                                <p className="text-4xl md:text-5xl font-bold text-gradient mb-2">
                                    {stat.value}
                                </p>
                                <p className="text-white/50">{stat.label}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </section>

                {/* Mission Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="grid md:grid-cols-2 gap-12 items-center"
                    >
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                                Nossa <span className="text-gradient">Missão</span>
                            </h2>
                            <p className="text-white/60 mb-6 text-lg">
                                Queremos democratizar o acesso a conteúdo visual de alta qualidade,
                                permitindo que criadores de todo o mundo monetizem seu talento e que
                                produtores encontrem os recursos visuais perfeitos para seus projetos.
                            </p>
                            <p className="text-white/60 mb-8 text-lg">
                                Acreditamos que a arte visual tem o poder de transformar experiências,
                                e estamos aqui para tornar isso acessível a todos.
                            </p>
                            <Link href="/explore">
                                <Button>
                                    Explorar Biblioteca
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </Link>
                        </div>

                        <div className="relative">
                            <div className="aspect-square rounded-3xl overflow-hidden glass">
                                <img
                                    src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=600&fit=crop"
                                    alt="Visual Art"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {/* Decorative elements */}
                            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-2xl blur-2xl opacity-30" />
                            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-2xl blur-2xl opacity-30" />
                        </div>
                    </motion.div>
                </section>

                {/* Values Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Nossos <span className="text-gradient">Valores</span>
                        </h2>
                        <p className="text-white/60 max-w-2xl mx-auto">
                            Os princípios que guiam tudo o que fazemos
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {values.map((value, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="p-8 rounded-2xl glass text-center group hover:bg-white/5 transition-all"
                            >
                                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-violet-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-3">
                                    {value.title}
                                </h3>
                                <p className="text-white/60">
                                    {value.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative rounded-3xl overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-violet-500/20" />
                        <div className="absolute inset-0">
                            <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[100px]" />
                            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-[100px]" />
                        </div>

                        <div className="relative p-12 md:p-16 text-center">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                Pronto para Começar?
                            </h2>
                            <p className="text-white/60 mb-8 max-w-xl mx-auto">
                                Junte-se a milhares de artistas e criadores que já fazem parte da nossa comunidade.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/explore">
                                    <Button size="lg">
                                        Explorar Loops
                                    </Button>
                                </Link>
                                <Link href="/pricing">
                                    <Button variant="secondary" size="lg">
                                        Ver Preços
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </section>
            </main>

            <Footer />
        </>
    )
}
