# Advance MERN Stack Blog Application

A secure, scalable, and feature-rich blogging platform built with the MERN stack. This application focuses on modern web standards, SEO optimization, and premium user experience.

## 🚀 Key Features

- **User Authentication**: JWT-based authentication with HTTP-only cookie storage.
- **Security**: Password hashing with `bcryptjs` and protected API routes.
- **Profile Management**: Customizable profiles with social links (YouTube, Instagram, etc.), bio, and Spotify integration.
- **Advanced Blogging**:
  - CRUD operations for posts.
  - SEO-friendly slug generation from titles.
  - Hashtag support for categorization.
  - Public/Private visibility controls.
- **Engagement**: Like system (one like per user) and trending posts algorithm.
- **Search & Discovery**: Full-text search by title, content, or hashtags.
- **UI/UX**: Responsive design with Tailwind CSS, Skeleton loaders, and Dark/Light mode support.

## 🛠️ Tech Stack

- **Frontend**: React.js, Tailwind CSS, Axios, Context API.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB Atlas (Mongoose ODM).
- **Auth**: JSON Web Tokens (JWT), Cookies.

## 📁 Project Structure

```text
AdvanceMERNBlog/
├── Project/
│   ├── client/               # React frontend
│   │   ├── src/
│   │   │   ├── components/   # Reusable UI components
│   │   │   ├── context/      # Auth & Theme context
│   │   │   ├── pages/        # Page views (Home, Blog, Profile)
│   │   │   └── utils/        # Axios config & helpers
│   ├── server/               # Node/Express backend
│   │   ├── config/           # Database connection
│   │   ├── controllers/      # Route controllers (Logic)
│   │   ├── middleware/       # Auth & validation middleware
│   │   ├── models/           # Mongoose schemas (User, Blog)
│   │   ├── routes/           # API route definitions
│   │   └── server.js         # Entry point
```

## ⚙️ Installation & Setup

### Prerequisites

- Node.js (v16+)
- MongoDB Atlas Account

### 1. Clone the repository

```bash
git clone <repository-url>
cd AdvanceMERNBlog
```

### 2. Backend Setup

```bash
cd Project/server
npm install
```

Create a `.env` file in the `Project/server` directory and add the following:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.itmrefk.mongodb.net/MernBlog?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_here
NODE_ENV=development
```

### 3. Frontend Setup

```bash
cd Project/client
npm install
```

### 4. Running the Application

**Start Backend:**

```bash
cd Project/server
npm run dev
```

**Start Frontend:**

```bash
cd Project/client
npm run dev
```

The application will be available at `http://localhost:5173`.

## 🔍 API Endpoints

| Method | Endpoint              | Description                 | Auth Required |
| :----- | :-------------------- | :-------------------------- | :------------ |
| `POST` | `/api/auth/register`  | Register a new user         | No            |
| `POST` | `/api/auth/login`     | Login and get cookie        | No            |
| `GET`  | `/api/blogs`          | Get latest & trending blogs | No            |
| `GET`  | `/api/blogs/:slug`    | Get blog by SEO slug        | No            |
| `POST` | `/api/blogs`          | Create a new blog post      | Yes           |
| `POST` | `/api/blogs/:id/like` | Like/Unlike a blog          | Yes           |
| `PUT`  | `/api/users/profile`  | Update user profile         | Yes           |

## 🛡️ Security Features

- **HttpOnly Cookies**: Protects JWT from XSS attacks.
- **Password Policy**: Minimum 8 characters, upper/lower case, and digits required.
- **Account Deactivation**: Users can hide their profile and posts without deleting the account.

## 📈 Future Enhancements

- Comment system & nested replies.
- Draft posts functionality.
- Bookmark/Save posts.
- Author following system.
- Admin dashboard for site management.
- Email notifications for likes and new posts.
