# Movie Master

A modern streaming platform for movie lovers to browse, discover, and manage their favorite films.

## Features

- Browse Movies - Explore an extensive collection of movies with beautiful poster displays
- Smart Search and Filter - Filter movies by genre and rating to find exactly what you want
- Personal Watchlist - Save movies to watch later with a personalized watchlist
- User Authentication - Secure login and registration powered by Firebase
- Add Movies - Contribute to the platform by adding new movies to the database
- Dark Mode - Toggle between light and dark themes for comfortable viewing
- Responsive Design - Seamless experience across desktop, tablet, and mobile devices

## Demo

Live Site: []

GitHub Repository: []

## Tech Stack

### Frontend
- React 18
- Vite
- React Router
- Tailwind CSS
- DaisyUI
- Lucide React
- SweetAlert2

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Firebase Authentication

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas Account
- Firebase Project


## Installation

### Step 1: Clone the Repository

```bash
git clone []
cd movie-master
```

### Step 2: Install Frontend Dependencies

```bash
npm install
```

### Step 3: Install Backend Dependencies

```bash
cd backend
npm install
cd ..
```

### Step 4: Set Up Firebase

1. Go to Firebase Console (https://console.firebase.google.com/)
2. Create a new project or use an existing one
3. Enable Authentication and Email/Password sign-in method
4. Copy your Firebase configuration and add to `.env` file

### Step 5: Set Up MongoDB Atlas

1. Go to MongoDB Atlas (https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier available)
3. Create a database user with username and password
4. Whitelist your IP address (or use 0.0.0.0/0 for development)
5. Get your connection string and add to backend `.env` file

### Step 6: Start the Application

Terminal 1 - Backend Server:
```bash
cd backend
npm start
```

Terminal 2 - Frontend Development Server:
```bash
npm run dev
```

The application will open at http://localhost:5173

## Project Structure

```
movie-master/
├── src/
│   ├── components/
│   │   ├── Navbar/
│   │   ├── Home/
│   │   ├── AllMovies/
│   │   ├── MovieDetails/
│   │   ├── MyWatchList/
│   │   ├── AddMovies/
│   │   ├── Login/
│   │   ├── Register/
│   │   └── ProtectedRoute/
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── ThemeContext.jsx
│   ├── layouts/
│   │   └── RootLayout.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css

├── public/
├── .env
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## Usage

### Browse Movies
1. Navigate to "All Movies" from the navbar
2. Filter by genre or rating using the filter options
3. Click on any movie card to view detailed information

### Add to Watchlist
1. Login or register for an account
2. Browse movies and click "Add to Watchlist" on any movie
3. Access your watchlist from "My WatchList" in the navbar

### Add New Movies
1. Login to your account
2. Navigate to "Add Movies"
3. Fill in the movie details (title, poster URL, genre, rating, year)
4. Submit to add the movie to the database

### Toggle Dark Mode
- Click the sun/moon icon in the navbar to switch between light and dark themes
- Your preference is saved automatically

## Authentication

- Firebase Authentication handles user registration and login
- Protected routes ensure only authenticated users can access certain features
- Session persistence keeps users logged in across browser sessions

## Dark Mode

The application features a comprehensive dark mode implementation:
- System-wide theme toggle
- Persistent theme preference saved in localStorage
- Smooth transitions between themes
- DaisyUI integration for automatic component styling

## API Endpoints

### Movies
- GET /movies - Fetch all movies
- GET /movies/:id - Fetch single movie by ID
- POST /movies - Add new movie (protected)
- GET /latest-movies - Fetch latest movies
- GET /top-rated-movies - Fetch top-rated movies

### Watchlist
- GET /watchlist/:email - Fetch user's watchlist
- POST /watchlist - Add movie to watchlist (protected)
- DELETE /watchlist/:id - Remove movie from watchlist (protected)

## Future Enhancements

- Review System - Allow users to write and read movie reviews
- Advanced Search - Search by title, director, cast
- User Profiles - Personalized user pages with watch history
- Movie Recommendations - AI-powered movie suggestions
- Social Features - Share watchlists with friends
- Watch History - Track movies you've watched
- Rating System - Let users rate movies

## Contributing

Contributions are welcome. Please follow these steps:

1. Fork the repository
2. Create a new branch (git checkout -b feature/amazing-feature)
3. Commit your changes (git commit -m 'Add some amazing feature')
4. Push to the branch (git push origin feature/amazing-feature)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments

- React - The UI library
- Vite - Build tool
- Tailwind CSS - CSS framework
- DaisyUI - Component library
- Firebase - Authentication service
- MongoDB - Database solution
- Lucide - Icon library

## Support

If you have any questions or need help, please open an issue in the GitHub repository.

---

If you found this project helpful, please give it a star on GitHub.

Happy Watching!
