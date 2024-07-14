'use client' // This directive indicates that the file should be treated as a client-side module
// app/dashboard/row-actions.tsx

import React, { useReducer, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Ticket, TicketStatus, User } from '@/types';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Row } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { MdMoreVert } from 'react-icons/md';
import { AiOutlineUserAdd, AiOutlineUserDelete, AiOutlineCheck, AiOutlineEdit } from 'react-icons/ai';
import { BsFillMapFill, BsFillTrashFill } from 'react-icons/bs';
import AlertModal from '@/components/modal/alert-modal';
import { buildUrl } from '@/lib/utils';
import { toast } from 'react-toastify';
import InspectorList from './inspector-list';
import MapDialog from '@/components/dialog/map-dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

// ... (keep existing imports and enums)

export function RowActions({
    row
}: {
    row: Row<Ticket>
}) {
    const ticket = row.original;
    const router = useRouter();
    const [progress, setProgress] = useState(false);
    const [open, setOpen] = useState(false);
    const [updateSheetOpen, setUpdateSheetOpen] = useState(false);
    const [updatedTicket, setUpdatedTicket] = useState<Partial<Ticket>>({});

    // ... (keep existing state and handlers)

    const handleUpdate = () => {
        setUpdateSheetOpen(true);
        setUpdatedTicket(ticket);
    };

    const handleUpdateSubmit = async () => {
        try {
            setProgress(true);
            const response = await fetch(buildUrl(`ticket/${ticket.id}`), {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTicket),
            });

            if (response.ok) {
                toast.success('Ticket updated successfully');
                setUpdateSheetOpen(false);
                router.refresh();
            } else {
                toast.error('Failed to update ticket');
            }
        } catch (error) {
            console.error('Error updating ticket:', error);
            toast.error('An error occurred while updating the ticket');
        } finally {
            setProgress(false);
        }
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className='flex h-8 w-8 p-0 data-[state=open]:bg:muted'
                    >
                        <span className='sr-only'>Open Menu</span>
                        <MdMoreVert />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={handleUpdate}>
                        <AiOutlineEdit className="mr-2 h-4 w-4" />
                        Update
                    </DropdownMenuItem>
                    {/* ... (keep existing menu items) */}
                </DropdownMenuContent>
            </DropdownMenu>

            {/* ... (keep existing dialogs and modals) */}

            <Sheet open={updateSheetOpen} onOpenChange={setUpdateSheetOpen}>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Update Ticket</SheetTitle>
                    </SheetHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="name"
                                value={updatedTicket.submitterName || ''}
                                onChange={(e) => setUpdatedTicket({...updatedTicket, submitterName: e.target.value})}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="phone" className="text-right">
                                Phone
                            </Label>
                            <Input
                                id="phone"
                                value={updatedTicket.submitterPhone || ''}
                                onChange={(e) => setUpdatedTicket({...updatedTicket, submitterPhone: e.target.value})}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">
                                Email
                            </Label>
                            <Input
                                id="email"
                                value={updatedTicket.submitterEmail || ''}
                                onChange={(e) => setUpdatedTicket({...updatedTicket, submitterEmail: e.target.value})}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="status" className="text-right">
                                Status
                            </Label>
                            <select
                                id="status"
                                value={updatedTicket.status || ''}
                                onChange={(e) => setUpdatedTicket({...updatedTicket, status: e.target.value as TicketStatus})}
                                className="col-span-3"
                            >
                                {Object.values(TicketStatus).map((status) => (
                                    <option key={status} value={status}>
                                        {status}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="notes" className="text-right">
                                Notes
                            </Label>
                            <Textarea
                                id="notes"
                                value={updatedTicket.notes || ''}
                                onChange={(e) => setUpdatedTicket({...updatedTicket, notes: e.target.value})}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <SheetFooter>
                        <Button onClick={handleUpdateSubmit} disabled={progress}>
                            {progress ? 'Updating...' : 'Update Ticket'}
                        </Button>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </>
    );
}

export default RowActions;