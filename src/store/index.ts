import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product, CartItem } from '@/types'

// Cart Store
interface CartStore {
    items: CartItem[]
    addItem: (product: Product) => void
    removeItem: (productId: string) => void
    clearCart: () => void
    getTotal: () => number
    getItemCount: () => number
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (product) => {
                set((state) => {
                    const existingItem = state.items.find(
                        (item) => item.product.id === product.id
                    )
                    if (existingItem) {
                        return state // Product already in cart
                    }
                    return { items: [...state.items, { product, quantity: 1 }] }
                })
            },
            removeItem: (productId) => {
                set((state) => ({
                    items: state.items.filter((item) => item.product.id !== productId),
                }))
            },
            clearCart: () => set({ items: [] }),
            getTotal: () => {
                return get().items.reduce(
                    (total, item) => total + item.product.price * item.quantity,
                    0
                )
            },
            getItemCount: () => get().items.length,
        }),
        {
            name: 'ether-cart',
        }
    )
)

// UI Store
interface UIStore {
    isCartOpen: boolean
    isMobileMenuOpen: boolean
    isSearchOpen: boolean
    locale: 'pt-BR' | 'en'
    setCartOpen: (open: boolean) => void
    setMobileMenuOpen: (open: boolean) => void
    setSearchOpen: (open: boolean) => void
    setLocale: (locale: 'pt-BR' | 'en') => void
    toggleCart: () => void
    // Global Modal Manager
    activeModal: string | null
    modalData: any
    openModal: (modalName: string, data?: any) => void
    closeModal: () => void
}

export const useUIStore = create<UIStore>()(
    persist(
        (set, get) => ({
            isCartOpen: false,
            isMobileMenuOpen: false,
            isSearchOpen: false,
            locale: 'pt-BR',
            activeModal: null,
            modalData: null,
            setCartOpen: (open) => set({ isCartOpen: open }),
            setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
            setSearchOpen: (open) => set({ isSearchOpen: open }),
            setLocale: (locale) => {
                set({ locale })
                document.cookie = `locale=${locale};path=/;max-age=31536000`
            },
            toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
            openModal: (modalName, data) => set({ activeModal: modalName, modalData: data }),
            closeModal: () => set({ activeModal: null, modalData: null })
        }),
        {
            name: 'ether-ui',
        }
    )
)

// Auth Store (client-side only for UI state - MOCKED FOR MVP)
interface AuthUIStore {
    isAuthModalOpen: boolean
    authMode: 'login' | 'register'
    userRole: 'guest' | 'buyer' | 'vendor' | 'admin' // Added for Dashboard Logic
    setAuthModalOpen: (open: boolean) => void
    setAuthMode: (mode: 'login' | 'register') => void
    setUserRole: (role: 'guest' | 'buyer' | 'vendor' | 'admin') => void
}

export const useAuthUIStore = create<AuthUIStore>()(
    persist(
        (set) => ({
            isAuthModalOpen: false,
            authMode: 'login',
            userRole: 'guest',
            setAuthModalOpen: (open) => set({ isAuthModalOpen: open }),
            setAuthMode: (mode) => set({ authMode: mode }),
            setUserRole: (role) => set({ userRole: role }),
        }),
        {
            name: 'ether-auth-mock', // Persist to keep login state during dev
        }
    )
)
