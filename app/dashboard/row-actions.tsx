'use client'
// app/dashboard/row-actions.tsx

import React, { useReducer, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Ticket, TicketStatus, User } from '@/types'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Row } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'
import { MdMoreVert } from 'react-icons/md'
import { AiOutlineUserAdd, AiOutlineUserDelete, AiOutlineCheck, AiOutlineEdit } from 'react-icons/ai'
import { BsFillMapFill, BsFillTrashFill } from 'react-icons/bs'
import AlertModal from '@/components/modal/alert-modal'
import { buildUrl } from '@/lib/utils'
import { toast } from 'react-toastify'
import InspectorList from './inspector-list'
import MapDialog from '@/components/dialog/map-dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

// Enum for alert dialog reasons
enum AlertDialogReasonEnum {
    NONE = "",
    MARK_COMPLETE = 'complete',
    DELETE = 'delete'
}

// Interface for the state managed by useReducer
interface RowActionReducerProps {
    alertDialog: boolean;
    alertDialogReason: AlertDialogReasonEnum;
    mapDialog: boolean;
}

export function RowActions({ row }: { row: Row<Ticket> }) {
    const ticket = row.original
    const router = useRouter()
    const [progress, setProgress] = useState(false)
    const [inspectorListOpen, setInspectorListOpen] = useState(false)
    const [updateSheetOpen, setUpdateSheetOpen] = useState(false)
    const [updatedTicket, setUpdatedTicket] = useState<Partial<Ticket>>({})

    const [state, setState] = useReducer((prevstate: RowActionReducerProps, params: Partial<RowActionReducerProps>) => {
        console.log('Updating state:', params);
        return { ...prevstate, ...params }
    }, {
        alertDialog: false,
        alertDialogReason: AlertDialogReasonEnum.NONE,
        mapDialog: false,
    })

    const handleDelete = () => {
        console.log('Handle delete clicked');
        setState({
            alertDialog: true,
            alertDialogReason: AlertDialogReasonEnum.DELETE
        })
    }

    const handleMarkComplete = () => {
        console.log('Handle mark complete clicked');
        setState({
            alertDialog: true,
            alertDialogReason: AlertDialogReasonEnum.MARK_COMPLETE
        })
    }

    const handleConfirm = async () => {
        try {
            console.log('Handle confirm started');
            setProgress(true)
            if (state.alertDialogReason === AlertDialogReasonEnum.DELETE) {
                console.log('Deleting ticket:', ticket.id);
                await fetch(buildUrl(`ticket/${ticket.id}`), {
                    method: "DELETE"
                });
                toast.success('Ticket deleted')
            } else if (state.alertDialogReason === AlertDialogReasonEnum.MARK_COMPLETE) {
                console.log('Marking ticket as complete:', ticket.id);
                const response = await fetch(buildUrl(`ticket/${ticket.id}`), {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        status: TicketStatus.COMPLETED
                    })
                })
                if (!response.ok) throw new Error('Failed to mark ticket as complete')
                toast.success('Ticket marked as complete')
            }
            router.refresh();
        } catch (error) {
            console.error('Error in handleConfirm:', error);
            toast.error('An error occurred. Please try again.')
        } finally {
            console.log('Handle confirm finished');
            setProgress(false)
            setState({ alertDialog: false, alertDialogReason: AlertDialogReasonEnum.NONE })
        }
    }

    const handleInspectorAssign = async (inspector: User | null): Promise<void> => {
        try {
            console.log('Assigning inspector:', inspector);
            setProgress(true)
            const response = await fetch(buildUrl(`ticket/${ticket.id}`), {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    status: TicketStatus.ASSIGNED,
                    inspector: inspector ? inspector.id : null
                })
            });

            if (!response.ok) {
                throw new Error('Failed to update ticket')
            }

            const data = await response.json();
            toast.success(inspector ? `Assigned to ${inspector.fullName}` : 'Ticket marked as assigned')
            router.refresh()
        } catch (error) {
            console.error('Error in handleInspectorAssign:', error)
            toast.error("Failed to update ticket");
        } finally {
            console.log('Inspector assignment finished');
            setProgress(false)
            setInspectorListOpen(false)
        }
    }

    const handleUnassign = async () => {
        try {
            console.log('Unassigning inspector');
            setProgress(true)
            const response = await fetch(buildUrl(`ticket/${ticket.id}`), {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    status: TicketStatus.UNASSIGNED,
                    inspector: null
                })
            });

            if (!response.ok) {
                throw new Error('Failed to unassign ticket')
            }

            const data = await response.json()
            toast.success(data.message)
            router.refresh();
        } catch (error) {
            console.error('Error in handleUnassign:', error)
            toast.error("Failed to unassign ticket")
        } finally {
            console.log('Unassignment finished');
            setProgress(false)
        }
    }

    const handleMapview = () => {
        console.log('Opening map view');
        setState({
            mapDialog: true
        })
    }

    const handleUpdate = async () => {
        console.log('Updating ticket with data:', updatedTicket);
        setProgress(true)
        try {
            const response = await fetch(buildUrl(`ticket/${ticket.id}`), {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTicket)
            })

            if (!response.ok) throw new Error('Failed to update ticket')
            
            toast.success('Ticket updated successfully')
            router.refresh()
            setUpdateSheetOpen(false)
        } catch (error) {
            console.error('Error updating ticket:', error)
            toast.error("Failed to update ticket")
        } finally {
            console.log('Update finished');
            setProgress(false)
        }
    }

    const handleUpdateSheetOpen = () => {
        console.log('Opening update sheet for ticket:', ticket);
        setUpdatedTicket(ticket)
        setUpdateSheetOpen(true)
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
                    >
                        <span className='sr-only'>Open Menu</span>
                        <MdMoreVert />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={handleUpdateSheetOpen}>
                        <AiOutlineEdit className="mr-2 h-4 w-4" />
                        Update
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setInspectorListOpen(true)}>
                        <AiOutlineUserAdd className="mr-2 h-4 w-4" />
                        Assign
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleUnassign}>
                        <AiOutlineUserDelete className="mr-2 h-4 w-4" />
                        Unassign
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleMapview}>
                        <BsFillMapFill className="mr-2 h-4 w-4" />
                        Map View
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-green-600" onClick={handleMarkComplete}>
                        <AiOutlineCheck className="mr-2 h-4 w-4" />
                        Mark complete
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600" onClick={handleDelete}>
                        <BsFillTrashFill className="mr-2 h-4 w-4" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <MapDialog
                open={state.mapDialog}
                onClose={() => setState({ mapDialog: false })}
                latlong={ticket.latlong!}
            />
            
			<InspectorList 
				open={inspectorListOpen} 
				setOpen={setInspectorListOpen} 
				onInspectorAssign={handleInspectorAssign} 
			/>
			
			<AlertModal
				open={state.alertDialog}
				onClose={() => setState({
					alertDialog: false,
					alertDialogReason: AlertDialogReasonEnum.NONE
				})}
				onConfirm={handleConfirm}
			/>

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
							<Label htmlFor="crossroads" className="text-right">
                                Crossroads
							</Label>
							<Input
								id="crossroads"
								value={updatedTicket.crossroads || ''}
								onChange={(e) => setUpdatedTicket({...updatedTicket, crossroads: e.target.value})}
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
									<option key={status} value={status}>{status}</option>
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
						<Button type='button' disabled={progress} onClick={handleUpdate}>
							{progress ? 'Updating…' : 'Update Ticket'}
						</Button>
					</SheetFooter>

				</SheetContent>
			</Sheet>

        </>
    );
}

export default RowActions;