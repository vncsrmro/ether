import { mockProducts } from './mock-data'

export interface Order {
    id: string
    date: string
    total: number
    status: 'completed' | 'processing' | 'refunded'
    items: string[] // product ids
}

export const mockOrders: Order[] = [
    {
        id: 'ORD-2023-001',
        date: '2023-12-01T10:30:00Z',
        total: 129.90,
        status: 'completed',
        items: ['1', '3'] // Cyberpunk City, Abstract Flow
    },
    {
        id: 'ORD-2023-002',
        date: '2023-11-20T15:45:00Z',
        total: 49.90,
        status: 'completed',
        items: ['2'] // Neon Geometric
    },
    {
        id: 'ORD-2023-003',
        date: '2023-10-15T09:20:00Z',
        total: 199.90,
        status: 'refunded',
        items: ['4', '5'] // Holographic Interface, Digital Rain
    }
]

export const mockLibrary = [
    { ...mockProducts[0], purchasedAt: '2023-12-01T10:30:00Z' },
    { ...mockProducts[2], purchasedAt: '2023-12-01T10:30:00Z' },
    { ...mockProducts[1], purchasedAt: '2023-11-20T15:45:00Z' },
]

export const mockWishlist = [
    mockProducts[3],
    mockProducts[5]
]
