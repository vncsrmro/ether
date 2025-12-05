export const mockAdminStats = {
    totalUsers: 1450,
    newUsers: 125,
    totalRevenue: 45200.00,
    revenueGrowth: 15.2,
    activeProducts: 520,
    pendingApprovals: 8
}

export const mockUsers = [
    { id: 'u1', name: 'Alex Design', email: 'alex@design.com', role: 'vendor', status: 'active', joined: '2023-11-01' },
    { id: 'u2', name: 'Studio One', email: 'contact@studioone.com', role: 'buyer', status: 'active', joined: '2023-11-15' },
    { id: 'u3', name: 'VJ Mike', email: 'mike@vj.com', role: 'vendor', status: 'suspended', joined: '2023-10-20' },
    { id: 'u4', name: 'New Artist', email: 'artist@new.com', role: 'vendor', status: 'pending', joined: '2023-12-05' },
]

export const mockPendingApprovals = [
    {
        id: 'p1',
        title: 'Holographic UI Pack v2',
        vendor: 'Alex Design',
        submitted: '2023-12-05T09:00:00Z',
        price: 89.90,
        thumb: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=300&fit=crop'
    },
    {
        id: 'p2',
        title: 'Abstract Glitch Loops',
        vendor: 'New Artist',
        submitted: '2023-12-04T15:30:00Z',
        price: 39.90,
        thumb: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop'
    }
]
