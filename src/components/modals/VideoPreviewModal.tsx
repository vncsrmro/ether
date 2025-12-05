'use client'

import React from 'react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Play, Download, ShoppingCart, Heart, Share2 } from 'lucide-react'
import { useCartStore, useWishlistStore } from '@/store'

interface VideoPreviewModalProps {
    isOpen: boolean
    onClose: () => void
    data: any // Product Data
}

export function VideoPreviewModal({ isOpen, onClose, data }: VideoPreviewModalProps) {
    const { addItem } = useCartStore()
    const { toggleItem, isInWishlist } = useWishlistStore()
    const videoRef = React.useRef<HTMLVideoElement>(null)

    if (!data) return null

    // Helper to get best URL
    const videoUrl = data.assets?.[0]?.preview_url || data.assets?.[0]?.url || ''
    const posterUrl = data.assets?.[0]?.thumb || ''

    const handleAddToCart = () => {
        addItem(data)
        onClose() // Optional: close or keep open
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-4xl bg-black border-white/10 p-0 overflow-hidden">
            <div className="grid md:grid-cols-3 h-[80vh] md:h-[600px]">
                {/* Video Area */}
                <div className="md:col-span-2 bg-black relative flex items-center justify-center">
                    {videoUrl ? (
                        <video
                            src={videoUrl}
                            controls
                            autoPlay
                            className="w-full h-full object-contain"
                            poster={posterUrl}
                        />
                    ) : (
                        <div className="text-white/40 flex flex-col items-center">
                            <Play className="w-12 h-12 mb-2 opacity-50" />
                            <p>Preview indisponível</p>
                        </div>
                    )}
                </div>

                {/* Details Area */}
                <div className="bg-[#111] p-6 flex flex-col border-l border-white/10">
                    <div className="mb-auto">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="px-2 py-1 rounded bg-cyan-500/10 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                                {data.codec || 'H.264'}
                            </div>
                            <div className="px-2 py-1 rounded bg-white/10 text-white/60 text-xs font-bold uppercase tracking-wider">
                                {data.resolution || '4K'}
                            </div>
                            <div className="px-2 py-1 rounded bg-white/10 text-white/60 text-xs font-bold uppercase tracking-wider">
                                {data.fps || '60'} FPS
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold text-white mb-2 leading-tight">{data.title}</h2>

                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500" />
                            <span className="text-sm text-white/60 hover:text-white cursor-pointer transition-colors">
                                {data.vendor?.brand_name || 'Vendor Name'}
                            </span>
                        </div>

                        <p className="text-white/60 text-sm leading-relaxed mb-6">
                            {data.description || 'Sem descrição disponível para este produto.'}
                        </p>

                        <div className="space-y-3">
                            <div className="flex justify-between text-sm py-2 border-b border-white/5">
                                <span className="text-white/40">Duração</span>
                                <span className="text-white">{data.duration ? `${data.duration}s` : '--'}</span>
                            </div>
                            <div className="flex justify-between text-sm py-2 border-b border-white/5">
                                <span className="text-white/40">Tamanho</span>
                                <span className="text-white">-- MB</span>
                            </div>
                            <div className="flex justify-between text-sm py-2 border-b border-white/5">
                                <span className="text-white/40">Licença</span>
                                <span className="text-white">Commercial</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 space-y-3">
                        <div className="flex items-end justify-between mb-2">
                            <span className="text-sm text-white/40">Preço</span>
                            <span className="text-3xl font-bold text-white">R$ {data.price?.toFixed(2)}</span>
                        </div>

                        <Button size="lg" className="w-full font-bold" onClick={handleAddToCart}>
                            <ShoppingCart className="w-5 h-5 mr-2" />
                            Adicionar ao Carrinho
                        </Button>

                        <div className="grid grid-cols-2 gap-3">
                            <Button
                                variant={isInWishlist(data.id) ? 'default' : 'outline'}
                                className="w-full"
                                onClick={() => toggleItem(data)}
                            >
                                <Heart className={`w-4 h-4 mr-2 ${isInWishlist(data.id) ? 'fill-current' : ''}`} />
                                {isInWishlist(data.id) ? 'Salvo' : 'Salvar'}
                            </Button>
                            <Button variant="outline" className="w-full">
                                <Share2 className="w-4 h-4 mr-2" />
                                Compartilhar
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}
