'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Header, Footer, CartDrawer } from '@/components/layout'
import { Shield } from 'lucide-react'

export default function PrivacyPage() {
    const lastUpdated = '05 de Dezembro de 2024'

    const sections = [
        {
            title: '1. Introdução',
            content: `A ETHER ("nós", "nosso" ou "Plataforma") está comprometida em proteger sua privacidade. Esta Política de Privacidade explica como coletamos, usamos, divulgamos e protegemos suas informações quando você usa nosso serviço.

Esta política está em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018) e outras regulamentações aplicáveis.`
        },
        {
            title: '2. Informações que Coletamos',
            content: `2.1. Informações fornecidas por você:
- Nome e sobrenome
- Endereço de e-mail
- Informações de pagamento (processadas pelo Stripe)
- Foto de perfil (opcional)
- Nome da marca/empresa (para vendedores)

2.2. Informações coletadas automaticamente:
- Endereço IP
- Tipo de navegador e dispositivo
- Páginas visitadas e tempo de permanência
- Cookies e tecnologias similares

2.3. Informações de terceiros:
- Dados de autenticação via Google/GitHub (se aplicável)
- Informações do Stripe para processamento de pagamentos`
        },
        {
            title: '3. Como Usamos Suas Informações',
            content: `Utilizamos suas informações para:

- Fornecer, manter e melhorar nossos serviços
- Processar transações e enviar notificações relacionadas
- Enviar comunicações de marketing (com seu consentimento)
- Responder a solicitações de suporte
- Detectar e prevenir fraudes
- Cumprir obrigações legais
- Personalizar sua experiência na plataforma
- Gerar análises e estatísticas agregadas`
        },
        {
            title: '4. Base Legal para Processamento (LGPD)',
            content: `Processamos seus dados pessoais com base em:

- Execução de contrato: Para fornecer nossos serviços
- Consentimento: Para marketing e cookies não essenciais
- Obrigação legal: Para cumprimento de leis e regulamentos
- Interesse legítimo: Para melhorar nossos serviços e segurança

Você pode retirar seu consentimento a qualquer momento através das configurações de sua conta ou entrando em contato conosco.`
        },
        {
            title: '5. Compartilhamento de Informações',
            content: `Podemos compartilhar suas informações com:

5.1. Prestadores de serviço:
- Stripe (processamento de pagamentos)
- Supabase (banco de dados)
- Vercel (hospedagem)
- Serviços de e-mail

5.2. Outros usuários:
- Seu nome de marca/perfil é visível publicamente se você for vendedor
- Compradores podem ver informações públicas de vendedores

5.3. Autoridades legais:
- Quando exigido por lei ou ordem judicial

Não vendemos seus dados pessoais a terceiros.`
        },
        {
            title: '6. Cookies e Tecnologias de Rastreamento',
            content: `Utilizamos cookies para:

- Manter sua sessão ativa
- Lembrar suas preferências
- Análise de uso (Google Analytics)
- Funcionalidades essenciais

Tipos de cookies:
- Essenciais: Necessários para funcionamento do site
- Funcionais: Melhoram sua experiência
- Analíticos: Nos ajudam a entender o uso

Você pode gerenciar cookies através das configurações do seu navegador.`
        },
        {
            title: '7. Segurança dos Dados',
            content: `Implementamos medidas de segurança para proteger suas informações:

- Criptografia SSL/TLS para dados em trânsito
- Criptografia de dados sensíveis em repouso
- Controles de acesso rigorosos
- Monitoramento de segurança contínuo
- Backups regulares

Nenhum sistema é 100% seguro. Em caso de violação de dados, notificaremos você e as autoridades conforme exigido por lei.`
        },
        {
            title: '8. Seus Direitos (LGPD)',
            content: `Você tem os seguintes direitos:

- Acesso: Solicitar cópia de seus dados pessoais
- Correção: Corrigir dados incompletos ou incorretos
- Exclusão: Solicitar remoção de seus dados
- Portabilidade: Receber seus dados em formato estruturado
- Oposição: Opor-se ao processamento em certas circunstâncias
- Revogação: Retirar consentimento a qualquer momento

Para exercer esses direitos, entre em contato: privacidade@ether.io`
        },
        {
            title: '9. Retenção de Dados',
            content: `Mantemos seus dados pelo tempo necessário para:

- Fornecer nossos serviços
- Cumprir obrigações legais (ex: fiscais - 5 anos)
- Resolver disputas
- Fazer cumprir nossos acordos

Após encerramento da conta, mantemos alguns dados por períodos legais obrigatórios. Dados de transações são mantidos por 5 anos conforme legislação fiscal.`
        },
        {
            title: '10. Transferência Internacional',
            content: `Seus dados podem ser transferidos e processados em servidores localizados fora do Brasil, incluindo Estados Unidos e União Europeia.

Garantimos que essas transferências estão em conformidade com a LGPD através de:
- Cláusulas contratuais padrão
- Certificações de adequação
- Consentimento específico quando aplicável`
        },
        {
            title: '11. Menores de Idade',
            content: `Nossos serviços não são destinados a menores de 18 anos. Não coletamos intencionalmente informações de menores.

Se tomarmos conhecimento de que coletamos dados de um menor, tomaremos medidas para excluir essas informações.`
        },
        {
            title: '12. Alterações nesta Política',
            content: `Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos sobre mudanças significativas através de:

- E-mail para o endereço cadastrado
- Aviso destacado na Plataforma

Recomendamos revisar esta política regularmente. O uso continuado após alterações constitui aceitação da política atualizada.`
        },
        {
            title: '13. Contato e DPO',
            content: `Para questões sobre privacidade ou para exercer seus direitos:

Encarregado de Proteção de Dados (DPO):
E-mail: privacidade@ether.io

Contato Geral:
E-mail: contato@ether.io
Endereço: São Paulo, SP - Brasil

Você também pode registrar reclamação junto à Autoridade Nacional de Proteção de Dados (ANPD): www.gov.br/anpd`
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
                            <Shield className="w-5 h-5 text-green-400" />
                            <span className="text-white/60">Sua Privacidade Importa</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Política de Privacidade
                        </h1>
                        <p className="text-white/60">
                            Última atualização: {lastUpdated}
                        </p>
                    </motion.div>

                    {/* LGPD Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mb-8 p-4 rounded-2xl bg-green-500/10 border border-green-500/20 text-center"
                    >
                        <p className="text-green-400 text-sm">
                            ✓ Em conformidade com a Lei Geral de Proteção de Dados (LGPD)
                        </p>
                    </motion.div>

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
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
                            Ao usar a ETHER, você concorda com nossa Política de Privacidade e nossos{' '}
                            <a href="/terms" className="text-cyan-400 hover:underline">
                                Termos de Uso
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
