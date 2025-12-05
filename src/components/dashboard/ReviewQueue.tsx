'use client'

import { useState } from 'react'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import {
    Check,
    X,
    Play,
    ChevronLeft,
    ChevronRight,
    Eye,
    Tag,
    Clock,
    Monitor,
    Film,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import type { Product } from '@/types'

// Mock pending products
const mockPendingProducts: Product[] = [
    {
        id: '1',
        vendor_id: 'v1',
        title: 'Cosmic Nebula Explosion',
        description: 'A stunning cosmic explosion with vibrant colors and particles',
        price: 59.90,
        resolution: '4K',
        fps: 60,
        codec: 'ProRes',
        duration: 12,
        tags: ['space', 'cosmic', 'explosion', 'particles'],
        is_exclusive: true,
        status: 'pending',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        vendor: {
            id: 'v1',
            email: 'cosmic@example.com',
            role: 'vendor',
            brand_name: 'CosmicFX',
            avatar_url: null,
            stripe_account_id: null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        },
        assets: [{
            id: 'a1',
            product_id: '1',
            s3_key_original: '',
            s3_key_preview: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-digital-waves-33287-large.mp4',
            s3_key_thumb: '',
            created_at: new Date().toISOString(),
        }],
    },
    {
        id: '2',
        vendor_id: 'v2',
        title: 'Liquid Gold Flow',
        description: 'Mesmerizing liquid gold flowing in slow motion',
        price: 44.90,
        resolution: '4K',
        fps: 30,
        codec: 'H.264',
        duration: 15,
        tags: ['liquid', 'gold', 'flow', 'metallic'],
        is_exclusive: false,
        status: 'pending',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        vendor: {
            id: 'v2',
            email: 'liquid@example.com',
            role: 'vendor',
            brand_name: 'LiquidMotion',
            avatar_url: null,
            stripe_account_id: null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        },
        assets: [{
            id: 'a2',
            product_id: '2',
            s3_key_original: '',
            s3_key_preview: 'https://assets.mixkit.co/videos/preview/mixkit-ink-swirling-in-water-69-large.mp4',
            s3_key_thumb: '',
            created_at: new Date().toISOString(),
        }],
    },
    {
        id: '3',
        vendor_id: 'v3',
        title: 'Neon City Skyline',
        description: 'Futuristic neon city with animated lights',
        price: 39.90,
        resolution: '1080p',
        fps: 30,
        codec: 'H.264',
        duration: 20,
        tags: ['city', 'neon', 'futuristic', 'skyline'],
        is_exclusive: false,
        status: 'pending',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        vendor: {
            id: 'v3',
            email: 'neon@example.com',
            role: 'vendor',
            brand_name: 'NeonScapes',
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
]

export function ReviewQueue() {
    const [products, setProducts] = useState(mockPendingProducts)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [direction, setDirection] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)

    const currentProduct = products[currentIndex]
    const hasNext = currentIndex < products.length - 1
    const hasPrev = currentIndex > 0

    const handleApprove = () => {
        setDirection(1)
        setProducts((prev) => prev.filter((_, i) => i !== currentIndex))
        if (currentIndex >= products.length - 1 && currentIndex > 0) {
            setCurrentIndex(currentIndex - 1)
        }
    }

    const handleReject = () => {
        setDirection(-1)
        setProducts((prev) => prev.filter((_, i) => i !== currentIndex))
        if (currentIndex >= products.length - 1 && currentIndex > 0) {
            setCurrentIndex(currentIndex - 1)
        }
    }

    const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        const threshold = 100
        if (info.offset.x > threshold) {
            handleApprove()
        } else if (info.offset.x < -threshold) {
            handleReject()
        }
    }

    const navigate = (dir: 'prev' | 'next') => {
        if (dir === 'prev' && hasPrev) {
            setCurrentIndex((prev) => prev - 1)
        } else if (dir === 'next' && hasNext) {
            setCurrentIndex((prev) => prev + 1)
        }
    }

    if (products.length === 0) {
        return (
            <div className="space-y-8">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-white">
                        Fila de Revisão
                    </h1>
                    <p className="text-white/50 mt-1">
                        Aprove ou rejeite loops pendentes
                    </p>
                </div>

                <div className="flex flex-col items-center justify-center py-24 text-center">
                    <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
                        <Check className="w-10 h-10 text-green-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                        Tudo revisado!
                    </h3>
                    <p className="text-white/50">
                        Não há loops pendentes para revisão.
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-white">
                        Fila de Revisão
                    </h1>
                    <p className="text-white/50 mt-1">
                        {products.length} loop(s) pendente(s)
                    </p>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/50">
                    <span>{currentIndex + 1} / {products.length}</span>
                </div>
            </div>

            {/* Review Card */}
            <div className="relative max-w-2xl mx-auto">
                {/* Navigation Buttons */}
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-10 px-4">
                    <button
                        onClick={() => navigate('prev')}
                        disabled={!hasPrev}
                        className={cn(
                            'pointer-events-auto w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center transition-all',
                            hasPrev
                                ? 'text-white hover:bg-black/70'
                                : 'text-white/20 cursor-not-allowed'
                        )}
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={() => navigate('next')}
                        disabled={!hasNext}
                        className={cn(
                            'pointer-events-auto w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center transition-all',
                            hasNext
                                ? 'text-white hover:bg-black/70'
                                : 'text-white/20 cursor-not-allowed'
                        )}
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>

                {/* Card */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentProduct.id}
                        initial={{ opacity: 0, scale: 0.9, x: direction * 100 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9, x: -direction * 100 }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        onDragEnd={handleDragEnd}
                        className="relative rounded-2xl overflow-hidden bg-white/[0.02] border border-white/[0.06] cursor-grab active:cursor-grabbing"
                    >
                        {/* Video Preview */}
                        <div className="relative aspect-video">
                            <video
                                src={currentProduct.assets?.[0]?.s3_key_preview}
                                className="w-full h-full object-cover"
                                loop
                                muted
                                autoPlay={isPlaying}
                                playsInline
                            />

                            {/* Play Button Overlay */}
                            {!isPlaying && (
                                <button
                                    onClick={() => setIsPlaying(true)}
                                    className="absolute inset-0 flex items-center justify-center bg-black/30"
                                >
                                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                        <Play className="w-8 h-8 text-white ml-1" fill="white" />
                                    </div>
                                </button>
                            )}

                            {/* Exclusive Badge */}
                            {currentProduct.is_exclusive && (
                                <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-cyan-500 to-violet-500 text-white">
                                    Exclusivo
                                </div>
                            )}
                        </div>

                        {/* Product Info */}
                        <div className="p-6 space-y-4">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="text-xl font-semibold text-white">
                                        {currentProduct.title}
                                    </h3>
                                    <p className="text-sm text-white/50 mt-1">
                                        por {currentProduct.vendor?.brand_name}
                                    </p>
                                </div>
                                <span className="text-2xl font-bold text-gradient">
                                    R$ {currentProduct.price.toFixed(2)}
                                </span>
                            </div>

                            <p className="text-sm text-white/70">
                                {currentProduct.description}
                            </p>

                            {/* Specs */}
                            <div className="grid grid-cols-4 gap-3">
                                <div className="p-3 rounded-xl bg-white/5 text-center">
                                    <Monitor className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                                    <span className="text-xs text-white/70">{currentProduct.resolution}</span>
                                </div>
                                <div className="p-3 rounded-xl bg-white/5 text-center">
                                    <Film className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                                    <span className="text-xs text-white/70">{currentProduct.fps} FPS</span>
                                </div>
                                <div className="p-3 rounded-xl bg-white/5 text-center">
                                    <Clock className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                                    <span className="text-xs text-white/70">{currentProduct.duration}s</span>
                                </div>
                                <div className="p-3 rounded-xl bg-white/5 text-center">
                                    <Eye className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                                    <span className="text-xs text-white/70">{currentProduct.codec}</span>
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2">
                                {currentProduct.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-2 py-1 rounded-lg text-xs bg-white/5 text-white/50"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Action Buttons */}
                <div className="flex items-center justify-center gap-4 mt-6">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleReject}
                        className="w-16 h-16 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-400 hover:bg-red-500/30 transition-colors"
                    >
                        <X className="w-8 h-8" />
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleApprove}
                        className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center text-green-400 hover:bg-green-500/30 transition-colors"
                    >
                        <Check className="w-8 h-8" />
                    </motion.button>
                </div>

                {/* Swipe Hint */}
                <p className="text-center text-xs text-white/30 mt-4">
                    Arraste para a direita para aprovar, esquerda para rejeitar
                </p>
            </div>
        </div>
    )
}
