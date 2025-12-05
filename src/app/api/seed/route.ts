
import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { mockProducts, mockCollections } from '@/lib/mock-data'
import { slugify } from '@/lib/utils'

// Initial Admin Setup - Ideally this connects via Service Role to bypass RLS
// or depends on the user being an ADMIN.
// For this MVP step, we will use the Service Key if available, or fall back to standard client if RLS allows (it won't for public inserts usually).

export async function POST() {
    try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

        if (!supabaseUrl || !supabaseServiceKey) {
            return NextResponse.json({ error: 'Missing Service Key' }, { status: 500 })
        }

        const supabase = createClient(supabaseUrl, supabaseServiceKey)

        console.log('🌱 Starting Seed...')

        // 1. Upsert Vendors (Profiles)
        // We will skip Auth User creation here to avoid "User already registered" spam or complications.
        // We assume the developer has logged in or we just insert profiles directly if RLS allows (Service role does).
        // Since products have vendor_id, we need those profiles to exist.
        // Let's create dummy profiles for the mock vendors.

        const { error: profileError } = await supabase.from('profiles').upsert(
            mockProducts.map(p => ({
                id: p.vendor!.id,
                email: p.vendor!.email,
                role: 'vendor',
                brand_name: p.vendor!.brand_name,
                avatar_url: p.vendor!.avatar_url,
                updated_at: new Date().toISOString()
            }))
            , { onConflict: 'id' })

        if (profileError) console.error('Profile Error:', profileError)

        // 2. Upsert Products
        const productsPayload = mockProducts.map(p => ({
            id: p.id,
            vendor_id: p.vendor_id,
            title: p.title,
            description: p.description,
            price: p.price,
            resolution: p.resolution,
            fps: p.fps,
            codec: p.codec,
            duration: p.duration,
            tags: p.tags,
            is_exclusive: p.is_exclusive,
            status: p.status, // 'approved'
            created_at: p.created_at,
            updated_at: p.updated_at
        }))

        const { error: productError } = await supabase.from('products').upsert(productsPayload, { onConflict: 'id' })
        if (productError) console.error('Product Error:', productError)

        // 3. Upsert Assets (One per product in mock data)
        const assetsPayload = mockProducts.flatMap(p => p.assets!.map(a => ({
            id: a.id,
            product_id: p.id,
            s3_key_original: a.s3_key_original || `original/${p.id}.mp4`,
            s3_key_preview: a.s3_key_preview,
            s3_key_thumb: a.s3_key_thumb,
            created_at: a.created_at
        })))

        const { error: assetError } = await supabase.from('assets').upsert(assetsPayload, { onConflict: 'id' })
        if (assetError) console.error('Asset Error:', assetError)

        // 4. Upsert Collections
        const collectionsPayload = mockCollections.map(c => ({
            id: c.id,
            vendor_id: 'v1', // Hardcoding owner for collections if missing in mock
            slug: c.slug,
            title: c.title,
            description: c.description,
            cover_image: c.cover_image,
            featured: c.featured,
            created_at: c.created_at
        }))

        // We assume 'v1' exists from step 1
        const { error: collectionError } = await supabase.from('collections').upsert(collectionsPayload, { onConflict: 'id' })
        if (collectionError) console.error('Collection Error:', collectionError)

        // 5. Connect Products to Collections
        // Mock data has product_ids array in collection.
        // We need to insert into collection_items
        const collectionItemsPayload = mockCollections.flatMap(c =>
            c.product_ids.map(pid => ({
                collection_id: c.id,
                product_id: pid
            }))
        )

        const { error: itemsError } = await supabase.from('collection_items').upsert(
            collectionItemsPayload,
            { onConflict: 'collection_id,product_id' }
        )
        if (itemsError) console.error('Collection Items Error:', itemsError)

        return NextResponse.json({ success: true, message: 'Database seeded successfully' })

    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}
