// app/api/ticket/[ticketid]/route.ts

import { connectToDB } from "@/lib/db";
import { TicketModel } from "@/schemas/ticket";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params } : { params : { ticketid: string }}
) {
    await connectToDB();
    
    const body = await req.json();
    const { status } = body;
    const ticketId = params.ticketid;

    if (!ticketId) {
        return new NextResponse("Ticketid is required", { status: 400 });
    }

    try {
        const ticket = await TicketModel.findByIdAndUpdate(
            ticketId,
            { status: status },
            { new: true }
        );

        if (!ticket) {
            return new NextResponse("Ticket not found", { status: 404 });
        }

        return NextResponse.json({
            ticket: ticket,
            message: "Ticket updated"
        });
    } catch (error) {
        console.error("Error updating ticket:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}