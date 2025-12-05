'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Upload, X, FileVideo, CheckCircle, AlertCircle, Tag, Info } from 'lucide-react'
import { Button, Input } from '@/components/ui'
import { cn } from '@/lib/utils'

export function UploadForm() {
    const [dragActive, setDragActive] = React.useState(false)
    const [files, setFiles] = React.useState<File[]>([])
    const [uploading, setUploading] = React.useState(false)
    const [progress, setProgress] = React.useState(0)
    const [step, setStep] = React.useState(1) // 1: Upload, 2: Details

    // Form Data
    const [title, setTitle] = React.useState('')
    const [price, setPrice] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [tags, setTags] = React.useState<string[]>([])
    const [currentTag, setCurrentTag] = React.useState('')

    // Drag handlers
    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true)
        } else if (e.type === "dragleave") {
            setDragActive(false)
        }
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFiles(Array.from(e.dataTransfer.files))
            simulateUpload()
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        if (e.target.files && e.target.files[0]) {
            setFiles(Array.from(e.target.files))
            simulateUpload()
        }
    }

    const simulateUpload = () => {
        setUploading(true)
        let p = 0
        const interval = setInterval(() => {
            p += 5
            setProgress(p)
            if (p >= 100) {
                clearInterval(interval)
                setUploading(false)
                setStep(2) // Move to details automatically
            }
        }, 100)
    }

    const handleAddTag = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && currentTag.trim()) {
            e.preventDefault()
            setTags([...tags, currentTag.trim()])
            setCurrentTag('')
        }
    }

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter(t => t !== tagToRemove))
    }

    return (
        <div className="max-w-3xl mx-auto rounded-3xl glass p-8">
            {/* Stepper */}
            <div className="flex items-center mb-8 gap-4">
                <div className={cn(
                    "flex-1 h-1 rounded-full transition-all",
                    step >= 1 ? "bg-cyan-500" : "bg-white/10"
                )} />
                <div className={cn(
                    "flex-1 h-1 rounded-full transition-all",
                    step >= 2 ? "bg-cyan-500" : "bg-white/10"
                )} />
            </div>

            {/* Step 1: Upload */}
            <div className={cn(step === 1 ? "block" : "hidden")}>
                <h2 className="text-2xl font-bold text-white mb-2">Upload de Arquivo</h2>
                <p className="text-white/60 mb-6">Arraste seu loop (.mp4, .mov) de alta qualidade</p>

                <div
                    className={cn(
                        "relative border-2 border-dashed rounded-2xl h-64 flex flex-col items-center justify-center transition-all bg-white/5",
                        dragActive ? "border-cyan-500 bg-cyan-500/10 scale-[1.02]" : "border-white/20 hover:border-white/40"
                    )}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                >
                    <input
                        type="file"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={handleChange}
                        accept="video/*"
                    />

                    {uploading ? (
                        <div className="w-full max-w-xs text-center">
                            <div className="text-cyan-400 font-bold text-2xl mb-2">{progress}%</div>
                            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-cyan-500"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                />
                            </div>
                            <p className="text-white/40 text-sm mt-2">Processando vídeo...</p>
                        </div>
                    ) : (
                        <div className="text-center pointer-events-none">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                                <Upload className="w-8 h-8 text-white/40" />
                            </div>
                            <p className="text-lg font-medium text-white mb-1">Arraste e solte ou clique</p>
                            <p className="text-sm text-white/40">Suporta MP4, MOV, WebM até 2GB</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Step 2: Details */}
            <div className={cn(step === 2 ? "block" : "hidden")}>
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-1">Detalhes do Produto</h2>
                        <p className="text-white/60 text-sm">Preencha as informações para publicação</p>
                    </div>
                    {files.length > 0 && (
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-500/10 text-green-400 text-sm">
                            <CheckCircle className="w-4 h-4" />
                            <span>{files[0].name}</span>
                        </div>
                    )}
                </div>

                <div className="grid gap-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm text-white/70 mb-2">Título do Loop</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50"
                                placeholder="Ex: Neon Cityscape 4K"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-white/70 mb-2">Preço (BRL)</label>
                            <div className="relative">
                                <span className="absolute left-4 top-3.5 text-white/40">R$</span>
                                <input
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-cyan-500/50"
                                    placeholder="49.90"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm text-white/70 mb-2">Descrição</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={4}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 resize-none"
                            placeholder="Descreva o estilo, uso ideal e detalhes técnicos..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-white/70 mb-2">Tags (Pressione Enter)</label>
                        <div className="flex flex-wrap gap-2 p-2 bg-white/5 border border-white/10 rounded-xl min-h-[50px]">
                            {tags.map(tag => (
                                <span key={tag} className="flex items-center gap-1 px-2 py-1 rounded bg-cyan-500/20 text-cyan-400 text-sm">
                                    <Tag className="w-3 h-3" />
                                    {tag}
                                    <button onClick={() => removeTag(tag)} className="hover:text-white ml-1">
                                        <X className="w-3 h-3" />
                                    </button>
                                </span>
                            ))}
                            <input
                                type="text"
                                value={currentTag}
                                onChange={(e) => setCurrentTag(e.target.value)}
                                onKeyDown={handleAddTag}
                                className="bg-transparent border-none focus:outline-none text-white min-w-[120px] flex-1"
                                placeholder={tags.length === 0 ? "Ex: cyberpunk, neon, loop..." : ""}
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4 pt-4">
                        <Button variant="ghost" onClick={() => setStep(1)} className="text-white/60">
                            Voltar
                        </Button>
                        <Button className="flex-1 bg-gradient-to-r from-cyan-500 to-violet-500">
                            Publicar Produto
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
