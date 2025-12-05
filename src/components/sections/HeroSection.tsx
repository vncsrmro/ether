'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/Button'
import { Play, ArrowRight, Sparkles } from 'lucide-react'

// Demo video URL - replace with actual video
const HERO_VIDEO_URL = 'https://assets.mixkit.co/videos/preview/mixkit-abstract-digital-waves-33287-large.mp4'

export function HeroSection() {
    const t = useTranslations()
    const containerRef = useRef<HTMLDivElement>(null)
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isVideoLoaded, setIsVideoLoaded] = useState(false)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start'],
    })

    const y = useTransform(scrollYProgress, [0, 1], [0, 200])
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1])

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.75
        }
    }, [isVideoLoaded])

    const stats = [
        { value: '50K+', label: t('hero.stats.loops') },
        { value: '2K+', label: t('hero.stats.artists') },
        { value: '500K+', label: t('hero.stats.downloads') },
    ]

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Background Video */}
            <motion.div
                style={{ scale }}
                className="absolute inset-0"
            >
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                    onLoadedData={() => setIsVideoLoaded(true)}
                >
                    <source src={HERO_VIDEO_URL} type="video/mp4" />
                </video>

                {/* Video Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-violet-500/10" />
            </motion.div>

            {/* Floating Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-cyan-400"
                    animate={{
                        y: [0, -20, 0],
                        opacity: [0.5, 1, 0.5],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.div
                    className="absolute top-1/3 right-1/4 w-3 h-3 rounded-full bg-violet-400"
                    animate={{
                        y: [0, 20, 0],
                        opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                />
                <motion.div
                    className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 rounded-full bg-silver"
                    animate={{
                        y: [0, -15, 0],
                        opacity: [0.4, 1, 0.4],
                    }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                />
            </div>

            {/* Content */}
            <motion.div
                style={{ y, opacity }}
                className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
            >
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8"
                >
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm text-white/70">
                        {t('hero.stats.loops')} {stats[0].value}
                    </span>
                </motion.div>

                {/* Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
                >
                    <span className="text-white">{t('hero.title')}</span>
                    <br />
                    <span className="holographic-text">{t('hero.titleHighlight')}</span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-10"
                >
                    {t('hero.subtitle')}
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Button variant="default" size="xl" magnetic>
                        <Play className="w-5 h-5" fill="currentColor" />
                        {t('hero.cta')}
                    </Button>
                    <Button variant="outline" size="xl">
                        {t('hero.ctaSecondary')}
                        <ArrowRight className="w-5 h-5" />
                    </Button>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
                >
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-2xl sm:text-3xl font-bold text-gradient">
                                {stat.value}
                            </div>
                            <div className="text-sm text-white/50 mt-1">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
                >
                    <motion.div
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-1 h-2 rounded-full bg-white/50"
                    />
                </motion.div>
            </motion.div>
        </section>
    )
}
