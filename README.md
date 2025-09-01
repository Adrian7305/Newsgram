# Newsgram

A modern news/blog application built with React frontend and MongoDB backend.

## Features

- 📰 Infinite scroll post feed
- 💬 Comments system
- 🔍 Search and filtering
- 📱 Responsive design
- 🌙 Dark/Light theme toggle
- 🔖 Bookmark posts
- ❤️ Like posts
- 👤 User authentication

## Tech Stack

### Frontend
- React 19
- Axios for API calls
- Custom hooks for data fetching
- Infinite scroll with Intersection Observer

### Backend
- Node.js/Express
- MongoDB with Mongoose
- RESTful API design
- CORS enabled

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Newsgram
```

### 2. Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the backend directory:

4. **Start MongoDB**
   - **Local MongoDB**: Start your local MongoDB service
   - **MongoDB Atlas**: Your cluster should already be running
   
6. **Start the backend server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

### 3. Frontend Setup

1. **Navigate to project root**
   ```bash
   cd ..
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the React development server**
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`

## API Endpoints

### Posts
- `GET /api/posts` - Get all posts (with pagination)
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create new post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post

### Comments
- `GET /api/comments` - Get all comments
- `GET /api/comments/:id` - Get single comment
- `GET /api/comments/post/:postId` - Get comments for specific post
- `POST /api/comments` - Create new comment
- `PUT /api/comments/:id` - Update comment
- `DELETE /api/comments/:id` - Delete comment

## Database Schema

### Posts Collection
- `_id`: ObjectId
- `title`: String (required)
- `body`: String (required)
- `author`: String (required)
- `created_at`: Date
- `likes`: Number (default: 0)
- `bookmarked`: Boolean (default: false)
- `tags`: [String]

### Comments Collection
- `_id`: ObjectId
- `postId`: ObjectId (reference to Posts._id)
- `name`: String (required)
- `text`: String (required)
- `created_at`: Date

## Project Structure

```
Newsgram/
├── backend/                 # Node.js/Express backend
│   ├── models/             # Mongoose models
│   ├── controllers/        # Route controllers
│   ├── routes/             # API routes
│   ├── server.js           # Main server file
│   ├── seedData.js         # Database seeding script
│   └── package.json
├── src/                    # React frontend
│   ├── api/               # API service layer
│   ├── components/        # React components
│   ├── hooks/             # Custom React hooks
│   ├── context/           # React context providers
│   ├── pages/             # Page components
│   └── utils/             # Utility functions
├── public/                # Static assets
└── package.json
```

## Development

### Running Both Servers

1. **Terminal 1 - Backend**
   ```bash
   cd backend
   npm run dev
   ```

2. **Terminal 2 - Frontend**
   ```bash
   npm start
   ```

### Database Management

- **Seed data**: `cd backend && node seedData.js`
- **Clear data**: Use MongoDB Compass or mongo shell
- **View data**: MongoDB Compass or mongo shell

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.
