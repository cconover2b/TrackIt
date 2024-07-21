// app/presentation/page.tsx
'use client'

import React from 'react'
import SlideDeck from '@/components/SlideDeck'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const PresentationPage = () => {
    const router = useRouter()

    return (
        <div className="relative">
            <Button 
                className="absolute top-4 left-4 z-10"
                onClick={() => router.back()}
                variant="outline"
            >
                Back to Dashboard
            </Button>
            <SlideDeck />
        </div>
    )
}

export default PresentationPage