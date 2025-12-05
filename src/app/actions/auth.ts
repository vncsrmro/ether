'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function login(formData: FormData) {
    const supabase = await createClient()

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/', 'layout')
    redirect('/dashboard')
}

export async function register(formData: FormData) {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const role = formData.get('role') as string || 'user'
    const brandName = formData.get('brandName') as string

    const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
    })

    if (authError) {
        return { error: authError.message }
    }

    // Update profile with role and brand name if vendor
    if (authData.user && (role === 'vendor' || brandName)) {
        const { error: profileError } = await supabase
            .from('profiles')
            .update({
                role: role === 'vendor' ? 'vendor' : 'user',
                brand_name: brandName || null,
            })
            .eq('id', authData.user.id)

        if (profileError) {
            console.error('Profile update error:', profileError)
        }
    }

    revalidatePath('/', 'layout')
    redirect('/dashboard')
}

export async function logout() {
    const supabase = await createClient()
    await supabase.auth.signOut()
    revalidatePath('/', 'layout')
    redirect('/')
}

export async function getSession() {
    const supabase = await createClient()
    const { data: { session } } = await supabase.auth.getSession()
    return session
}

export async function getProfile() {
    const supabase = await createClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) return null

    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single()

    return profile
}
