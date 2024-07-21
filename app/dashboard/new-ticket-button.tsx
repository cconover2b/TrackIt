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
            console.log("About to send request for new ticket***");

            setNewTicket({
                ...newTicket,
                dateOfRequest: new Date(Date.now()),
            });
            //const [lat, long] = '33.3528,-111.7890'.split(',').map(Number);
            // setNewTicket({...newTicket, latlong: { lat: 33.3528, long: -111.7890 }});
            // console.log('******************************* newTicket***:' + JSON.stringify(newTicket));
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
                                onChange={(e) => setNewTicket({...newTicket, submitterName: e.target.value, latlong: { lat: 33.3528, long: -111.7890 }})}
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
                            <Label htmlFor="crossroads" className="text-right">
                                Crossroads
                            </Label>
                            <Input
                                id="crossroads"
                                value={newTicket.crossroads || ''}
                                onChange={(e) => setNewTicket({...newTicket, crossroads: e.target.value})}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="notes" className="text-right">
                                Notes
                            </Label>
                            <Input
                                id="notes"
                                value={newTicket.notes || ''}
                                onChange={(e) => setNewTicket({...newTicket, notes: e.target.value})}
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
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="assignedInspector" className="text-right">
                            Assigned Inspector
                            </Label>
                            <Textarea
                                id="assignedInspector"
                                value={newTicket.assignedInspector || 'none'}
                                onChange={(e) => setNewTicket({...newTicket, assignedInspector: e.target.value})}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="photo" className="text-right">
                                photo
                            </Label>
                            <Textarea
                                id="photo"
                                value={newTicket.photo || ''}
                                onChange={(e) => setNewTicket({...newTicket, photo: e.target.value})}
                                className="col-span-3"
                            />
                        </div>
                        {/* <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="latlong" className="text-right">
                                latlong
                            </Label>
                            <Textarea
                                id="latlong"
                                value={newTicket.latlong ? `${newTicket.latlong.lat},${newTicket.latlong.long}` : '33.3528,-111.7890'}
                                onChange={(e) => {
                                    console.log('latlong:*** ' + e.target.value);
                                    const [lat, long] = e.target.value.split(',').map(Number);
                                    console.log('lat:*** ' + lat);
                                    setNewTicket({...newTicket, latlong: { lat: lat, long: long }});
                                }}
                                className="col-span-3"
                            />
                        </div> */}
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


// {
//     "assignedInspector": "Bob Johnson",
//     "dateOfRequest": "2024-07-18T10:30:45.772+00:00",


//     "photo": "https://firebasestorage.googleapis.com/v0/b/petrescueyt-f751e.appspot.com/o?1720937543204.JPG?alt=media&token=9dfaa187-643f-4839-91aa-9471c8974df4",
//     "latlong": {
//         "lat": 48.8584,
//         "long": 2.2945
//     }
// }