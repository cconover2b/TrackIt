# Software and Dependencies Installation Guide

This guide provides installation instructions for all software and dependencies required to run the application effectively.

## Core Software

1. **Node.js** (Version 18.17.0 or later)
   ```bash
   # Using nvm (recommended)
   nvm install 18.17.0
   nvm use 18.17.0

   # Or download and install from https://nodejs.org/
   ```

2. **npm** (Comes with Node.js)
   ```bash
   # Update npm to the latest version
   npm install -g npm@latest
   ```

3. **Git**
   ```bash
   # On Ubuntu/Debian
   sudo apt-get update
   sudo apt-get install git

   # On macOS using Homebrew
   brew install git

   # On Windows, download from https://git-scm.com/download/win
   ```

## Database

4. **MongoDB** (Version 5.0 or later) - npm install mongodb
   ```bash
   # On Ubuntu/Debian
   sudo apt-get install gnupg
   wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
   echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
   sudo apt-get update
   sudo apt-get install -y mongodb-org

   # On macOS using Homebrew
   brew tap mongodb/brew
   brew install mongodb-community@5.0

   # On Windows, download from https://www.mongodb.com/try/download/community
   ```

## Development Environment

5. **Visual Studio Code**
   ```bash
   # On Ubuntu/Debian
   sudo snap install --classic code

   # On macOS using Homebrew
   brew install --cask visual-studio-code

   # On Windows, download from https://code.visualstudio.com/
   ```

## Project Dependencies

Clone the project repository and navigate to the project directory:

```bash
git clone [your-repository-url]
cd [your-project-name]
```

Install project dependencies:

```bash
npm install
```

This will install all dependencies listed in your `package.json`, including:

- Next.js
- Express - npm install express  #Framework for building web APIs & better manage routing, middleware, and responses. 
- React and React DOM
- TypeScript
- Mongoose - npm install mongoose
- Firebase
- @googlemaps/js-api-loader
- next-auth - npm install next-auth
- bcrypt-ts - npm install bcrypt-ts
- yup - npm install yup
- formik - npm install formik
- react-toastify
- @tanstack/react-table
- react-icons
- react-spinners
- lucide-react
- Tailwind CSS and related utilities
- @radix-ui components
- @testing-library/react - npm install --save-dev @testing-library/react
- jest - npm install --save-dev @types/jest
- Development dependencies (ESLint, type definitions, etc.)
install all of them - npm install react react-dom typescript mongoose firebase @googlemaps/js-api-loader next-auth bcrypt-ts yup formik react-toastify @tanstack/react-table react-icons react-spinners lucide-react tailwindcss @radix-ui/react @radix-ui/react-context @radix-ui/react-primitive @radix-ui/react-use-callback-ref @radix-ui/react-use-layout-effect eslint @babel/runtime autoprefixer eslint-config-next postcss @types/google.maps @types/node @types/react @types/react-dom --save

## Additional Software

6. **Google Cloud Platform Account**
   - Set up at: https://cloud.google.com/
   - Enable Google Maps JavaScript API - npm install @googlemaps/js-api-loade

7. **Firebase Account** - npm install firebase

   - Set up at: https://firebase.google.com/
   - Create a new project and set up Storage

## Environment Setup

Create a `.env.local` file in the root of your project:

```bash
touch .env.local
```

Add the following variables to `.env.local`, replacing the placeholder values with your actual credentials:

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

## Running the Application

Start the development server:

```bash
npm run dev
```