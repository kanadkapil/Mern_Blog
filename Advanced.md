# 📘 MERN Stack Blog Application – Project Report

---

## 1️⃣ Introduction

The **MERN Stack Blog Application** is a full-stack web application that allows users to create, manage, and share blog posts securely. The platform provides authentication, user profiles, blog management, and engagement features such as likes, trending posts, and search functionality.

The project is built using the **MERN stack (MongoDB, Express.js, React.js)** with **Tailwind CSS** for responsive UI design. The application focuses on security, performance, SEO-friendly URLs, and a clean user experience.

---

## 2️⃣ Objectives of the Project

- Build a secure blog platform with authentication
- Allow users to manage their profiles and posts
- Implement SEO-friendly blog URLs using slugs
- Provide post interaction through likes
- Support searching, filtering, and trending posts
- Enhance UI/UX using dark/light mode and skeleton loaders
- Use session-based login with automatic logout after 1 day

---

## 3️⃣ Technology Stack Used

### Frontend

- React.js
- Tailwind CSS
- Axios
- Context API

### Backend

- Node.js
- Express.js
- JWT Authentication
- Cookie-based session management

### Database

- MongoDB (MongoDB Atlas)

---

## 4️⃣ System Architecture

User → React Frontend → Express API → MongoDB
↘ Cookies (Session)

- Frontend communicates with backend using REST APIs
- Authentication is handled using JWT stored in HTTP-only cookies
- MongoDB stores users, profiles, and blog posts

---

## 5️⃣ Functional Requirements

### 5.1 User Authentication

- User registration with strong password validation:
  - Minimum 8 characters
  - At least 1 uppercase letter
  - At least 1 lowercase letter
  - At least 1 number
- Secure login using cookies
- Session expires automatically after 24 hours
- Logout clears session cookie

---

### 5.2 User Profile Management

- Each user has a unique profile
- Profile picture upload support
- Social links:
  - YouTube
  - Instagram
  - Facebook
  - Gmail
  - LinkedIn
  - GitHub
- Individual visibility toggles for each social link
- Profile can be set public or private
- User can activate/deactivate their entire account

---

## 6️⃣ Blog Post Features

### 6.1 Blog Creation

Each post contains:

- Title
- SEO-friendly slug
- Content
- Cover image
- Author name
- Auto-generated posting date
- Hashtags (categories)
- Public/Private toggle

---

### 6.2 SEO-Friendly Post Slug

- Slug is generated from the title
- Example:

Title: Learning MERN Stack
URL: /post/learning-mern-stack

- Improves readability and search engine ranking

---

### 6.3 Post Editing History (Simple Version)

- Tracks:
- `createdAt`
- `updatedAt`
- Shows when a post was last edited
- Helps users maintain content updates

---

## 7️⃣ Engagement Features

### 7.1 Like / Reaction System

- Users can like posts
- One like per user per post
- Like count is displayed on each post
- Helps identify popular content

---

### 7.2 Trending Posts

Trending posts are calculated based on:

- Number of likes
- Recent activity
- Public visibility only

Trending section:

- Displays the most popular posts
- Updates dynamically

---

## 8️⃣ Search, Filter & Discovery

### Search Functionality

Users can search posts by:

- Title
- Content
- Hashtags

### Filters

- Latest posts
- Trending posts
- Hashtag-based filtering

This improves content discoverability and user engagement.

---

## 9️⃣ UI / UX Features

### 9.1 Dark / Light Mode

- Users can switch between themes
- Preference is saved in the database
- Improves accessibility and reading comfort

---

### 9.2 Skeleton Loaders

- Displayed while data is loading
- Improves perceived performance
- Provides a smooth user experience instead of spinners

---

## 🔟 Security Features

- Password hashing using bcrypt
- JWT stored in HTTP-only cookies
- Route protection using middleware
- Session auto-expiry after 1 day
- Account deactivation hides profile and posts

---

## 1️⃣1️⃣ Database Design Overview

### User Collection

- User ID
- Email
- Password (hashed)
- `isActive`
- `createdAt`

---

### Profile Collection

- User ID (reference)
- Profile picture
- Social links
- Visibility switches
- Theme preference

---

### Post Collection

- Post ID
- Author ID
- Title
- Slug
- Content
- Cover image
- Hashtags
- Likes
- `isPublic`
- `createdAt`
- `updatedAt`

---

## 1️⃣2️⃣ Non-Functional Requirements

- Responsive UI
- Secure authentication
- Fast loading time
- Scalable architecture
- SEO-friendly URLs

---

## 1️⃣3️⃣ Future Enhancements

- Comment system
- Draft posts
- Bookmark posts
- Follow authors
- Admin dashboard
- Email notifications

---

## 1️⃣4️⃣ Conclusion

The **MERN Stack Blog Application** demonstrates full-stack development skills including authentication, database design, REST APIs, state management, and responsive UI design.

This project is beginner-friendly yet powerful enough to represent a real-world blogging platform and serves as a strong portfolio project for internships and placements.

---

# Paragraph Prompt

The MERN Stack Blog Application is a full-stack web-based blogging platform designed to demonstrate a complete real-world implementation of modern web development concepts using MongoDB, Express.js, React.js, and Node.js, with Tailwind CSS for responsive and accessible user interface design. The application allows users to securely register and log in using a strong password policy that enforces a minimum of eight characters containing at least one uppercase letter, one lowercase letter, and one numeric digit, ensuring a basic level of authentication security. Upon successful login, authentication is managed through JWT tokens stored inside HTTP-only cookies configured with a strict expiration period of twenty-four hours, which enables session-based authentication and automatically logs the user out of the browser once the session expires, without relying on insecure client-side storage. Each registered user is assigned a unique identifier generated by MongoDB, which is consistently used across the system to associate user accounts with their corresponding profiles and blog posts. Every user has a dedicated profile that supports uploading and displaying a profile picture, adding personal social media links including YouTube, Instagram, Facebook, Gmail, LinkedIn, and GitHub, as well as embedding a favorite Spotify track, with granular visibility controls implemented through toggle switches that allow users to individually show or hide each social link from public view. The profile system further supports global visibility controls, enabling users to set their profile as public or private, and to fully activate or deactivate their account, where deactivation hides the entire profile and all associated blog posts from public access while preserving data in the database. The blogging system enables authenticated users to create blog posts containing a title, rich textual content, a cover image, hashtags for categorization and improved searchability, the author’s name, and an automatically generated publishing timestamp, with each post also supporting a public or private visibility state that determines whether the content can be viewed by other users. To improve search engine optimization and user-friendly navigation, each blog post automatically generates a unique SEO-friendly slug derived from its title, which is used in the post URL structure to create readable and meaningful links rather than relying on raw database identifiers. A simple post editing history mechanism is implemented by tracking creation and last-updated timestamps, allowing users and readers to identify when content was last modified without maintaining complex version histories. User engagement is encouraged through a like or reaction system that allows authenticated users to like posts while preventing duplicate reactions by enforcing a one-like-per-user-per-post rule, and these interaction metrics are further utilized to calculate and display trending posts based on factors such as the number of likes, recent activity, and public visibility status. The application includes a comprehensive search, filter, and discovery system that allows users to find content using keywords, hashtags, or filters such as latest posts and trending posts, significantly improving content discoverability and user experience. From a user interface and experience perspective, the application supports a dark and light mode theme toggle, with user preferences stored persistently to maintain consistency across sessions, and employs skeleton loaders during data fetching to improve perceived performance and provide a smoother visual experience compared to traditional loading indicators. Security considerations are integrated throughout the system, including password hashing, protected backend routes using middleware, session expiration handling, and account-level visibility enforcement, ensuring that deactivated users and private content are never exposed. Overall, this project serves as a comprehensive beginner-friendly yet industry-aligned full-stack application that illustrates core concepts such as authentication, authorization, database modeling, RESTful API design, SEO optimization, UI/UX best practices, and scalable architecture, making it suitable for academic submission, portfolio presentation, and further expansion with advanced features such as comments, bookmarks, analytics dashboards, and administrative moderation tools.

# Json Prompt

{
"project_name": "MERN Stack Blog Application",
"project_type": "Full-stack web application",
"description": "A secure and scalable blogging platform built using the MERN stack that allows users to register, authenticate, manage profiles, create blog posts, and interact with content through likes, search, and trending features, with strong emphasis on security, SEO, and user experience.",
"technology_stack": {
"frontend": ["React.js", "Tailwind CSS", "Axios", "Context API"],
"backend": ["Node.js", "Express.js"],
"database": ["MongoDB", "MongoDB Atlas"],
"authentication": ["JWT", "HTTP-only cookies"],
"ui_features": ["Dark mode", "Light mode", "Skeleton loaders"]
},
"authentication_and_session": {
"authentication_type": "Session-based authentication using JWT",
"token_storage": "HTTP-only cookies",
"session_duration": "24 hours",
"auto_logout": true,
"password_policy": {
"minimum_length": 8,
"requires_uppercase": true,
"requires_lowercase": true,
"requires_digit": true,
"alphanumeric_only": true
}
},
"user_management": {
"unique_user_id": "MongoDB ObjectId",
"account_activation": {
"can_activate": true,
"can_deactivate": true,
"deactivation_effect": "Hides profile and all posts from public access"
}
},
"profile_features": {
"profile_picture": true,
"bio": true,
"social_links": {
"youtube": { "enabled": true, "visibility_toggle": true },
"instagram": { "enabled": true, "visibility_toggle": true },
"facebook": { "enabled": true, "visibility_toggle": true },
"gmail": { "enabled": true, "visibility_toggle": true },
"linkedin": { "enabled": true, "visibility_toggle": true },
"github": { "enabled": true, "visibility_toggle": true }
},
"spotify_music": {
"enabled": true,
"type": "Favorite track or embed link"
},
"profile_visibility": {
"public": true,
"private": true
}
},
"blog_post_features": {
"post_fields": {
"title": true,
"content": true,
"cover_image": true,
"author_name": true,
"posting_date": "Automatically generated",
"hashtags": true
},
"visibility_control": {
"public": true,
"private": true
},
"seo": {
"slug_generation": true,
"slug_source": "Generated from post title",
"url_example": "/post/seo-friendly-post-title"
},
"editing_history": {
"simple_version": true,
"tracked_fields": ["createdAt", "updatedAt"]
}
},
"engagement_features": {
"likes": {
"enabled": true,
"one_like_per_user": true
},
"trending_posts": {
"calculation_factors": ["likes", "recent_activity", "public_visibility"]
}
},
"search_and_discovery": {
"search_by": ["title", "content", "hashtags"],
"filters": ["latest_posts", "trending_posts", "hashtag_based"]
},
"ui_ux_features": {
"theme_toggle": {
"dark_mode": true,
"light_mode": true,
"preference_persistence": true
},
"loading_experience": {
"skeleton_loaders": true,
"purpose": "Improve perceived performance"
}
},
"security_features": {
"password_hashing": "bcrypt",
"protected_routes": true,
"middleware_authorization": true,
"session_expiry_enforced": true,
"private_content_protection": true
},
"non_functional_requirements": {
"responsive_design": true,
"scalability": true,
"performance_optimized": true,
"seo_friendly": true
},
"future_enhancements": [
"Comment system",
"Draft posts",
"Bookmark posts",
"Follow authors",
"Admin dashboard",
"Email notifications"
],
"intended_use": [
"Academic submission",
"Beginner-friendly learning project",
"Portfolio project",
"Full-stack development demonstration"
]
}
