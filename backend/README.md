# Newsgram Backend

A Node.js/Express backend with MongoDB for the Newsgram application.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Configuration**
   Create a `.env` file in the backend directory with the following variables:
   ```
   MONGO_URI=mongodb://localhost:27017/newsgram
   PORT=5000
   ```
   
   For MongoDB Atlas, use your connection string:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/newsgram
   ```

3. **Start MongoDB**
   - **Local MongoDB**: Start your local MongoDB service
   - **MongoDB Atlas**: Your cluster should already be running

4. **Seed the Database** (Optional)
   ```bash
   node seedData.js
   ```
   This will populate the database with sample posts and comments.

5. **Start the Server**
   ```bash
   # Development mode with auto-restart
   npm run dev
   
   # Production mode
   npm start
   ```

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

## Features

- MongoDB with Mongoose ODM
- RESTful API design
- CORS enabled for frontend integration
- Error handling middleware
- Data validation
- Population of referenced documents
