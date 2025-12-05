'use client'

import React from 'react'
import { mockUsers } from '@/lib/mock-admin-data'
import { MoreVertical, Shield, Ban } from 'lucide-react'
import { Button } from '@/components/ui'

export default function UsersPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Usuários</h1>
                <p className="text-white/60">Gerencie compradores e vendedores da plataforma.</p>
            </div>

            <div className="rounded-2xl glass overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-white/10 bg-white/5">
                            <th className="p-4 text-xs font-medium text-white/50 uppercase">Usuário</th>
                            <th className="p-4 text-xs font-medium text-white/50 uppercase">Função</th>
                            <th className="p-4 text-xs font-medium text-white/50 uppercase">Status</th>
                            <th className="p-4 text-xs font-medium text-white/50 uppercase">Desde</th>
                            <th className="p-4 text-xs font-medium text-white/50 uppercase text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {mockUsers.map((user) => (
                            <tr key={user.id} className="hover:bg-white/5 transition-colors">
                                <td className="p-4">
                                    <div>
                                        <p className="font-medium text-white">{user.name}</p>
                                        <p className="text-xs text-white/40">{user.email}</p>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium capitalize ${user.role === 'vendor' ? 'bg-purple-500/10 text-purple-400' : 'bg-blue-500/10 text-blue-400'
                                        }`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium capitalize ${user.status === 'active' ? 'bg-green-500/10 text-green-400' :
                                            user.status === 'suspended' ? 'bg-red-500/10 text-red-400' : 'bg-yellow-500/10 text-yellow-400'
                                        }`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td className="p-4 text-sm text-white/60">
                                    {new Date(user.joined).toLocaleDateString()}
                                </td>
                                <td className="p-4 text-right">
                                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                        <MoreVertical className="w-4 h-4" />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
