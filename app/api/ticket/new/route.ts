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

        const submitterName = userInfo.submitterName;
        const submitterPhone = userInfo.submitterPhone;
        const submitterEmail = userInfo.submitterEmail;
        const crossroads = userInfo.Crossroads;
        const notes = userInfo.notes;
        // const inspector = userInfo.inspector;
        const assignedInspector = userInfo.assignedInspector || null;
        const status = 'new'; // Assuming the default status is 'new'
        const photo = ''; // Assume the photo field is an empty string
        const dateOfRequest = new Date(); // Assuming the date of request is the current date and time
        const resolvedDate = null; // Assume the resolvedDate field is null for new tickets
        const latlong = userInfo.latlong;
        const lat = userInfo.latlong.lat;
        const long = userInfo.latlong.long;
        const fileBase64 = userInfo.image; // Assume the image is a base64 encoded string ***this is if we convert it

        let ticketToSave = {
            submitterName: submitterName,
            submitterPhone: submitterPhone,
            submitterEmail: submitterEmail,
            crossroads: crossroads,
            notes: notes, // Use the value of notes in the ticketToSave object
            photo: '',
            latlong: {
                coordinates: [lat, long]
            }
        };
        let downloadUrl: string;
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
        });
    } catch (error) {
        console.error("Error creating ticket:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}