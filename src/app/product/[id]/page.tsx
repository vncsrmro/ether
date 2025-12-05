import { notFound } from 'next/navigation'
import { ProductDetail } from '@/components/product/ProductDetail'
import type { Product } from '@/types'

// Mock product data - replace with Supabase fetch
const mockProduct: Product = {
    id: '1',
    vendor_id: 'v1',
    title: 'Neon Waves Abstract',
    description: 'A mesmerizing abstract animation featuring flowing neon waves with dynamic color transitions. Perfect for VJ sets, music videos, and live performances. Seamlessly loopable and rendered in stunning 4K resolution.',
    price: 49.90,
    resolution: '4K',
    fps: 60,
    codec: 'ProRes',
    duration: 10,
    tags: ['abstract', 'neon', 'waves', 'colorful', 'seamless'],
    is_exclusive: true,
    status: 'approved',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    vendor: {
        id: 'v1',
        email: 'artist@example.com',
        role: 'vendor',
        brand_name: 'NeonLabs',
        avatar_url: null,
        stripe_account_id: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    assets: [{
        id: 'a1',
        product_id: '1',
        s3_key_original: '',
        s3_key_preview: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-digital-waves-33287-large.mp4',
        s3_key_thumb: '',
        created_at: new Date().toISOString(),
    }],
}

interface ProductPageProps {
    params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { id } = await params

    // TODO: Fetch from Supabase
    // const product = await fetchProduct(id)
    const product = id === '1' ? mockProduct : null

    if (!product) {
        notFound()
    }

    return <ProductDetail product={product} />
}
