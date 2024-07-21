# Software and Dependencies Installation Guide

This guide provides installation instructions for all software and dependencies required to run the application effectively.

## Core Software

**Node.js** (Version 18.17.0 or later)

```bash
# Using nvm (recommended)
nvm install 18.17.0
nvm use 18.17.0

# Or download and install from <https://nodejs.org/>
```

**npm** (Comes with Node.js)

```bash
# Update npm to the latest version
npm install -g npm@latest
```

**Git**

```bash
# On Ubuntu/Debian
sudo apt-get update
sudo apt-get install git

# On macOS using Homebrew
brew install git

# On Windows, download from <https://git-scm.com/download/win>
```

## Database

**MongoDB** (Version 5.0 or later) - npm install mongodb

```bash
# On Ubuntu/Debian
sudo apt-get install gnupg
wget -qO - <https://www.mongodb.org/static/pgp/server-5.0.asc> | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] <https://repo.mongodb.org/apt/ubuntu> focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org

# On macOS using Homebrew
brew tap mongodb/brew
brew install mongodb-community@5.0

# On Windows, download from <https://www.mongodb.com/try/download/community>
```

## Development Environment

**Visual Studio Code**

```bash
# On Ubuntu/Debian
sudo snap install --classic code

# On macOS using Homebrew
brew install --cask visual-studio-code

# On Windows, download from <https://code.visualstudio.com/>
```

## Project Dependencies

Clone the project repository and navigate to the project directory:

```bash
git clone [your-repository-url]
cd [your-project-name]
```

## Install project dependencies:

```bash
npm install
```

**This will install all dependencies listed in your `package.json`, including:**

### Frontend Dependencies:

```bash
npm install next@^14.2.4 react@^18 react-dom@^18 typescript@^4.9.5 next-auth@^4.24.7 react-icons@^5.0.1 react-spinners@^0.14.1 lucide-react@^0.331.0 formik@^2.4.6 yup@^1.4.0 react-toastify@^10.0.5 @googlemaps/js-api-loader@^1.16.6
```

| Dependency | NPM Prompt | Description |
| --- | --- | --- |
| next | ^14.2.4 | React framework for building the application |
| react | ^18 | JavaScript library for building user interfaces |
| react-dom | ^18 | React package for working with the DOM |
| typescript | ^4.9.5 | Typed superset of JavaScript |
| next-auth | ^4.24.7 | Authentication for Next.js applications |
| react-icons | ^5.0.1 | Popular icons for React projects |
| react-spinners | ^0.14.1 | Loading spinners for React |
| lucide-react | ^0.331.0 | Icon library for React |
| formik | ^2.4.6 | Form library for React |
| yup | ^1.4.0 | JavaScript schema builder for value parsing and validation |
| react-toastify | ^10.0.5 | Toast notifications for React |
| @googlemaps/js-api-loader | ^1.16.6 | Loader for Google Maps JavaScript API |

### Backend Dependencies:

```bash
npm install mongoose@^7.5.3 firebase@^10.5.2 bcrypt-ts@^5.0.2
```

| Dependency | NPM Prompt | Description |
| --- | --- | --- |
| mongoose | ^7.5.3 | MongoDB object modeling for Node.js |
| firebase | ^10.5.2 | Used for image storage and retrieval |
| bcrypt-ts | ^5.0.2 | Library for hashing passwords |

### UI and Styling Dependencies:

```bash
npm install tailwindcss@^3.3.0 postcss@^8 autoprefixer@^10.0.1 @radix-ui/class-variance-authority@^0.4.0 clsx@^2.1.0 tailwind-merge@^2.2.1 tailwindcss-animate@^1.0
```

| Dependency | NPM Prompt | Description |
| --- | --- | --- |
| tailwindcss | ^3.3.0 | Utility-first CSS framework |
| postcss | ^8 | Tool for transforming CSS with JavaScript |
| autoprefixer | ^10.0.1 | PostCSS plugin to parse CSS and add vendor prefixes |
| @radix-ui/class-variance-authority | ^0..4..0  Library for creating variant classes |  |
| clsx 2..1..0  Utility for constructing className strings |  |  |
| tailwind-merge 2..2..1  Utility function to merge Tailwind CSS classes |  |  |
| tailwindcss-animate 1..0..7  Plugin for Tailwind CSS animations |  |  |

### Development Dependencies:

```bash
npm install eslint@^8 eslint-config-next 14..1..0 @types/react 18 @types/react-dom 18 @types/node 20 @types/google.maps 3..55..5

```

| Dependency | NPM Prompt | Description |
| --- | --- | --- |
| eslint | 8 | Tool for identifying and reporting on patterns in JavaScript |
| eslint-config-next | 14.1.0 | ESLint configuration used by Next.js |
| @types/react | 18 | TypeScript types for React |
| @types/react-dom | 18 | TypeScript types for React DOM |
| @types/node | 20 | TypeScript types for Node.js |
| @types/google.maps | 3.55.5 | TypeScript types for Google Maps API |

## Environment Setup

Create a `.env.local` file in the root of your project with the following variables:

```tsx
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

## Installation Steps

1. Clone the repository
2. Run `npm install` to install all dependencies
3. Set up your MongoDB database and update the `MONGODB_URI` in `.env.local`
4. Set up Google Maps API and Firebase, and add the respective keys to `.env.local`
5. Run `npm run dev` to start the development server