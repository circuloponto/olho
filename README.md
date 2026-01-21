# OLHO Animation Festival

A web application for the OLHO Animation Festival featuring information about films, authors, and the festival itself.

## Tech Stack

- **Frontend**: React + Vite
- **Backend**: Express.js + MongoDB (Mongoose)
- **Styling**: Custom CSS with modern dark theme

## Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB running locally or a MongoDB Atlas connection string

### Installation

1. **Install frontend dependencies:**
   ```bash
   cd olho
   npm install
   ```

2. **Install backend dependencies:**
   ```bash
   cd server
   npm install
   ```

3. **Configure MongoDB:**
   Edit `server/.env` and update the MongoDB URI if needed:
   ```
   MONGODB_URI=mongodb://localhost:27017/olho
   PORT=5000
   ```

### Running the Application

1. **Start MongoDB** (if running locally)

2. **Start the backend server:**
   ```bash
   cd server
   npm run dev
   ```

3. **Start the frontend (in a new terminal):**
   ```bash
   cd olho
   npm run dev
   ```

4. **Open your browser** at `http://localhost:5173`

### Seeding Sample Data

To populate the database with sample content:
```bash
cd server
npm run seed
```

## Project Structure

```
olho/
├── src/
│   ├── api/           # API client functions
│   ├── components/    # Reusable components (Navbar)
│   ├── pages/         # Page components (Home, About, Films, Authors)
│   └── App.jsx        # Main app with routing
├── server/
│   ├── models/        # Mongoose models
│   ├── routes/        # Express routes
│   ├── uploads/       # Uploaded media files
│   ├── server.js      # Express server
│   └── seed.js        # Database seeder
└── README.md
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/content/:type` | Get all content by type (about, film, author) |
| GET | `/api/content/item/:id` | Get single content by ID |
| POST | `/api/content` | Create new content (supports file upload) |
| PUT | `/api/content/:id` | Update content |
| DELETE | `/api/content/:id` | Delete content |

## Content Types

- **about**: Festival information sections
- **film**: Animated films with title, description, year, duration, video
- **author**: Creators with name, bio, country, website, image
