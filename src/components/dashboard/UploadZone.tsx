'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDropzone } from 'react-dropzone'
import {
    Upload,
    X,
    Film,
    Check,
    Loader2,
    AlertCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { cn } from '@/lib/utils'

interface UploadFile {
    file: File
    id: string
    progress: number
    status: 'pending' | 'uploading' | 'processing' | 'complete' | 'error'
    preview?: string
    error?: string
}

export function UploadZone() {
    const [files, setFiles] = useState<UploadFile[]>([])
    const [isUploading, setIsUploading] = useState(false)

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const newFiles: UploadFile[] = acceptedFiles.map((file) => ({
            file,
            id: Math.random().toString(36).slice(2),
            progress: 0,
            status: 'pending',
            preview: URL.createObjectURL(file),
        }))
        setFiles((prev) => [...prev, ...newFiles])
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'video/*': ['.mp4', '.mov', '.webm', '.avi'],
        },
        maxSize: 500 * 1024 * 1024, // 500MB
    })

    const removeFile = (id: string) => {
        setFiles((prev) => prev.filter((f) => f.id !== id))
    }

    const handleUpload = async () => {
        setIsUploading(true)

        for (const uploadFile of files) {
            if (uploadFile.status !== 'pending') continue

            setFiles((prev) =>
                prev.map((f) =>
                    f.id === uploadFile.id ? { ...f, status: 'uploading' } : f
                )
            )

            // Simulate upload progress
            for (let i = 0; i <= 100; i += 10) {
                await new Promise((resolve) => setTimeout(resolve, 200))
                setFiles((prev) =>
                    prev.map((f) =>
                        f.id === uploadFile.id ? { ...f, progress: i } : f
                    )
                )
            }

            // Simulate processing
            setFiles((prev) =>
                prev.map((f) =>
                    f.id === uploadFile.id ? { ...f, status: 'processing' } : f
                )
            )
            await new Promise((resolve) => setTimeout(resolve, 1500))

            // Complete
            setFiles((prev) =>
                prev.map((f) =>
                    f.id === uploadFile.id ? { ...f, status: 'complete' } : f
                )
            )
        }

        setIsUploading(false)
    }

    const pendingFiles = files.filter((f) => f.status === 'pending')
    const uploadingFiles = files.filter((f) =>
        f.status === 'uploading' || f.status === 'processing'
    )
    const completedFiles = files.filter((f) => f.status === 'complete')

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-white">
                    Upload de Loops
                </h1>
                <p className="text-white/50 mt-1">
                    Envie seus loops de vídeo para revisão
                </p>
            </div>

            {/* Drop Zone */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div
                    {...getRootProps()}
                    className={cn(
                        'relative p-12 rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-300',
                        isDragActive
                            ? 'border-cyan-500 bg-cyan-500/10'
                            : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                    )}
                >
                    <input {...getInputProps()} />
                    <div className="flex flex-col items-center text-center">
                        <div className={cn(
                            'w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-colors',
                            isDragActive
                                ? 'bg-cyan-500/20'
                                : 'bg-gradient-to-br from-cyan-500/10 to-violet-500/10'
                        )}>
                            <Upload className={cn(
                                'w-8 h-8 transition-colors',
                                isDragActive ? 'text-cyan-400' : 'text-white/50'
                            )} />
                        </div>
                        <p className="text-lg font-medium text-white mb-2">
                            {isDragActive
                                ? 'Solte os arquivos aqui...'
                                : 'Arraste e solte seus vídeos aqui'}
                        </p>
                        <p className="text-sm text-white/50 mb-4">
                            ou clique para selecionar
                        </p>
                        <p className="text-xs text-white/30">
                            MP4, MOV, WebM, AVI • Máximo 500MB por arquivo
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* File List */}
            <AnimatePresence mode="popLayout">
                {files.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-4"
                    >
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-white">
                                Arquivos ({files.length})
                            </h3>
                            {pendingFiles.length > 0 && (
                                <Button
                                    onClick={handleUpload}
                                    disabled={isUploading}
                                    magnetic
                                >
                                    {isUploading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Enviando...
                                        </>
                                    ) : (
                                        <>
                                            <Upload className="w-4 h-4" />
                                            Enviar {pendingFiles.length} arquivo(s)
                                        </>
                                    )}
                                </Button>
                            )}
                        </div>

                        <div className="space-y-3">
                            {files.map((uploadFile) => (
                                <motion.div
                                    key={uploadFile.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]"
                                >
                                    {/* Preview */}
                                    <div className="relative w-20 h-14 rounded-lg overflow-hidden bg-white/5 flex-shrink-0">
                                        {uploadFile.preview ? (
                                            <video
                                                src={uploadFile.preview}
                                                className="w-full h-full object-cover"
                                                muted
                                            />
                                        ) : (
                                            <Film className="w-6 h-6 text-white/30 absolute inset-0 m-auto" />
                                        )}
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-white truncate">
                                            {uploadFile.file.name}
                                        </p>
                                        <p className="text-xs text-white/50">
                                            {(uploadFile.file.size / 1024 / 1024).toFixed(2)} MB
                                        </p>

                                        {/* Progress Bar */}
                                        {(uploadFile.status === 'uploading' || uploadFile.status === 'processing') && (
                                            <div className="mt-2">
                                                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                                                    <motion.div
                                                        className="h-full bg-gradient-to-r from-cyan-500 to-violet-500"
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${uploadFile.progress}%` }}
                                                    />
                                                </div>
                                                <p className="text-xs text-white/50 mt-1">
                                                    {uploadFile.status === 'processing'
                                                        ? 'Gerando preview...'
                                                        : `${uploadFile.progress}%`}
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Status */}
                                    <div className="flex-shrink-0">
                                        {uploadFile.status === 'pending' && (
                                            <button
                                                onClick={() => removeFile(uploadFile.id)}
                                                className="p-2 rounded-lg text-white/50 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        )}
                                        {uploadFile.status === 'uploading' && (
                                            <Loader2 className="w-5 h-5 text-cyan-400 animate-spin" />
                                        )}
                                        {uploadFile.status === 'processing' && (
                                            <Loader2 className="w-5 h-5 text-violet-400 animate-spin" />
                                        )}
                                        {uploadFile.status === 'complete' && (
                                            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                                                <Check className="w-4 h-4 text-green-400" />
                                            </div>
                                        )}
                                        {uploadFile.status === 'error' && (
                                            <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                                                <AlertCircle className="w-4 h-4 text-red-400" />
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Product Details Form (shown after upload) */}
            {completedFiles.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-6"
                >
                    <h3 className="text-lg font-semibold text-white">
                        Informações do Produto
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="Título"
                            placeholder="Nome do seu loop"
                            required
                        />
                        <Input
                            label="Preço (R$)"
                            type="number"
                            placeholder="49.90"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-white/70 mb-2">
                            Descrição
                        </label>
                        <textarea
                            className="w-full min-h-[100px] rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-cyan-500/50 focus:bg-white/[0.04] focus:ring-1 focus:ring-cyan-500/30 focus:outline-none resize-none"
                            placeholder="Descreva seu loop..."
                        />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-white/70 mb-2">
                                Resolução
                            </label>
                            <select className="w-full h-11 rounded-xl border border-white/10 bg-white/[0.02] px-4 text-sm text-white focus:border-cyan-500/50 focus:outline-none appearance-none">
                                <option value="4K">4K</option>
                                <option value="1080p">1080p</option>
                                <option value="720p">720p</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-white/70 mb-2">
                                FPS
                            </label>
                            <select className="w-full h-11 rounded-xl border border-white/10 bg-white/[0.02] px-4 text-sm text-white focus:border-cyan-500/50 focus:outline-none appearance-none">
                                <option value="60">60 FPS</option>
                                <option value="30">30 FPS</option>
                                <option value="24">24 FPS</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-white/70 mb-2">
                                Codec
                            </label>
                            <select className="w-full h-11 rounded-xl border border-white/10 bg-white/[0.02] px-4 text-sm text-white focus:border-cyan-500/50 focus:outline-none appearance-none">
                                <option value="ProRes">ProRes</option>
                                <option value="H.264">H.264</option>
                                <option value="H.265">H.265</option>
                            </select>
                        </div>
                        <div className="flex items-end">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="w-5 h-5 rounded border-white/20 bg-white/5 text-cyan-500 focus:ring-cyan-500/30"
                                />
                                <span className="text-sm text-white/70">Exclusivo</span>
                            </label>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-white/70 mb-2">
                            Tags (separadas por vírgula)
                        </label>
                        <Input
                            placeholder="abstract, neon, waves, motion"
                        />
                    </div>

                    <div className="flex justify-end gap-3">
                        <Button variant="secondary">
                            Salvar Rascunho
                        </Button>
                        <Button magnetic>
                            Enviar para Revisão
                        </Button>
                    </div>
                </motion.div>
            )}
        </div>
    )
}
