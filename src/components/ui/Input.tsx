'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const inputVariants = cva(
    'flex w-full rounded-xl border bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/40 transition-all duration-300 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
    {
        variants: {
            variant: {
                default:
                    'border-white/10 bg-white/[0.02] focus:border-cyan-500/50 focus:bg-white/[0.04] focus:ring-1 focus:ring-cyan-500/30',
                glass:
                    'border-white/[0.08] bg-white/[0.03] backdrop-blur-lg focus:border-white/20 focus:bg-white/[0.05]',
                holographic:
                    'border-transparent bg-black focus:border-cyan-500 focus:shadow-[0_0_20px_rgba(0,240,255,0.2)]',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
)

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
    label?: string
    error?: string
    icon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, variant, type, label, error, icon, ...props }, ref) => {
        return (
            <div className="w-full space-y-2">
                {label && (
                    <label className="block text-sm font-medium text-white/70">
                        {label}
                    </label>
                )}
                <div className="relative">
                    {icon && (
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
                            {icon}
                        </div>
                    )}
                    <input
                        type={type}
                        className={cn(
                            inputVariants({ variant, className }),
                            icon && 'pl-11'
                        )}
                        ref={ref}
                        {...props}
                    />
                </div>
                {error && (
                    <p className="text-sm text-red-400">{error}</p>
                )}
            </div>
        )
    }
)
Input.displayName = 'Input'

export { Input, inputVariants }
