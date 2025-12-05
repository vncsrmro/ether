'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { useUIStore, useCartStore } from '@/store'
import { Button } from '@/components/ui/Button'
import { X, ShoppingBag, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export function CartDrawer() {
    const t = useTranslations()
    const { isCartOpen, setCartOpen } = useUIStore()
    const { items, removeItem, clearCart, getTotal } = useCartStore()
    const locale = useUIStore((state) => state.locale)

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: locale === 'pt-BR' ? 'BRL' : 'USD',
        }).format(price)
    }

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                        onClick={() => setCartOpen(false)}
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className={cn(
                            'fixed right-0 top-0 bottom-0 w-full max-w-md z-50',
                            'bg-[#0a0a0a] border-l border-white/[0.06]',
                            'flex flex-col'
                        )}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/[0.06]">
                            <div className="flex items-center gap-3">
                                <ShoppingBag className="w-5 h-5 text-cyan-400" />
                                <h2 className="text-lg font-semibold text-white">
                                    {t('cart.title')}
                                </h2>
                                {items.length > 0 && (
                                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-white/10 text-white/70">
                                        {items.length}
                                    </span>
                                )}
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setCartOpen(false)}
                            >
                                <X className="w-5 h-5" />
                            </Button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-6">
                            {items.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-center">
                                    <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
                                        <ShoppingBag className="w-8 h-8 text-white/30" />
                                    </div>
                                    <p className="text-white/50">{t('cart.empty')}</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {items.map((item) => (
                                        <motion.div
                                            key={item.product.id}
                                            layout
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="flex gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]"
                                        >
                                            {/* Thumbnail */}
                                            <div
                                                className="w-20 h-14 rounded-lg bg-cover bg-center flex-shrink-0"
                                                style={{
                                                    backgroundImage: item.product.assets?.[0]?.s3_key_thumb
                                                        ? `url(${item.product.assets[0].s3_key_thumb})`
                                                        : 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
                                                }}
                                            />

                                            {/* Info */}
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-sm font-medium text-white truncate">
                                                    {item.product.title}
                                                </h4>
                                                <p className="text-xs text-white/50 mt-1">
                                                    {item.product.resolution} • {item.product.fps} FPS
                                                </p>
                                            </div>

                                            {/* Price & Remove */}
                                            <div className="flex flex-col items-end justify-between">
                                                <span className="text-sm font-semibold text-gradient">
                                                    {formatPrice(item.product.price)}
                                                </span>
                                                <button
                                                    onClick={() => removeItem(item.product.id)}
                                                    className="text-white/40 hover:text-red-400 transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="p-6 border-t border-white/[0.06] space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-white/70">{t('cart.total')}</span>
                                    <span className="text-xl font-bold text-white">
                                        {formatPrice(getTotal())}
                                    </span>
                                </div>
                                <Button variant="default" size="lg" className="w-full" magnetic>
                                    {t('cart.checkout')}
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="w-full"
                                    onClick={() => setCartOpen(false)}
                                >
                                    {t('cart.continue')}
                                </Button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
