'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { ProductCard } from '@/components/ui/ProductCard'
import { Button } from '@/components/ui/Button'
import { ArrowRight, TrendingUp } from 'lucide-react'
import type { Product } from '@/types'

// Mock data - replace with actual data from Supabase
const mockProducts: Product[] = [
    {
        id: '1',
        vendor_id: 'v1',
        title: 'Neon Waves Abstract',
        description: 'Flowing neon waves with dynamic color transitions',
        price: 49.90,
        resolution: '4K',
        fps: 60,
        codec: 'ProRes',
        duration: 10,
        tags: ['abstract', 'neon', 'waves'],
        is_exclusive: true,
        status: 'approved',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        vendor: {
            id: 'v1',
            email: 'artist@example.com',
            role: 'vendor',
            brand_name: 'NeonLabs',
            avatar_url: null,
            stripe_account_id: null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        },
        assets: [{
            id: 'a1',
            product_id: '1',
            s3_key_original: '',
            s3_key_preview: 'https://assets.mixkit.co/videos/preview/mixkit-ink-swirling-in-water-69-large.mp4',
            s3_key_thumb: '',
            created_at: new Date().toISOString(),
        }],
    },
    {
        id: '2',
        vendor_id: 'v2',
        title: 'Cyber Grid Matrix',
        description: 'Futuristic grid with glowing lines',
        price: 39.90,
        resolution: '4K',
        fps: 30,
        codec: 'H.264',
        duration: 15,
        tags: ['cyber', 'grid', 'tech'],
        is_exclusive: false,
        status: 'approved',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        vendor: {
            id: 'v2',
            email: 'cyber@example.com',
            role: 'vendor',
            brand_name: 'CyberVisuals',
            avatar_url: null,
            stripe_account_id: null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        },
        assets: [{
            id: 'a2',
            product_id: '2',
            s3_key_original: '',
            s3_key_preview: 'https://assets.mixkit.co/videos/preview/mixkit-digital-network-technology-background-33288-large.mp4',
            s3_key_thumb: '',
            created_at: new Date().toISOString(),
        }],
    },
    {
        id: '3',
        vendor_id: 'v3',
        title: 'Particle Storm',
        description: 'Explosive particle effects in 4K',
        price: 59.90,
        resolution: '4K',
        fps: 60,
        codec: 'ProRes',
        duration: 8,
        tags: ['particles', 'explosion', 'dynamic'],
        is_exclusive: true,
        status: 'approved',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        vendor: {
            id: 'v3',
            email: 'particles@example.com',
            role: 'vendor',
            brand_name: 'ParticleFX',
            avatar_url: null,
            stripe_account_id: null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        },
        assets: [{
            id: 'a3',
            product_id: '3',
            s3_key_original: '',
            s3_key_preview: 'https://assets.mixkit.co/videos/preview/mixkit-colorful-neon-lights-2989-large.mp4',
            s3_key_thumb: '',
            created_at: new Date().toISOString(),
        }],
    },
    {
        id: '4',
        vendor_id: 'v1',
        title: 'Liquid Chrome',
        description: 'Metallic liquid simulation',
        price: 44.90,
        resolution: '1080p',
        fps: 30,
        codec: 'H.265',
        duration: 12,
        tags: ['liquid', 'chrome', 'metallic'],
        is_exclusive: false,
        status: 'approved',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        vendor: {
            id: 'v1',
            email: 'artist@example.com',
            role: 'vendor',
            brand_name: 'NeonLabs',
            avatar_url: null,
            stripe_account_id: null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        },
        assets: [{
            id: 'a4',
            product_id: '4',
            s3_key_original: '',
            s3_key_preview: 'https://assets.mixkit.co/videos/preview/mixkit-curvy-lines-of-lights-go-through-the-screen-in-a-15436-large.mp4',
            s3_key_thumb: '',
            created_at: new Date().toISOString(),
        }],
    },
    {
        id: '5',
        vendor_id: 'v4',
        title: 'Geometric Tunnel',
        description: 'Infinite geometric tunnel loop',
        price: 34.90,
        resolution: '4K',
        fps: 60,
        codec: 'ProRes',
        duration: 20,
        tags: ['geometric', 'tunnel', 'loop'],
        is_exclusive: false,
        status: 'approved',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        vendor: {
            id: 'v4',
            email: 'geo@example.com',
            role: 'vendor',
            brand_name: 'GeoMotion',
            avatar_url: null,
            stripe_account_id: null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        },
        assets: [{
            id: 'a5',
            product_id: '5',
            s3_key_original: '',
            s3_key_preview: 'https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4',
            s3_key_thumb: '',
            created_at: new Date().toISOString(),
        }],
    },
    {
        id: '6',
        vendor_id: 'v2',
        title: 'Aurora Lights',
        description: 'Natural aurora borealis effect',
        price: 29.90,
        resolution: '4K',
        fps: 30,
        codec: 'H.264',
        duration: 30,
        tags: ['aurora', 'nature', 'lights'],
        is_exclusive: false,
        status: 'approved',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        vendor: {
            id: 'v2',
            email: 'cyber@example.com',
            role: 'vendor',
            brand_name: 'CyberVisuals',
            avatar_url: null,
            stripe_account_id: null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        },
        assets: [{
            id: 'a6',
            product_id: '6',
            s3_key_original: '',
            s3_key_preview: 'https://assets.mixkit.co/videos/preview/mixkit-multicolored-lights-in-a-dark-place-4395-large.mp4',
            s3_key_thumb: '',
            created_at: new Date().toISOString(),
        }],
    },
]

export function TrendingSection() {
    const t = useTranslations()
    const sectionRef = useRef<HTMLElement>(null)

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    })

    const backgroundY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

    return (
        <section
            ref={sectionRef}
            className="relative py-24 sm:py-32 overflow-hidden"
        >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/5 to-transparent" />
            <motion.div
                style={{ y: backgroundY }}
                className="absolute inset-0 opacity-30"
            >
                <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[150px]" />
                <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-violet-500/20 rounded-full blur-[150px]" />
            </motion.div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <TrendingUp className="w-5 h-5 text-cyan-400" />
                            <span className="text-sm font-medium text-cyan-400">
                                Trending
                            </span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-white">
                            {t('trending.title')}
                        </h2>
                        <p className="text-white/50 mt-2">
                            {t('trending.subtitle')}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <Button variant="secondary">
                            {t('trending.viewAll')}
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </motion.div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockProducts.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <ProductCard product={product} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
