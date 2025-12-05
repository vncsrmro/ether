import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { CheckoutFlow } from '@/components/checkout/CheckoutFlow'

export default async function CheckoutPage() {
    const messages = await getMessages()

    return (
        <NextIntlClientProvider messages={messages}>
            <CheckoutFlow />
        </NextIntlClientProvider>
    )
}
