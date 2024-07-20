// app/api/ticket/new/route.ts
import { connectToDB } from "@/lib/db";
import { storageRef } from "@/lib/firebase";
import { TicketModel } from "@/schemas/ticket";
import { getDownloadURL, uploadBytes } from "firebase/storage";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {

    try {
        await connectToDB();

        const userInfo = await request.json();

        console.log("*** does this work***");
        let downloadUrl = '';
        const submitterName = userInfo.submitterName;
        const submitterPhone = userInfo.submitterPhone;
        const submitterEmail = userInfo.submitterEmail;
        const crossroads = userInfo.Crossroads;
        const lat = userInfo.latlong.lat;
        const long = userInfo.latlong.long;
        const notes = userInfo.notes;
        const fileBase64 = userInfo.image; // Assume the image is a base64 encoded string

        let ticketToSave = {
            submitterName: submitterName,
            submitterPhone: submitterPhone,
            submitterEmail: submitterEmail,
            crossroads: crossroads,
            photo: '',
            latlong: {
                coordinates: [lat, long]
            }
        };

        if (fileBase64) {
            const filename = Date.now() + '.png'; // Assuming the file is a PNG image
            const ref = storageRef(`${filename}`);

            const buffer = Buffer.from(fileBase64, 'base64');
            await uploadBytes(ref, buffer);
            downloadUrl = await getDownloadURL(ref);
            ticketToSave['photo'] = downloadUrl;
        }

        // Save the ticket
        await TicketModel.create(ticketToSave);

        return NextResponse.json({
            message: "Ticket created",
            ticket: ticketToSave
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Something went wrong"
        });
    }
}
