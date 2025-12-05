'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    children: React.ReactNode
    className?: string
    title?: string
}

export function Modal({ isOpen, onClose, children, className, title }: ModalProps) {
    // Lock scroll when open
    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => { document.body.style.overflow = 'unset' }
    }, [isOpen])

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 overflow-y-auto overflow-x-hidden flex items-center justify-center p-4 sm:p-6"
                    >
                        {/* Modal Content */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className={cn(
                                "relative w-full max-w-lg rounded-2xl bg-[#0A0A0A] border border-white/10 shadow-2xl overflow-hidden",
                                className
                            )}
                        >
                            {/* Header (Optional) */}
                            {(title) && (
                                <div className="flex items-center justify-between p-6 border-b border-white/5">
                                    <h3 className="text-xl font-bold text-white">{title}</h3>
                                    <button
                                        onClick={onClose}
                                        className="p-2 -mr-2 text-white/40 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            )}

                            {/* Close Button if no Header */}
                            {!title && (
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white/40 hover:text-white hover:bg-black/80 backdrop-blur-md transition-all"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            )}

                            {children}
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
