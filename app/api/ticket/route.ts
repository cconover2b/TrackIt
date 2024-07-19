import { connectToDB } from "@/lib/db";
import { TicketModel } from "@/schemas/ticket";

export async function GET() {
    try {
        await connectToDB();

        const tickets = await TicketModel.find({}).populate('assignedInspector');
        console.log("populating the inspector for assign");

        return new Response(JSON.stringify(tickets), {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ message: "Failed to get tickets" }), {
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
