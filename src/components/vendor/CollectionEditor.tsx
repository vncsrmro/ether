'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, X, Search, Check, Image as ImageIcon } from 'lucide-react'
import { mockVendorProducts } from '@/lib/mock-vendor-data'
import { Button, Input } from '@/components/ui'
import { cn } from '@/lib/utils'

export function CollectionEditor() {
    const [title, setTitle] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [selectedProducts, setSelectedProducts] = React.useState<string[]>([])
    const [isPickerOpen, setIsPickerOpen] = React.useState(false)
    const [pickerSearch, setPickerSearch] = React.useState('')

    // Filter products for picker
    const availableProducts = mockVendorProducts.filter(p =>
        p.title.toLowerCase().includes(pickerSearch.toLowerCase())
    )

    const toggleProduct = (id: string) => {
        if (selectedProducts.includes(id)) {
            setSelectedProducts(selectedProducts.filter(pid => pid !== id))
        } else {
            setSelectedProducts([...selectedProducts, id])
        }
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header Info */}
            <div className="grid md:grid-cols-3 gap-8">
                {/* Cover Uploader */}
                <div className="md:col-span-1">
                    <label className="block text-sm text-white/70 mb-2">Capa da Coleção</label>
                    <div className="aspect-[3/4] rounded-2xl border-2 border-dashed border-white/20 hover:border-cyan-500/50 hover:bg-white/5 transition-all cursor-pointer flex flex-col items-center justify-center text-center p-4">
                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3 text-white/40">
                            <ImageIcon className="w-6 h-6" />
                        </div>
                        <span className="text-sm text-white/60">Clique para upload</span>
                        <span className="text-xs text-white/30 mt-1">1080x1440 recomendado</span>
                    </div>
                </div>

                {/* Info Fields */}
                <div className="md:col-span-2 space-y-6">
                    <div>
                        <label className="block text-sm text-white/70 mb-2">Título da Coleção</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50"
                            placeholder="Ex: Cyberpunk Bundle 2024"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-white/70 mb-2">Descrição</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={4}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 resize-none"
                            placeholder="Descreva o tema desta coleção..."
                        />
                    </div>
                </div>
            </div>

            {/* Products Manager */}
            <div className="rounded-2xl glass p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-lg font-bold text-white">Produtos na Coleção</h3>
                        <p className="text-white/50 text-sm">{selectedProducts.length} itens selecionados</p>
                    </div>
                    <Button onClick={() => setIsPickerOpen(true)} className="bg-white/10 hover:bg-white/20 text-white">
                        <Plus className="w-4 h-4 mr-2" />
                        Adicionar Produtos
                    </Button>
                </div>

                {selectedProducts.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {mockVendorProducts
                            .filter(p => selectedProducts.includes(p.id))
                            .map(product => (
                                <div key={product.id} className="relative group aspect-video rounded-lg overflow-hidden bg-black/50 border border-white/10">
                                    <img src={product.assets?.[0]?.thumb || ''} alt={product.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                                    <button
                                        onClick={() => toggleProduct(product.id)}
                                        className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 text-white hover:bg-red-500/80 transition-colors opacity-0 group-hover:opacity-100"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                    <div className="absolute bottom-0 inset-x-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                                        <p className="text-xs text-white truncate">{product.title}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                ) : (
                    <div className="text-center py-12 border-2 border-dashed border-white/5 rounded-xl">
                        <p className="text-white/30">Nenhum produto selecionado ainda.</p>
                    </div>
                )}
            </div>

            <div className="flex justify-end pt-4 border-t border-white/10">
                <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-violet-500">
                    Criar Coleção
                </Button>
            </div>

            {/* Product Picker Modal */}
            <AnimatePresence>
                {isPickerOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="w-full max-w-2xl bg-[#0F1115] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
                        >
                            <div className="p-4 border-b border-white/10 flex items-center gap-4">
                                <Search className="w-5 h-5 text-white/40" />
                                <input
                                    autoFocus
                                    type="text"
                                    placeholder="Buscar seus produtos..."
                                    value={pickerSearch}
                                    onChange={(e) => setPickerSearch(e.target.value)}
                                    className="flex-1 bg-transparent border-none focus:outline-none text-white h-10"
                                />
                                <button onClick={() => setIsPickerOpen(false)} className="p-2 hover:bg-white/10 rounded-lg text-white/60">
                                    Esc
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-4">
                                <div className="space-y-2">
                                    {availableProducts.map(product => {
                                        const isSelected = selectedProducts.includes(product.id)
                                        return (
                                            <div
                                                key={product.id}
                                                onClick={() => toggleProduct(product.id)}
                                                className={cn(
                                                    "flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all border",
                                                    isSelected
                                                        ? "bg-cyan-500/10 border-cyan-500/40"
                                                        : "bg-white/5 border-transparent hover:bg-white/10"
                                                )}
                                            >
                                                <div className="w-16 h-10 rounded bg-black overflow-hidden flex-shrink-0">
                                                    <img src={product.assets?.[0]?.thumb || ''} className="w-full h-full object-cover" />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="text-white font-medium text-sm">{product.title}</h4>
                                                    <p className="text-white/40 text-xs">R$ {product.price.toFixed(2)}</p>
                                                </div>
                                                <div className={cn(
                                                    "w-6 h-6 rounded-full border flex items-center justify-center transition-colors",
                                                    isSelected
                                                        ? "bg-cyan-500 border-cyan-500 text-white"
                                                        : "border-white/20 text-transparent"
                                                )}>
                                                    <Check className="w-3 h-3" />
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                            <div className="p-4 border-t border-white/10 flex justify-between items-center bg-black/20">
                                <span className="text-white/50 text-sm">{selectedProducts.length} selecionados</span>
                                <Button onClick={() => setIsPickerOpen(false)}>
                                    Concluído
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}
