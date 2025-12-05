'use client'

import React from 'react'
import { useUIStore } from '@/store'
import { VideoPreviewModal } from './VideoPreviewModal'
import { ConfirmModal } from './ConfirmModal'
import { AdminReviewModal } from './AdminReviewModal'

export function GlobalModalManager() {
    const { activeModal, modalData, closeModal } = useUIStore()

    if (!activeModal) return null

    return (
        <>
            {activeModal === 'VIDEO_PREVIEW' && (
                <VideoPreviewModal
                    isOpen={true}
                    onClose={closeModal}
                    data={modalData}
                />
            )}

            {activeModal === 'CONFIRM' && (
                <ConfirmModal
                    isOpen={true}
                    onClose={closeModal}
                    data={modalData}
                />
            )}

            {activeModal === 'ADMIN_REVIEW' && (
                <AdminReviewModal
                    isOpen={true}
                    onClose={closeModal}
                    data={modalData}
                />
            )}
        </>
    )
}
