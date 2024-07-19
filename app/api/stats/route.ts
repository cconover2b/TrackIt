// app/api/stats/route.ts

import { connectToDB } from "@/lib/db"
import { TicketModel } from "@/schemas/ticket"

export async function GET() {
    try {
        await connectToDB()

        const tickets = await TicketModel.aggregate([
            {
                $group: {
                    _id: { status: '$status' },
                    count: { $sum: 1 }
                }
            }
        ])

        return new Response(JSON.stringify(tickets), {
            headers: { 'Content-Type': 'application/json' }
        })

    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({
            message: "failed to get ticket stats"
        }), {
            headers: { 'Content-Type': 'application/json' }
        })
    }
}
