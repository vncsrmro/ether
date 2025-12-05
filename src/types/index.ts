// User & Auth Types
export type UserRole = 'admin' | 'vendor' | 'user'

export interface Profile {
    id: string
    email: string
    role: UserRole
    brand_name: string | null
    avatar_url: string | null
    stripe_account_id: string | null
    created_at: string
    updated_at: string
}

// Product Types
export interface Product {
    id: string
    vendor_id: string
    title: string
    description: string
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
    vendor?: Profile
    assets?: Asset[]
}

export interface Asset {
    id: string
    product_id: string
    s3_key_original: string
    s3_key_preview: string
    s3_key_thumb: string
    created_at: string
}

// Order Types
export type OrderStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'refunded'

export interface Order {
    id: string
    buyer_id: string
    total_amount: number
    status: OrderStatus
    stripe_payment_intent_id: string | null
    created_at: string
    updated_at: string
    buyer?: Profile
    items?: OrderItem[]
}

export interface OrderItem {
    id: string
    order_id: string
    product_id: string
    price_at_purchase: number
    product?: Product
}

// Commission Types
export type CommissionStatus = 'pending' | 'paid' | 'failed'

export interface Commission {
    id: string
    vendor_id: string
    order_id: string
    order_item_id: string
    amount_platform: number
    amount_vendor: number
    status: CommissionStatus
    paid_at: string | null
    created_at: string
    vendor?: Profile
    order?: Order
}

// Cart Types
export interface CartItem {
    product: Product
    quantity: number
}

export interface Cart {
    items: CartItem[]
    total: number
}

// Analytics Types
export interface SalesData {
    date: string
    revenue: number
    orders: number
}

export interface VendorAnalytics {
    total_sales: number
    total_revenue: number
    pending_payout: number
    top_products: Product[]
    sales_chart: SalesData[]
}

export interface AdminAnalytics {
    gmv: number
    net_revenue: number
    total_users: number
    total_vendors: number
    total_products: number
    pending_reviews: number
    revenue_chart: SalesData[]
}
