'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                default:
                    'bg-gradient-to-r from-cyan-500 to-violet-600 text-white hover:shadow-[0_0_30px_rgba(0,240,255,0.4)] hover:scale-[1.02]',
                secondary:
                    'bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20',
                outline:
                    'border border-white/20 bg-transparent text-white hover:bg-white/5 hover:border-white/30',
                ghost:
                    'bg-transparent text-white/70 hover:text-white hover:bg-white/5',
                holographic:
                    'relative bg-black text-white border border-transparent before:absolute before:inset-0 before:rounded-xl before:p-[1px] before:bg-gradient-to-r before:from-cyan-500 before:via-violet-500 before:to-silver before:-z-10 hover:shadow-[0_0_40px_rgba(0,240,255,0.3),0_0_80px_rgba(112,0,255,0.2)]',
                danger:
                    'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30',
            },
            size: {
                default: 'h-11 px-6 py-2',
                sm: 'h-9 px-4 text-xs',
                lg: 'h-14 px-8 text-base',
                xl: 'h-16 px-10 text-lg',
                icon: 'h-10 w-10',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    magnetic?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, magnetic = false, children, onClick, disabled, type, ...props }, ref) => {
        const [position, setPosition] = React.useState({ x: 0, y: 0 })

        const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
            if (!magnetic) return
            const rect = e.currentTarget.getBoundingClientRect()
            const x = e.clientX - rect.left - rect.width / 2
            const y = e.clientY - rect.top - rect.height / 2
            setPosition({ x: x * 0.15, y: y * 0.15 })
        }

        const handleMouseLeave = () => {
            setPosition({ x: 0, y: 0 })
        }

        if (magnetic) {
            return (
                <motion.button
                    ref={ref}
                    className={cn(buttonVariants({ variant, size, className }))}
                    animate={{ x: position.x, y: position.y }}
                    transition={{ type: 'spring', stiffness: 150, damping: 15 }}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    onClick={onClick}
                    disabled={disabled}
                    type={type}
                >
                    {children}
                </motion.button>
            )
        }

        return (
            <button
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                onClick={onClick}
                disabled={disabled}
                type={type}
                {...props}
            >
                {children}
            </button>
        )
    }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
