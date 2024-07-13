'use client' // This directive indicates that the file should be treated as a client-side module
// app/dashboard/row-actions.tsx

// Importing necessary components and libraries
import { Button } from '@/components/ui/button'; // Importing a custom Button component
import { Ticket, TicketStatus, User } from '@/types'; // Importing types for Ticket, TicketStatus, and User
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'; // Importing DropdownMenu components
import { Row } from '@tanstack/react-table'; // Importing Row type from react-table
import { useRouter } from 'next/navigation'; // Importing useRouter hook for navigation
import React, { useReducer, useState } from 'react'; // Importing React and hooks
import { MdMoreVert } from 'react-icons/md'; // Importing icons
import { AiOutlineUserAdd, AiOutlineUserDelete, AiOutlineCheck } from 'react-icons/ai';
import { BsFillMapFill, BsFillTrashFill } from 'react-icons/bs';
import AlertModal from '@/components/modal/alert-modal'; // Importing custom AlertModal component
import { buildUrl } from '@/lib/utils'; // Importing utility function for building URLs
import { toast } from 'react-toastify'; // Importing toast for notifications
import InspectorList from './inspector-list'; // Importing custom InspectorList component
import MapDialog from '@/components/dialog/map-dialog'; // Importing custom MapDialog component

// Enum for alert dialog reasons
enum AlertDialogReasonEnum {
    NONE = "",
    MARK_COMPLETE = 'complete',
    DELETE = 'delete'
}

// Interface for the state managed by useReducer
interface RowActionReducerProps {
    alertDialog?: boolean,
    alertDialogReason?: AlertDialogReasonEnum,
    mapDialog?: boolean
}

// Define the RowActions component as a functional component
export function RowActions({
    row // Destructure row prop, which contains the data for a single row
}: {
    row: Row<Ticket> // Type annotation for row prop, ensuring it is a Row of Ticket type
}) {

    const ticket = row.original; // Extract the original ticket data from the row
    const router = useRouter(); // Initialize the router for navigation
    const [progress, setProgress] = useState(false); // State for tracking progress of async operations
    const [open, setOpen] = useState(false); // State for managing the open state of the InspectorList

    // Using useReducer for managing complex state
    const [state, setState] = useReducer((prevstate: RowActionReducerProps, params: RowActionReducerProps) => {
        return { ...prevstate, ...params }; // Merge the new state with the previous state
    }, {
        alertDialog: false,
        alertDialogReason: AlertDialogReasonEnum.NONE,
        mapDialog: false,
    });

    // Handler for delete action
    const handleDelete = () => {
        setState({
            alertDialog: true,
            alertDialogReason: AlertDialogReasonEnum.DELETE
        });
    };

    // Handler for mark complete action
    const handleMarkComplete = () => {
        setState({
            alertDialog: true,
            alertDialogReason: AlertDialogReasonEnum.MARK_COMPLETE
        });
    };

    // Handler for confirming actions in the alert dialog
    const handleConfirm = async () => {
        if (state.alertDialogReason === AlertDialogReasonEnum.DELETE) {
            setProgress(true);
            await fetch(buildUrl(`ticket/${ticket.id}`), {
                method: "DELETE"
            });
            setProgress(false);
            toast.success('Ticket deleted');
            router.refresh();
        } else if (state.alertDialogReason === AlertDialogReasonEnum.MARK_COMPLETE) {
            setProgress(true);
            await fetch(buildUrl(`ticket/${ticket.id}`), {
                method: 'PATCH',
                body: JSON.stringify({
                    status: TicketStatus.COMPLETED
                })
            });
            setProgress(false);
            toast.success('Ticket status updated');
            router.refresh();
        }
    };

    // Handler for assigning an inspector to a ticket
    // const handleInspectorAssign = async (inspector: User) => {
    //     try {
    //         setProgress(true);
            // await fetch(buildUrl(`ticket/${ticket.id}`), {
    //             method: 'PATCH',
    //             body: JSON.stringify({
    //                 inspector: inspector.id,
    //                 status: TicketStatus.ASSIGNED
    //             })
    //         });
    //         setProgress(false);
    //         toast.success(`Ticket assigned to ${inspector.fullName}`);
    //         router.refresh();
    //     } catch (error) {
    //         setProgress(false);
    //         console.log(error);
    //     }
    // };
    const handleInspectorAssign = async () => {
        try {
            setProgress(true);
            const result = await fetch(buildUrl(`ticket/${ticket.id}`), {
                method: 'PATCH',
                body: JSON.stringify({
                    status: TicketStatus.ASSIGNED
                })
            });
            const { status } = result;
            setProgress(false);
            if (status === 200) {
                toast.success(`Ticket marked as assigned`);
                router.refresh();
            } else {
                toast.error("Failed to update ticket");
            }
        } catch (error) {
            setProgress(true);
            toast.error("Server error");
            console.log(error);
        }
    };

    // Handler for unassigning an inspector from a ticket
    const handleUnassign = async () => {
        try {
            setProgress(true);
            const result = await fetch(buildUrl(`ticket/${ticket.id}`), {
                method: 'PATCH',
                body: JSON.stringify({
                    status: TicketStatus.UNASSIGNED
                })
            });
            const { status } = result;
            setProgress(false);
            if (status === 200) {
                toast.success(`Ticket marked as unassigned`);
                router.refresh();
            } else {
                toast.error("Failed to update ticket");
            }
        } catch (error) {
            setProgress(true);
            toast.error("Server error");
            console.log(error);
        }
    };

    // Handler for opening the map view dialog
    const handleMapview = () => {
        setState({
            mapDialog: true
        });
    };

    return (
        <>
            {/* Dropdown menu for row actions */}
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
                    <DropdownMenuItem onClick={() => setOpen(true)}>
                        <AiOutlineUserAdd className="mr-2 h-4 w-4" />
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleInspectorAssign}>
                        <AiOutlineUserDelete className="mr-2 h-4 w-4" />
                        Assign
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleUnassign}>
                        <AiOutlineUserDelete className="mr-2 h-4 w-4" />
                        UnAssign
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

            {/* Map dialog for viewing ticket location */}
            <MapDialog
                open={state.mapDialog!}
                onClose={() => setState({ mapDialog: false })}
                latlong={ticket.latlong!}
            />
            {/* Inspector list for assigning inspectors */}
            <InspectorList open={open} setOpen={setOpen} onInspectorAssign={handleInspectorAssign} />
            {/* Alert modal for confirming actions */}
            <AlertModal
                open={state.alertDialog!}
                onClose={() => setState({
                    alertDialog: false,
                    alertDialogReason: AlertDialogReasonEnum.NONE
                })}
                onConfirm={handleConfirm}
            />
        </>
    );
}

export default RowActions; // Export the component as the default export