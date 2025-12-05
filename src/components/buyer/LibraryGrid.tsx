'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Download, Play, Calendar } from 'lucide-react'
import { Product } from '@/types'
import { Button } from '@/components/ui'

interface LibraryItemProps {
    product: Product & { purchasedAt: string }
    index: number
}

export function LibraryItem({ product, index }: LibraryItemProps) {
    const [isHovered, setIsHovered] = React.useState(false)

    // Use preview video if available, otherwise just use image
    const videoRef = React.useRef<HTMLVideoElement>(null)

    React.useEffect(() => {
        if (isHovered && videoRef.current) {
            videoRef.current.play().catch(() => { })
        } else if (videoRef.current) {
            videoRef.current.pause()
            videoRef.current.currentTime = 0
        }
    }, [isHovered])

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group relative rounded-xl overflow-hidden glass hover:bg-white/10 transition-all border border-transparent hover:border-cyan-500/30"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Thumbnail Area */}
            <div className="relative aspect-video bg-black/50 overflow-hidden">
                {/* Helper to show video on hover */}
                {product.assets?.[0] && (product.assets[0].preview_url || product.assets[0].url) && (
                    <video
                        ref={videoRef}
                        src={product.assets[0].preview_url || product.assets[0].url}
                        muted
                        loop
                        playsInline
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'
                            }`}
                    />
                )}

                {/* Cover Image logic (Mock: use first asset thumb or placeholder) */}
                {!isHovered && (
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                        <Play className="w-12 h-12 text-white/20" />
                    </div>
                )}

                <div className="absolute inset-0 p-4 flex flex-col justify-end bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link href={`/product/${product.id}`}>
                        <Button size="sm" variant="secondary" className="w-full mb-2">
                            Ver Detalhes
                        </Button>
                    </Link>
                    <Button size="sm" className="w-full">
                        <Download className="w-4 h-4 mr-2" />
                        Baixar
                    </Button>
                </div>
            </div>

            {/* Info Area */}
            <div className="p-4">
                <h3 className="font-semibold text-white truncate mb-1">{product.title}</h3>
                <div className="flex items-center justify-between text-xs text-white/50">
                    <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(product.purchasedAt).toLocaleDateString()}
                    </span>
                    <span className="bg-white/10 px-2 py-0.5 rounded text-[10px] uppercase">
                        {product.resolution}
                    </span>
                </div>
            </div>
        </motion.div>
    )
}

export function LibraryGrid({ items }: { items: any[] }) {
    if (items.length === 0) {
        return (
            <div className="text-center py-12 rounded-xl border border-dashed border-white/10">
                <p className="text-white/40">Você ainda não tem itens na biblioteca.</p>
                <Link href="/explore" className="text-cyan-400 text-sm hover:underline mt-2 inline-block">
                    Explorar Marketplace
                </Link>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item, idx) => (
                <LibraryItem key={item.id} product={item} index={idx} />
            ))}
        </div>
    )
}
