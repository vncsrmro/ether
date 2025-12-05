import { mockProducts } from './mock-data'

export const mockVendorStats = {
    totalRevenue: 12450.90,
    revenueTrend: 12.5,
    totalSales: 342,
    salesTrend: 8.4,
    totalProducts: 45,
    productTrend: 2, // absolute number added
    rating: 4.8,
}

export const mockRecentSales = [
    { id: 'S-991', product: 'Cyberpunk City', revenue: 49.90, date: '2023-12-05T10:00:00Z', buyer: 'alex.design' },
    { id: 'S-992', product: 'Neon Geometric', revenue: 29.90, date: '2023-12-04T16:30:00Z', buyer: 'studio_one' },
    { id: 'S-993', product: 'Abstract Flow', revenue: 39.90, date: '2023-12-04T09:15:00Z', buyer: 'vj_mike' },
]

export const mockVendorProducts = mockProducts.map(p => ({
    ...p,
    status: 'published', // 'draft', 'pending', 'published'
    sales: Math.floor(Math.random() * 100),
    revenue: Math.floor(Math.random() * 5000)
}))

export const mockVendorCollections = [
    { id: 'C-1', title: 'Future Tech', items: 12, status: 'published', cover: mockProducts[0].assets?.[1]?.url },
    { id: 'C-2', title: 'Abstract Loops', items: 8, status: 'draft', cover: mockProducts[2].assets?.[1]?.url }
]
