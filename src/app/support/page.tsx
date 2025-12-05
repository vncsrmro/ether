'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Header, Footer, CartDrawer } from '@/components/layout'
import { Button, Input } from '@/components/ui'
import { SearchBar } from '@/components/filters'
import {
    HelpCircle,
    Download,
    Upload,
    CreditCard,
    User,
    Mail,
    MessageSquare,
    ChevronRight,
    Send
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function SupportPage() {
    const [searchQuery, setSearchQuery] = React.useState('')
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })

    const categories = [
        {
            icon: <Download className="w-6 h-6" />,
            title: 'Compras & Downloads',
            description: 'Problemas com downloads, licenças e pagamentos',
            articles: 12
        },
        {
            icon: <Upload className="w-6 h-6" />,
            title: 'Vendas & Uploads',
            description: 'Como enviar produtos e gerenciar vendas',
            articles: 8
        },
        {
            icon: <User className="w-6 h-6" />,
            title: 'Conta & Perfil',
            description: 'Configurações de conta e segurança',
            articles: 6
        },
        {
            icon: <CreditCard className="w-6 h-6" />,
            title: 'Pagamentos',
            description: 'Comissões, saques e métodos de pagamento',
            articles: 10
        }
    ]

    const popularFaqs = [
        {
            question: 'Como faço para baixar um loop após a compra?',
            answer: 'Após a confirmação do pagamento, você receberá um e-mail com o link de download. Também pode acessar seus downloads a qualquer momento no painel "Minhas Compras".'
        },
        {
            question: 'Qual é a licença incluída nos loops?',
            answer: 'Todos os loops incluem licença comercial, permitindo uso em projetos pessoais e comerciais. Cada produto indica se a licença é padrão ou exclusiva.'
        },
        {
            question: 'Como posso me tornar um vendedor?',
            answer: 'Basta criar uma conta, ir para Configurações > Tornar-se Vendedor e preencher as informações necessárias incluindo conta Stripe para recebimentos.'
        },
        {
            question: 'Quando recebo minhas comissões?',
            answer: 'As comissões são processadas mensalmente. O valor mínimo para saque é de R$50. Os pagamentos são feitos via Stripe para conta bancária ou PayPal.'
        },
        {
            question: 'Posso pedir reembolso?',
            answer: 'Sim, oferecemos reembolso em até 7 dias após a compra, desde que o produto não tenha sido utilizado em projetos publicados.'
        },
        {
            question: 'Quais formatos de arquivo são aceitos?',
            answer: 'Aceitamos vídeos em MP4 (H.264/H.265), MOV (ProRes), e WebM. A resolução mínima é 1080p, recomendamos 4K para maior qualidade.'
        }
    ]

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle form submission
        alert('Mensagem enviada! Entraremos em contato em breve.')
        setFormData({ name: '', email: '', subject: '', message: '' })
    }

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
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 mb-6">
                            <HelpCircle className="w-5 h-5 text-green-400" />
                            <span className="text-green-400 font-medium">Central de Ajuda</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Como podemos <span className="text-gradient">ajudar?</span>
                        </h1>
                        <p className="text-white/60 max-w-2xl mx-auto mb-8">
                            Encontre respostas rápidas ou entre em contato com nossa equipe
                        </p>

                        <div className="max-w-xl mx-auto">
                            <SearchBar
                                value={searchQuery}
                                onChange={setSearchQuery}
                                placeholder="Buscar na central de ajuda..."
                                suggestions={['download', 'pagamento', 'licença', 'reembolso', 'upload']}
                            />
                        </div>
                    </motion.div>
                </section>

                {/* Categories */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {categories.map((cat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="group p-6 rounded-2xl glass hover:bg-white/5 transition-all cursor-pointer"
                            >
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500/20 to-violet-500/20 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
                                    {cat.icon}
                                </div>
                                <h3 className="font-semibold text-white mb-2 flex items-center justify-between">
                                    {cat.title}
                                    <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-cyan-400 transition-colors" />
                                </h3>
                                <p className="text-sm text-white/50 mb-2">{cat.description}</p>
                                <span className="text-xs text-cyan-400">{cat.articles} artigos</span>
                            </motion.div>
                        ))}
                    </motion.div>
                </section>

                {/* Popular FAQs */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-8"
                    >
                        <h2 className="text-2xl font-bold text-white mb-2">
                            Perguntas Frequentes
                        </h2>
                        <p className="text-white/60">As dúvidas mais comuns dos nossos usuários</p>
                    </motion.div>

                    <div className="max-w-3xl mx-auto space-y-3">
                        {popularFaqs.map((faq, idx) => (
                            <motion.details
                                key={idx}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05 }}
                                className="group rounded-2xl glass overflow-hidden"
                            >
                                <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                                    <span className="font-medium text-white pr-4">{faq.question}</span>
                                    <span className="text-white/50 group-open:rotate-45 transition-transform text-xl">+</span>
                                </summary>
                                <div className="px-5 pb-5 pt-0">
                                    <p className="text-white/60">{faq.answer}</p>
                                </div>
                            </motion.details>
                        ))}
                    </div>
                </section>

                {/* Contact Form */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="grid md:grid-cols-2 gap-12"
                    >
                        {/* Info */}
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-4">
                                Ainda precisa de ajuda?
                            </h2>
                            <p className="text-white/60 mb-8">
                                Nossa equipe de suporte está disponível para ajudar você com qualquer dúvida ou problema.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 flex-shrink-0">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-white">E-mail</h3>
                                        <p className="text-white/60">suporte@ether.io</p>
                                        <p className="text-sm text-white/40">Resposta em até 24h</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center text-violet-400 flex-shrink-0">
                                        <MessageSquare className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-white">Chat</h3>
                                        <p className="text-white/60">Disponível das 9h às 18h</p>
                                        <p className="text-sm text-white/40">Segunda a Sexta</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="rounded-2xl glass p-6 md:p-8">
                            <h3 className="font-semibold text-white mb-6">Envie uma mensagem</h3>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-white/60 mb-2">Nome</label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            required
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-cyan-500/50"
                                            placeholder="Seu nome"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-white/60 mb-2">E-mail</label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            required
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-cyan-500/50"
                                            placeholder="seu@email.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm text-white/60 mb-2">Assunto</label>
                                    <input
                                        type="text"
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        required
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-cyan-500/50"
                                        placeholder="Como podemos ajudar?"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm text-white/60 mb-2">Mensagem</label>
                                    <textarea
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        required
                                        rows={4}
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-cyan-500/50 resize-none"
                                        placeholder="Descreva sua dúvida ou problema..."
                                    />
                                </div>

                                <Button type="submit" className="w-full">
                                    <Send className="w-4 h-4 mr-2" />
                                    Enviar Mensagem
                                </Button>
                            </form>
                        </div>
                    </motion.div>
                </section>
            </main>

            <Footer />
        </>
    )
}
