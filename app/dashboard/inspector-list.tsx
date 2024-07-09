// app/dashboard/inspector-list.tsx
// Updated Code with Additional Safeguards and Logging
'use client'

import { Button } from '@/components/ui/button'
import { Combobox } from '@/components/ui/combobox'
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { User } from '@/types'
import React, { useState } from 'react'

function InspectorList({
    open,
    setOpen,
    onInspectorAssign
}: {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    onInspectorAssign: (value: User) => void
}) {

    const [inspector, setInspector] = useState<User>()

    const handleInspectorSelect = (user: User) => {
        console.log('Selected inspector:', user) // Log selected inspector
        setInspector(user)
    }

    const handleOpenChange = () => {
        setOpen(false)
    }

    const handleAssign = () => {
        if (inspector) {
            console.log('Assigning inspector:', inspector) // Log inspector being assigned
            onInspectorAssign(inspector)
            setOpen(false)
        } else {
            console.error('No inspector selected') // Log error if no inspector is selected
        }
    }

    return (
        <Sheet open={open} onOpenChange={handleOpenChange}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Inspector List</SheetTitle>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                    <Combobox onValueSelect={handleInspectorSelect} />
                </div>
                <SheetFooter>
                    <Button onClick={handleOpenChange} variant="outline" type='button'>Close</Button>
                    <Button onClick={handleAssign}>Assign</Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

export default InspectorList