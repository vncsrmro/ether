import { Header, Footer, CartDrawer } from '@/components/layout'
import { HeroSection, TrendingSection, FeaturesSection } from '@/components/sections'

export default function HomePage() {
  return (
    <>
      <Header />
      <CartDrawer />

      <main className="min-h-screen">
        <HeroSection />
        <TrendingSection />
        <FeaturesSection />
      </main>

      <Footer />
    </>
  )
}
