import { getRequestConfig } from 'next-intl/server'

export const locales = ['pt-BR', 'en'] as const
export const defaultLocale = 'pt-BR'

export type Locale = (typeof locales)[number]

export default getRequestConfig(async () => {
    return {
        locale: defaultLocale,
        messages: (await import(`@/messages/${defaultLocale}.json`)).default
    }
})
