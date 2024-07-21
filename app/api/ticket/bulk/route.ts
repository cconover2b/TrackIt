// app/api/ticket/bulk/route.ts

import { connectToDB } from "@/lib/db";
import { storageRef } from "@/lib/firebase";
import { TicketModel } from "@/schemas/ticket";
import { Ticket } from "@/types";
import { deleteObject } from "firebase/storage";
import { ObjectId } from "mongodb";

export async function PATCH(
    req: Request
) {
    try {
        await connectToDB();

        const body = await req.json();
        const { tickets, status, submitterName } = body;
        
        await TicketModel.updateMany({
            _id: tickets.map((t: ObjectId) => t)
        }, {
            status: status,
            submitterName: submitterName
        });
        

        return new Response(JSON.stringify("Tickets updated"), {
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify("Failed to update tickets"), {
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

export async function DELETE(
    req: Request
) {
    try {
        const body = await req.json();
        const { tickets } = body;
        
        const ticketsToDelete = await TicketModel.find<Ticket>({
            _id: tickets.map((t: ObjectId) => t)
        });

        await TicketModel.deleteMany({
            _id: tickets.map((t: ObjectId) => t)
        });

        // TODO: also delete the firebase image
        
        if (ticketsToDelete.length > 0) {
            for (const ticket of ticketsToDelete) {
                if (ticket.photo) {
                    const ref = storageRef(ticket.photo);
                    await deleteObject(ref);
                }
            }
        }

        return new Response(JSON.stringify("Tickets deleted"), {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.log(error);
        
        return new Response(JSON.stringify("Failed to delete tickets"), {
            headers: { 'Content-Type': 'application/json' }
        });
    }
}