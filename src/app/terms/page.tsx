'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Header, Footer, CartDrawer } from '@/components/layout'
import { FileText } from 'lucide-react'

export default function TermsPage() {
    const lastUpdated = '05 de Dezembro de 2024'

    const sections = [
        {
            title: '1. Aceitação dos Termos',
            content: `Ao acessar e usar a plataforma ETHER ("Serviço"), você concorda em cumprir e estar sujeito a estes Termos de Uso. Se você não concordar com estes termos, não use nosso Serviço.

Estes termos se aplicam a todos os visitantes, usuários e outras pessoas que acessam ou usam o Serviço.`
        },
        {
            title: '2. Definições',
            content: `Para fins destes Termos:
- "Plataforma" refere-se ao site ETHER e todos os seus serviços relacionados
- "Usuário" refere-se a qualquer pessoa que acessa ou usa a Plataforma
- "Vendedor" refere-se a usuários que disponibilizam conteúdo para venda
- "Comprador" refere-se a usuários que adquirem conteúdo na Plataforma
- "Conteúdo" refere-se a loops de vídeo, motion graphics e outros materiais digitais`
        },
        {
            title: '3. Cadastro e Conta',
            content: `3.1. Para utilizar determinadas funcionalidades do Serviço, você deve criar uma conta fornecendo informações precisas e completas.

3.2. Você é responsável por manter a confidencialidade de sua senha e conta.

3.3. Você concorda em notificar-nos imediatamente sobre qualquer uso não autorizado de sua conta.

3.4. Você deve ter pelo menos 18 anos de idade para criar uma conta.`
        },
        {
            title: '4. Licença de Uso',
            content: `4.1. Ao adquirir conteúdo na ETHER, você recebe uma licença não-exclusiva, perpétua e mundial para usar o conteúdo conforme os termos da licença escolhida.

4.2. Licenças disponíveis:
- Licença Padrão: Uso comercial em projetos próprios
- Licença Exclusiva: Uso comercial exclusivo com remoção do catálogo

4.3. Restrições de uso:
- Não é permitido revender o conteúdo como está
- Não é permitido incluir em bibliotecas de mídia para redistribuição
- É necessário integrar o conteúdo em um projeto maior`
        },
        {
            title: '5. Conteúdo do Vendedor',
            content: `5.1. Como vendedor, você mantém todos os direitos sobre o conteúdo original que carrega.

5.2. Você concede à ETHER uma licença para exibir, distribuir e comercializar seu conteúdo na Plataforma.

5.3. Você garante que:
- Possui todos os direitos necessários sobre o conteúdo
- O conteúdo não infringe direitos de terceiros
- O conteúdo está livre de música com direitos autorais ou elementos licenciados

5.4. A ETHER reserva-se o direito de remover conteúdo que viole estes termos.`
        },
        {
            title: '6. Pagamentos e Comissões',
            content: `6.1. Os preços são definidos pelos vendedores em Reais (BRL).

6.2. A ETHER retém uma comissão sobre cada venda, conforme o plano do vendedor:
- Starter: 25% (vendedor recebe 75%)
- Pro: 20% (vendedor recebe 80%)
- Enterprise: 15% (vendedor recebe 85%)

6.3. Os pagamentos são processados mensalmente via Stripe.

6.4. O valor mínimo para saque é de R$50,00.`
        },
        {
            title: '7. Reembolsos',
            content: `7.1. Compradores podem solicitar reembolso em até 7 dias após a compra.

7.2. O reembolso será concedido se:
- O produto não foi utilizado em projetos publicados
- Houver defeito técnico comprovado no arquivo
- O produto diferir significativamente da descrição

7.3. A ETHER reserva-se o direito de recusar reembolsos em casos de abuso.`
        },
        {
            title: '8. Propriedade Intelectual',
            content: `8.1. A ETHER e sua logomarca são marcas registradas. Você não pode usar estas marcas sem autorização prévia.

8.2. Todo o conteúdo da Plataforma (exceto uploads de usuários) é propriedade da ETHER ou licenciado para ela.

8.3. Você não pode copiar, modificar ou distribuir qualquer parte da Plataforma sem autorização.`
        },
        {
            title: '9. Limitação de Responsabilidade',
            content: `9.1. O Serviço é fornecido "como está" sem garantias de qualquer tipo.

9.2. A ETHER não será responsável por:
- Danos indiretos, incidentais ou consequentes
- Perda de dados ou interrupção de negócios
- Conteúdo de terceiros disponível através do Serviço

9.3. Nossa responsabilidade total será limitada ao valor pago por você nos últimos 12 meses.`
        },
        {
            title: '10. Modificações dos Termos',
            content: `10.1. Reservamo-nos o direito de modificar estes termos a qualquer momento.

10.2. Notificaremos sobre mudanças significativas por e-mail ou através da Plataforma.

10.3. O uso continuado do Serviço após as modificações constitui aceitação dos novos termos.`
        },
        {
            title: '11. Lei Aplicável',
            content: `Estes Termos serão regidos e interpretados de acordo com as leis do Brasil, sem consideração a conflitos de disposições legais.

Para quaisquer disputas relacionadas a estes Termos, fica eleito o foro da comarca de São Paulo, SP.`
        },
        {
            title: '12. Contato',
            content: `Para questões sobre estes Termos de Uso, entre em contato:

E-mail: legal@ether.io
Endereço: São Paulo, SP - Brasil`
        }
    ]

    return (
        <>
            <Header />
            <CartDrawer />

            <main className="min-h-screen pt-24 pb-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                            <FileText className="w-5 h-5 text-cyan-400" />
                            <span className="text-white/60">Documento Legal</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Termos de Uso
                        </h1>
                        <p className="text-white/60">
                            Última atualização: {lastUpdated}
                        </p>
                    </motion.div>

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="space-y-8"
                    >
                        {sections.map((section, idx) => (
                            <motion.section
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ delay: idx * 0.02 }}
                                className="rounded-2xl glass p-6 md:p-8"
                            >
                                <h2 className="text-xl font-semibold text-white mb-4">
                                    {section.title}
                                </h2>
                                <div className="text-white/70 whitespace-pre-line leading-relaxed">
                                    {section.content}
                                </div>
                            </motion.section>
                        ))}
                    </motion.div>

                    {/* Footer Note */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="mt-12 text-center text-white/40 text-sm"
                    >
                        <p>
                            Ao usar a ETHER, você concorda com estes Termos de Uso e nossa{' '}
                            <a href="/privacy" className="text-cyan-400 hover:underline">
                                Política de Privacidade
                            </a>
                            .
                        </p>
                    </motion.div>
                </div>
            </main>

            <Footer />
        </>
    )
}
