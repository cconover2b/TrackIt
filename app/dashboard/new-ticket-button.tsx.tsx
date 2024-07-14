// app/dashboard/new-ticket-button.tsx
'use client'

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Ticket, TicketStatus } from '@/types';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { buildUrl } from '@/lib/utils';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const NewTicketButton: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [newTicket, setNewTicket] = useState<Partial<Ticket>>({});
    const [progress, setProgress] = useState(false);
    const router = useRouter();

    const handleSubmit = async () => {
        try {
            setProgress(true);
            const response = await fetch(buildUrl('ticket/new'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTicket),
            });

            if (response.ok) {
                toast.success('New ticket created successfully');
                setIsOpen(false);
                setNewTicket({});
                router.refresh();
            } else {
                toast.error('Failed to create new ticket');
            }
        } catch (error) {
            console.error('Error creating new ticket:', error);
            toast.error('An error occurred while creating the ticket');
        } finally {
            setProgress(false);
        }
    };

    return (
        <>
            <Button onClick={() => setIsOpen(true)}>Add New Ticket</Button>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Create New Ticket</SheetTitle>
                    </SheetHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="name"
                                value={newTicket.submitterName || ''}
                                onChange={(e) => setNewTicket({...newTicket, submitterName: e.target.value})}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="phone" className="text-right">
                                Phone
                            </Label>
                            <Input
                                id="phone"
                                value={newTicket.submitterPhone || ''}
                                onChange={(e) => setNewTicket({...newTicket, submitterPhone: e.target.value})}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">
                                Email
                            </Label>
                            <Input
                                id="email"
                                value={newTicket.submitterEmail || ''}
                                onChange={(e) => setNewTicket({...newTicket, submitterEmail: e.target.value})}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="status" className="text-right">
                                Status
                            </Label>
                            <select
                                id="status"
                                value={newTicket.status || TicketStatus.NEW}
                                onChange={(e) => setNewTicket({...newTicket, status: e.target.value as TicketStatus})}
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
                                value={newTicket.notes || ''}
                                onChange={(e) => setNewTicket({...newTicket, notes: e.target.value})}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <SheetFooter>
                        <Button onClick={handleSubmit} disabled={progress}>
                            {progress ? 'Creating...' : 'Create Ticket'}
                        </Button>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </>
    );
};

export default NewTicketButton;