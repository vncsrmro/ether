'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2, Eye } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui'
import { mockVendorCollections } from '@/lib/mock-vendor-data'

export default function VendorCollectionsList() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Minhas Coleções</h1>
                    <p className="text-white/60">Agrupe seus produtos para aumentar as vendas.</p>
                </div>
                <Link href="/dashboard/vendor/collections/new">
                    <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Nova Coleção
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockVendorCollections.map((collection, idx) => (
                    <motion.div
                        key={collection.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="group relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-white/20 transition-all"
                    >
                        <div className="aspect-[21/9] bg-black relative">
                            <img src={collection.cover} alt={collection.title} className="w-full h-full object-cover opacity-80" />
                            <div className="absolute top-2 right-2 px-2 py-1 rounded-md bg-black/50 backdrop-blur-md text-xs font-bold text-white uppercase border border-white/10">
                                {collection.status}
                            </div>
                        </div>

                        <div className="p-6">
                            <h3 className="text-xl font-bold text-white mb-2">{collection.title}</h3>
                            <p className="text-white/50 text-sm mb-4">{collection.items} items</p>

                            <div className="flex gap-2">
                                <Button variant="secondary" size="sm" className="flex-1">
                                    <Edit className="w-3 h-3 mr-2" /> Editar
                                </Button>
                                <Button variant="ghost" size="sm" className="px-3 hover:bg-red-500/20 hover:text-red-400">
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
