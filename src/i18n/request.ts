import { getRequestConfig } from 'next-intl/server'
import { cookies } from 'next/headers'

export const locales = ['pt-BR', 'en'] as const
export const defaultLocale = 'pt-BR'

export type Locale = (typeof locales)[number]

export default getRequestConfig(async () => {
    const cookieStore = await cookies()
    const locale = (cookieStore.get('locale')?.value as Locale) || defaultLocale

    return {
        locale,
        messages: (await import(`@/messages/${locale}.json`)).default
    }
})
