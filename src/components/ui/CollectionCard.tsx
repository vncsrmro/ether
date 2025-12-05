'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { Collection } from '@/lib/mock-data'
import { mockProducts } from '@/lib/mock-data'
import { Layers } from 'lucide-react'

interface CollectionCardProps {
    collection: Collection
    className?: string
}

export function CollectionCard({ collection, className }: CollectionCardProps) {
    // Get first 4 products from collection
    const previewProducts = collection.product_ids
        .slice(0, 4)
        .map(id => mockProducts.find(p => p.id === id))
        .filter(Boolean)

    return (
        <Link href={`/collections/${collection.slug}`}>
            <motion.div
                className={cn(
                    "group relative rounded-2xl overflow-hidden glass",
                    "transition-all duration-500 hover:-translate-y-2",
                    className
                )}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{
                    boxShadow: '0 0 30px rgba(0, 240, 255, 0.2), 0 0 60px rgba(112, 0, 255, 0.1)',
                    borderColor: 'rgba(255, 255, 255, 0.2)'
                }}
            >
                {/* Cover Image */}
                <div className="relative aspect-[16/9] overflow-hidden">
                    <img
                        src={collection.cover_image}
                        alt={collection.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                    {/* Featured Badge */}
                    {collection.featured && (
                        <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-cyan-500 to-violet-500 text-white">
                            Destaque
                        </div>
                    )}

                    {/* Preview Grid (Hover) */}
                    <motion.div
                        className="absolute inset-4 grid grid-cols-2 gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={false}
                    >
                        {previewProducts.map((product, idx) => (
                            <div
                                key={product?.id || idx}
                                className="rounded-lg overflow-hidden border border-white/20"
                                style={{
                                    backgroundImage: product?.assets?.[0]?.s3_key_thumb
                                        ? `url(${product.assets[0].s3_key_thumb})`
                                        : 'none',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }}
                            />
                        ))}
                    </motion.div>
                </div>

                {/* Info */}
                <div className="relative p-5">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <h3 className="font-semibold text-lg text-white group-hover:text-cyan-400 transition-colors">
                                {collection.title}
                            </h3>
                            <p className="text-sm text-white/50 mt-1 line-clamp-2">
                                {collection.description}
                            </p>
                        </div>
                        <div className="flex items-center gap-2 text-white/60 shrink-0">
                            <Layers className="w-4 h-4" />
                            <span className="text-sm">{collection.product_ids.length}</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link>
    )
}
