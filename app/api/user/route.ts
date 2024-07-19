// app/api/user/route.ts

import { connectToDB } from "@/lib/db";
import { UserModel } from "@/schemas/user";

export async function GET() {
    try {
        await connectToDB();

        const users = await UserModel.find({});

        return new Response(JSON.stringify(users), {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({
            message: "Failed to get users"
        }), {
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
