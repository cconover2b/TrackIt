# Campaign Sign Tracker

## Project Overview

Campaign Sign Tracker is a web-based application designed to help political campaigns efficiently manage and track the placement of campaign signs. This project aims to streamline the process of sign placement, maintenance, and monitoring, providing a user-friendly interface accessible from various devices.

## Features

- Map view showing sign locations as pins
- Database to track sign locations with filters and statuses
- User authentication and authorization
- Responsive design for desktop and mobile use
- Real-time updates for sign statuses (e.g., newly placed, need repair, stolen)
- Task assignment for sign installation and maintenance

## Technologies Used

- Next.js 14.2.4
- React 18
- TypeScript 4.9.5
- MongoDB with Mongoose 7.5.3
- Google Maps JavaScript API
- Firebase 10.5.2 (for image storage)
- Tailwind CSS 3.3.0
- NextAuth.js 4.24.7

## Prerequisites

- Node.js (Version 18.17.0 or later)
- npm (comes with Node.js)
- Git
- MongoDB (Version 5.0 or later)

## Installation

1. Clone the repository:
   ```
   git clone [your-repository-url]
   cd campaign-sign-tracker
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following:
   ```
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   FIREBASE_API_KEY=your_firebase_api_key
   FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   FIREBASE_PROJECT_ID=your_firebase_project_id
   FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   FIREBASE_APP_ID=your_firebase_app_id
   ```

4. Run the development server:
   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

1. Log in to the application using your credentials.
2. Use the map view to add new sign locations or view existing ones.
3. Update sign statuses as needed (e.g., installed, needs repair, removed).
4. Assign tasks to team members for sign installation or maintenance.
5. Use filters to view signs by status or location.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[Specify your license here]

## Contact

Craig Conover - cconover2@byui.edu

Project Link: [Your repository URL]
