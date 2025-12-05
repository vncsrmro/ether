export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string
                    email: string
                    role: 'admin' | 'vendor' | 'buyer'
                    brand_name: string | null
                    avatar_url: string | null
                    stripe_account_id: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id: string
                    email: string
                    role?: 'admin' | 'vendor' | 'buyer'
                    brand_name?: string | null
                    avatar_url?: string | null
                    stripe_account_id?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    email?: string
                    role?: 'admin' | 'vendor' | 'buyer'
                    brand_name?: string | null
                    avatar_url?: string | null
                    stripe_account_id?: string | null
                    created_at?: string
                    updated_at?: string
                }
            }
            products: {
                Row: {
                    id: string
                    vendor_id: string
                    title: string
                    description: string | null
                    price: number
                    resolution: string
                    fps: number
                    codec: string
                    duration: number
                    tags: string[]
                    is_exclusive: boolean
                    status: 'pending' | 'approved' | 'rejected'
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    vendor_id: string
                    title: string
                    description?: string | null
                    price: number
                    resolution?: string
                    fps?: number
                    codec?: string
                    duration?: number
                    tags?: string[]
                    is_exclusive?: boolean
                    status?: 'pending' | 'approved' | 'rejected'
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    vendor_id?: string
                    title?: string
                    description?: string | null
                    price?: number
                    resolution?: string
                    fps?: number
                    codec?: string
                    duration?: number
                    tags?: string[]
                    is_exclusive?: boolean
                    status?: 'pending' | 'approved' | 'rejected'
                    created_at?: string
                    updated_at?: string
                }
            }
            assets: {
                Row: {
                    id: string
                    product_id: string
                    s3_key_original: string
                    s3_key_preview: string | null
                    s3_key_thumb: string | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    product_id: string
                    s3_key_original: string
                    s3_key_preview?: string | null
                    s3_key_thumb?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    product_id?: string
                    s3_key_original?: string
                    s3_key_preview?: string | null
                    s3_key_thumb?: string | null
                    created_at?: string
                }
            }
            collections: {
                Row: {
                    id: string
                    vendor_id: string
                    slug: string
                    title: string
                    description: string | null
                    cover_image: string | null
                    featured: boolean
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    vendor_id: string
                    slug: string
                    title: string
                    description?: string | null
                    cover_image?: string | null
                    featured?: boolean
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    vendor_id?: string
                    slug?: string
                    title?: string
                    description?: string | null
                    cover_image?: string | null
                    featured?: boolean
                    created_at?: string
                    updated_at?: string
                }
            }
            collection_items: {
                Row: {
                    collection_id: string
                    product_id: string
                    created_at: string
                }
                Insert: {
                    collection_id: string
                    product_id: string
                    created_at?: string
                }
                Update: {
                    collection_id?: string
                    product_id?: string
                    created_at?: string
                }
            }
            orders: {
                Row: {
                    id: string
                    buyer_id: string
                    total_amount: number
                    status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded'
                    stripe_payment_intent_id: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    buyer_id: string
                    total_amount: number
                    status?: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded'
                    stripe_payment_intent_id?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    buyer_id?: string
                    total_amount?: number
                    status?: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded'
                    stripe_payment_intent_id?: string | null
                    created_at?: string
                    updated_at?: string
                }
            }
            order_items: {
                Row: {
                    id: string
                    order_id: string
                    product_id: string
                    price_at_purchase: number
                    created_at: string
                }
                Insert: {
                    id?: string
                    order_id: string
                    product_id: string
                    price_at_purchase: number
                    created_at?: string
                }
                Update: {
                    id?: string
                    order_id?: string
                    product_id?: string
                    price_at_purchase?: number
                    created_at?: string
                }
            }
        }
    }
}
