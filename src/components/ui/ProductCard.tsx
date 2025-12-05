'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { Product } from '@/types'
import { useCartStore } from '@/store'
import { ShoppingCart, Play, Eye } from 'lucide-react'

interface ProductCardProps {
    product: Product
    locale?: string
}

export function ProductCard({ product, locale = 'pt-BR' }: ProductCardProps) {
    const [isHovered, setIsHovered] = React.useState(false)
    const [isVideoLoaded, setIsVideoLoaded] = React.useState(false)
    const videoRef = React.useRef<HTMLVideoElement>(null)
    const addItem = useCartStore((state) => state.addItem)

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: locale === 'pt-BR' ? 'BRL' : 'USD',
        }).format(price)
    }

    React.useEffect(() => {
        if (isHovered && videoRef.current && isVideoLoaded) {
            videoRef.current.play().catch(() => { })
        } else if (videoRef.current) {
            videoRef.current.pause()
            videoRef.current.currentTime = 0
        }
    }, [isHovered, isVideoLoaded])

    return (
        <motion.div
            className={cn(
                'group relative rounded-2xl overflow-hidden',
                'bg-white/[0.02] border border-white/[0.08]',
                'transition-all duration-500'
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{
                borderColor: 'rgba(0, 240, 255, 0.3)',
                boxShadow: '0 0 40px rgba(0, 240, 255, 0.15), 0 0 80px rgba(112, 0, 255, 0.1)',
            }}
        >
            {/* Media Container */}
            <div className="relative aspect-video overflow-hidden">
                {/* Thumbnail */}
                <div
                    className={cn(
                        'absolute inset-0 bg-cover bg-center transition-opacity duration-300',
                        isHovered && isVideoLoaded ? 'opacity-0' : 'opacity-100'
                    )}
                    style={{
                        backgroundImage: product.assets?.[0]?.s3_key_thumb
                            ? `url(${product.assets[0].s3_key_thumb})`
                            : 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
                    }}
                />

                {/* Video Preview */}
                <video
                    ref={videoRef}
                    className={cn(
                        'absolute inset-0 w-full h-full object-cover transition-opacity duration-300',
                        isHovered && isVideoLoaded ? 'opacity-100' : 'opacity-0'
                    )}
                    src={product.assets?.[0]?.s3_key_preview || ''}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    onLoadedData={() => setIsVideoLoaded(true)}
                />

                {/* Play Icon Overlay */}
                <AnimatePresence>
                    {!isHovered && (
                        <motion.div
                            className="absolute inset-0 flex items-center justify-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <div className="w-14 h-14 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center border border-white/20">
                                <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Exclusive Badge */}
                {product.is_exclusive && (
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-cyan-500 to-violet-500 text-white">
                        {locale === 'pt-BR' ? 'Exclusivo' : 'Exclusive'}
                    </div>
                )}

                {/* Specs Overlay */}
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                        >
                            <div className="flex gap-3 text-xs text-white/70">
                                <span>{product.resolution}</span>
                                <span>{product.fps} FPS</span>
                                <span>{product.codec}</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Info Section */}
            <div className="p-4">
                <h3 className="font-semibold text-white truncate mb-1">{product.title}</h3>
                {product.vendor && (
                    <p className="text-sm text-white/50 mb-3">
                        {locale === 'pt-BR' ? 'por' : 'by'} {product.vendor.brand_name || 'Unknown'}
                    </p>
                )}

                <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gradient">
                        {formatPrice(product.price)}
                    </span>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                        <motion.button
                            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Eye className="w-4 h-4 text-white/70" />
                        </motion.button>
                        <motion.button
                            className="p-2 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-600 transition-all hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => addItem(product)}
                        >
                            <ShoppingCart className="w-4 h-4 text-white" />
                        </motion.button>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
