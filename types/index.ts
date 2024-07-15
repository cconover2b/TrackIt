// types/index.ts

// Type definition for a Ticket
export type Ticket = {
    id: number, // Unique identifier for the ticket
    submitterName: string, // Name of the person submitting the ticket
    submitterPhone: string, // Phone number of the submitter
    submitterEmail?: string, // Optional email address of the submitter
    crossroads: string, // Crossroads information
    assignedInspector?: string, // Optional ID of the assigned inspector
    dateOfRequest: Date, // Date when the ticket was created
    resolvedDate?: Date, // Optional date when the ticket was resolved
    status: string, // Status of the ticket
    notes?: string, // Optional additional notes related to the ticket
    photo?: string, // Optional URL or path to a photo related to the ticket
    latlong?: LatLong // Optional geographical coordinates
}

// Type definition for geographical coordinates (GeoJSON format)
export type LatLong = {
    type?: string, // Type of GeoJSON object, default is 'Point'
    coordinates: number[] // Array of numbers representing the coordinates
}

// Type definition for a User
export type User = {
    id: string, // Unique identifier for the user
    firstname: string, // First name of the user
    lastname: string, // Last name of the user
    email: string, // Email address of the user
    password: string, // Password of the user (should be hashed in production)
    fullName: string // Full name of the user (virtual field)
}

// Enum for Ticket Status
export enum TicketStatus {
    NEW = 'new', // Add a sign 
    COMPLETED = 'completed', // Placed sign 
    ASSIGNED = 'assigned', // Assigned to be Fixed
    UNASSIGNED = 'unassigned' // Disappeared. Either ADD a new sign or DELETE it
    // DELETED = sign is deleted 
}