// components/appbar.tsx
'use client'

import { signOut, useSession } from 'next-auth/react'
import React from 'react'
import { Button } from './ui/button'
import NewTicketButton from '@/app/dashboard/new-ticket-button'
import { useRouter } from 'next/navigation'

function Appbar() {
    const {data: session} = useSession()
    const router = useRouter()

    const handlePresentationClick = () => {
        router.push('/presentation')
    }

    return (
        <div className='flex flex-col w-full mb-4'>
            <div className='text-right text-xs text-gray-500 mb-2'>
                {session?.user?.email}
            </div>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl font-bold text-gray-800'>Dashboard</h1>
                <div className="flex space-x-2">
                    <Button 
                        onClick={handlePresentationClick}
                        variant="outline"
                    >
                        Presentation
                    </Button>
                    <NewTicketButton />
                    <Button 
                        onClick={() => signOut({callbackUrl: '/'})}
                        variant="outline"
                    >
                        Logout
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Appbar