'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import {
    Twitter,
    Instagram,
    Youtube,
    Mail
} from 'lucide-react'

export function Footer() {
    const t = useTranslations()
    const currentYear = new Date().getFullYear()

    const footerLinks = {
        marketplace: [
            { href: '/explore', label: t('nav.explore') },
            { href: '/trending', label: t('nav.trending') },
            { href: '/collections', label: t('nav.collections') },
            { href: '/vendors', label: t('nav.vendors') },
        ],
        company: [
            { href: '/about', label: t('nav.about') },
            { href: '/pricing', label: t('nav.pricing') },
            { href: '/support', label: t('footer.support') },
        ],
        legal: [
            { href: '/terms', label: t('footer.terms') },
            { href: '/privacy', label: t('footer.privacy') },
        ],
    }

    const socialLinks = [
        { href: 'https://twitter.com', icon: Twitter, label: 'Twitter' },
        { href: 'https://instagram.com', icon: Instagram, label: 'Instagram' },
        { href: 'https://youtube.com', icon: Youtube, label: 'YouTube' },
        { href: 'mailto:contact@ether.io', icon: Mail, label: 'Email' },
    ]

    return (
        <footer className="relative border-t border-white/[0.06] bg-black/40">
            {/* Gradient Background */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-[120px]" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
                    {/* Brand */}
                    <div className="col-span-2 lg:col-span-2">
                        <Link href="/" className="flex items-center gap-3 mb-6">
                            <div className="relative w-10 h-10 rounded-xl overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-violet-500 to-silver" />
                                <div className="absolute inset-[2px] bg-black rounded-lg flex items-center justify-center">
                                    <span className="text-lg font-bold holographic-text">E</span>
                                </div>
                            </div>
                            <span className="text-xl font-bold tracking-tight text-white">
                                ETHER
                            </span>
                        </Link>
                        <p className="text-white/50 text-sm max-w-xs mb-6">
                            Premium VJ loops and motion graphics for visual artists worldwide.
                        </p>
                        <div className="flex gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
                                >
                                    <social.icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Marketplace Links */}
                    <div>
                        <h4 className="text-sm font-semibold text-white mb-4">Marketplace</h4>
                        <ul className="space-y-3">
                            {footerLinks.marketplace.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-white/50 hover:text-white transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h4 className="text-sm font-semibold text-white mb-4">Company</h4>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-white/50 hover:text-white transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h4 className="text-sm font-semibold text-white mb-4">Legal</h4>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-white/50 hover:text-white transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-white/40">
                        © {currentYear} ETHER. {t('footer.copyright')}.
                    </p>
                    <p className="text-sm text-white/40">
                        {t('footer.madeWith')}{' '}
                        <a
                            href="https://inovasys.digital"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gradient hover:opacity-80 transition-opacity"
                        >
                            InovaSys
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    )
}
