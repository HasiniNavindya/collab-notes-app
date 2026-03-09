# Collaborative Note-Taking App

A full-stack MERN (MongoDB, Express, React, Node.js) collaborative note-taking application with real-time features, JWT authentication, and modern UI design.

## Features

- **User Authentication**: Secure JWT-based authentication with login and registration
- **Note Management**: Create, edit, and delete notes with rich formatting
- **Collaboration**: Share notes with other users and manage collaborators
- **Full-Text Search**: Search through your notes with MongoDB text search
- **Note Organization**: 
  - Tag notes for easy categorization
  - Pin important notes to the top
  - Mark notes as favorites
  - Color-code notes for visual organization
- **Note Templates**: Pre-built templates for Meeting Notes, Project Plans, and To-Do Lists
- **Responsive Design**: Modern UI built with Tailwind CSS that works on all devices
- **User Profiles**: Personalized avatars and profile information

## Tech Stack

### Frontend
- **React** - UI framework
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first styling
- **Vite** - Build tool and dev server

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## Prerequisites

Before running this application, make sure you have the following installed:
- Node.js (v16 or higher)
- MongoDB (running locally or MongoDB Atlas account)
- npm or yarn package manager

## Environment Variables

### Server (.env)

Create a `.env` file in the `server` directory with the following variables:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

### Client

No environment variables required for the client. The API URL is configured to use `http://localhost:5000/api` by default.

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/HasiniNavindya/collab-notes-app.git
cd collab-notes-app
```

### 2. Install Server Dependencies

```bash
cd server
npm install
```

### 3. Install Client Dependencies

```bash
cd ../client
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the `server` directory following the template in `.env.example`:

```bash
cd ../server
cp .env.example .env
# Edit .env with your actual values
```

### 5. Start MongoDB

Make sure MongoDB is running on your system:
- **Local MongoDB**: Start the MongoDB service
- **MongoDB Atlas**: Use the connection string from your Atlas cluster

### 6. Run the Application

**Start the backend server:**
```bash
cd server
npm start
# Or for development with auto-reload:
npm run dev
```

**Start the frontend (in a new terminal):**
```bash
cd client
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## Usage

1. **Register**: Create a new account with your name, email, and password
2. **Login**: Sign in with your credentials
3. **Create Notes**: Click "+ New Note" to create a note
4. **Edit Notes**: Click on any note to view and edit it
5. **Organize**: Use colors, tags, and pin features to organize your notes
6. **Collaborate**: Add collaborators to share notes with other users
7. **Search**: Use the search bar to find notes by title or content

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile

### Notes
- `GET /api/notes` - Get all notes for logged-in user
- `POST /api/notes` - Create a new note
- `PUT /api/notes/:id` - Update a note
- `DELETE /api/notes/:id` - Delete a note
- `GET /api/notes/search?q=query` - Search notes

### Collaborators
- `POST /api/notes/:id/collaborators` - Add collaborator to note
- `DELETE /api/notes/:id/collaborators/:userId` - Remove collaborator

## Project Structure

```
collab-notes-app/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API service
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   ├── public/            # Static assets
│   └── package.json
├── server/                 # Express backend
│   ├── config/            # Configuration files
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Custom middleware
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── server.js          # Entry point
│   └── package.json
└── README.md
```

## Features in Detail

### Authentication & Authorization
- Secure password hashing with bcryptjs
- JWT token-based authentication
- Protected routes with middleware

### Collaboration
- Add multiple collaborators to notes
- View collaborator count on notes
- Search users by email to add as collaborators

### Search Functionality
- MongoDB full-text search on note titles and content
- Real-time search results

### Note Organization
- **Tags**: Categorize notes with custom tags
- **Colors**: 6 color themes (gray, blue, green, yellow, red, purple)
- **Pin**: Keep important notes at the top
- **Favorites**: Mark notes for quick access

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Author

Hasini Navindya
- GitHub: [@HasiniNavindya](https://github.com/HasiniNavindya)

## Acknowledgments

- Built as part of a MERN stack learning project
- Inspired by modern note-taking applications like Notion and Evernote
