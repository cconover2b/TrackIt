import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Combobox } from '@/components/ui/combobox'
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { User } from '@/types'

interface InspectorListProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onInspectorAssign: (value: User | null) => void;
}

function InspectorList({ open, setOpen, onInspectorAssign }: InspectorListProps) {
    const [inspector, setInspector] = useState<User | null>(null);

    const handleInspectorSelect = (user: User) => {
        console.log('Selected inspector:', user);
        setInspector(user);
    };

    const handleOpenChange = () => {
        setOpen(false);
    };

    const handleAssign = () => {
        console.log('Assigning inspector:', inspector);
        onInspectorAssign(inspector);
        setOpen(false);
    };

    const handleAssignWithoutInspector = () => {
        console.log('Assigning without specific inspector');
        onInspectorAssign(null);
        setOpen(false);
    };

    return (
        <Sheet open={open} onOpenChange={handleOpenChange}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Inspector List</SheetTitle>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                    <Combobox onValueSelect={handleInspectorSelect} />
                </div>
                <SheetFooter className="flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-2 pt-4 pb-2">
                    <Button 
                        onClick={handleOpenChange} 
                        variant="outline" 
                        type='button'
                        className="w-full h-16 sm:flex-1 text-sm"
                    >
                        Close
                    </Button>
                    <Button 
                        onClick={handleAssignWithoutInspector}
                        className="w-full h-16 sm:flex-1 text-sm"
                    >
                        Assign Without Inspector
                    </Button>
                    <Button 
                        onClick={handleAssign} 
                        disabled={!inspector}
                        className="w-full h-16 sm:flex-1 text-sm"
                    >
                        Assign to Selected Inspector
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}

export default InspectorList