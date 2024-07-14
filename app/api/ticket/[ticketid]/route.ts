// app/api/ticket/[ticketid]/route.ts

import { connectToDB } from "@/lib/db";
import { TicketModel } from "@/schemas/ticket";
import { NextRequest, NextResponse } from "next/server";
import { TicketStatus } from "@/types";

export async function PATCH(
    req: NextRequest,
    { params }: { params: { ticketid: string } }
) {
    try {
        await connectToDB();
        
        const body = await req.json();
        const { status, inspector } = body;
        const ticketId = params.ticketid;

        if (!ticketId) {
            return new NextResponse("Ticketid is required", { status: 400 });
        }

        const updateData: any = {};
        if (status) {
            if (!Object.values(TicketStatus).includes(status)) {
                return new NextResponse("Invalid status value", { status: 400 });
            }
            updateData.status = status;
        }
        if (inspector !== undefined) {
            updateData.assignedInspector = inspector || null;
        }

        const ticket = await TicketModel.findByIdAndUpdate(
            ticketId,
            updateData,
            { new: true, runValidators: true }
        );

        if (!ticket) {
            return new NextResponse("Ticket not found", { status: 404 });
        }

        return NextResponse.json({
            ticket: ticket,
            message: "Ticket updated successfully"
        });
    } catch (error) {
        console.error("Error updating ticket:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}