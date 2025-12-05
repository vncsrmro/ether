'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Play,
    Pause,
    Volume2,
    VolumeX,
    Maximize,
    Download,
    ShoppingCart,
    Heart,
    Share2,
    ChevronLeft,
    Monitor,
    Film,
    Clock,
    Tag,
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { useCartStore } from '@/store'
import { cn } from '@/lib/utils'
import type { Product } from '@/types'

interface ProductDetailProps {
    product: Product
}

export function ProductDetail({ product }: ProductDetailProps) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isMuted, setIsMuted] = useState(true)
    const [progress, setProgress] = useState(0)
    const [isLiked, setIsLiked] = useState(false)
    const addItem = useCartStore((state) => state.addItem)
    const items = useCartStore((state) => state.items)
    const isInCart = items.some((item) => item.product.id === product.id)

    useEffect(() => {
        const video = videoRef.current
        if (!video) return

        const updateProgress = () => {
            setProgress((video.currentTime / video.duration) * 100)
        }

        video.addEventListener('timeupdate', updateProgress)
        return () => video.removeEventListener('timeupdate', updateProgress)
    }, [])

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause()
            } else {
                videoRef.current.play()
            }
            setIsPlaying(!isPlaying)
        }
    }

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted
            setIsMuted(!isMuted)
        }
    }

    const toggleFullscreen = () => {
        if (videoRef.current) {
            videoRef.current.requestFullscreen()
        }
    }

    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - rect.left
        const percentage = x / rect.width
        if (videoRef.current) {
            videoRef.current.currentTime = percentage * videoRef.current.duration
        }
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(price)
    }

    return (
        <div className="min-h-screen bg-[#050505]">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 p-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5" />
                        <span className="text-sm">Voltar</span>
                    </Link>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setIsLiked(!isLiked)}
                            className={cn(
                                'p-2 rounded-xl transition-colors',
                                isLiked
                                    ? 'bg-red-500/20 text-red-400'
                                    : 'bg-white/5 text-white/50 hover:text-white'
                            )}
                        >
                            <Heart className={cn('w-5 h-5', isLiked && 'fill-current')} />
                        </button>
                        <button className="p-2 rounded-xl bg-white/5 text-white/50 hover:text-white transition-colors">
                            <Share2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 pt-24 pb-32">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Video Player */}
                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative aspect-video rounded-2xl overflow-hidden bg-black"
                        >
                            <video
                                ref={videoRef}
                                src={product.assets?.[0]?.s3_key_preview}
                                className="w-full h-full object-cover"
                                loop
                                muted={isMuted}
                                playsInline
                                onClick={togglePlay}
                            />

                            {/* Play Overlay */}
                            <AnimatePresence>
                                {!isPlaying && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
                                        onClick={togglePlay}
                                    >
                                        <motion.div
                                            whileHover={{ scale: 1.1 }}
                                            className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                                        >
                                            <Play className="w-10 h-10 text-white ml-1" fill="white" />
                                        </motion.div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Video Controls */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                                {/* Progress Bar */}
                                <div
                                    className="h-1 bg-white/20 rounded-full mb-4 cursor-pointer"
                                    onClick={handleSeek}
                                >
                                    <motion.div
                                        className="h-full bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={togglePlay}
                                            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                                        >
                                            {isPlaying ? (
                                                <Pause className="w-5 h-5 text-white" />
                                            ) : (
                                                <Play className="w-5 h-5 text-white" />
                                            )}
                                        </button>
                                        <button
                                            onClick={toggleMute}
                                            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                                        >
                                            {isMuted ? (
                                                <VolumeX className="w-5 h-5 text-white" />
                                            ) : (
                                                <Volume2 className="w-5 h-5 text-white" />
                                            )}
                                        </button>
                                    </div>
                                    <button
                                        onClick={toggleFullscreen}
                                        className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                                    >
                                        <Maximize className="w-5 h-5 text-white" />
                                    </button>
                                </div>
                            </div>

                            {/* Exclusive Badge */}
                            {product.is_exclusive && (
                                <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-cyan-500 to-violet-500 text-white">
                                    Exclusivo
                                </div>
                            )}
                        </motion.div>

                        {/* Specs Grid */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6"
                        >
                            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                                <Monitor className="w-5 h-5 text-cyan-400 mb-2" />
                                <p className="text-sm text-white/50">Resolução</p>
                                <p className="text-lg font-semibold text-white">{product.resolution}</p>
                            </div>
                            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                                <Film className="w-5 h-5 text-cyan-400 mb-2" />
                                <p className="text-sm text-white/50">Frame Rate</p>
                                <p className="text-lg font-semibold text-white">{product.fps} FPS</p>
                            </div>
                            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                                <Clock className="w-5 h-5 text-cyan-400 mb-2" />
                                <p className="text-sm text-white/50">Duração</p>
                                <p className="text-lg font-semibold text-white">{product.duration}s</p>
                            </div>
                            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                                <Download className="w-5 h-5 text-cyan-400 mb-2" />
                                <p className="text-sm text-white/50">Codec</p>
                                <p className="text-lg font-semibold text-white">{product.codec}</p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Product Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-6"
                    >
                        {/* Vendor */}
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center">
                                <span className="text-sm font-bold text-white">
                                    {product.vendor?.brand_name?.[0] || 'V'}
                                </span>
                            </div>
                            <div>
                                <p className="text-sm text-white/50">Criado por</p>
                                <p className="text-white font-medium">
                                    {product.vendor?.brand_name || 'Vendedor'}
                                </p>
                            </div>
                        </div>

                        {/* Title & Price */}
                        <div>
                            <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                                {product.title}
                            </h1>
                            <p className="text-4xl font-bold text-gradient">
                                {formatPrice(product.price)}
                            </p>
                        </div>

                        {/* Description */}
                        <p className="text-white/60">
                            {product.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                            {product.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-sm bg-white/5 text-white/50"
                                >
                                    <Tag className="w-3 h-3" />
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Actions */}
                        <div className="space-y-3 pt-4">
                            <Button
                                onClick={() => addItem(product)}
                                disabled={isInCart}
                                variant="default"
                                size="xl"
                                className="w-full"
                                magnetic
                            >
                                {isInCart ? (
                                    'Já está no carrinho'
                                ) : (
                                    <>
                                        <ShoppingCart className="w-5 h-5" />
                                        Adicionar ao Carrinho
                                    </>
                                )}
                            </Button>
                            <Button variant="secondary" size="lg" className="w-full">
                                <Download className="w-5 h-5" />
                                Baixar Preview
                            </Button>
                        </div>

                        {/* License Info */}
                        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                            <h4 className="text-sm font-semibold text-white mb-2">
                                Licença Comercial Incluída
                            </h4>
                            <ul className="text-xs text-white/50 space-y-1">
                                <li>✓ Uso em projetos comerciais</li>
                                <li>✓ Uso em performances ao vivo</li>
                                <li>✓ Sem atribuição necessária</li>
                                <li>✓ Download em alta qualidade</li>
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
