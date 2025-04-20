# 🍽️ Tailus Feedus - Recipe App

A modern, responsive web application for discovering, managing, and sharing recipes using the [MealDB API](https://www.themealdb.com/). Built with **Next.js 14 (Pages Router)**, **Tailwind CSS 3.4**, and **Tanstack Query**, Tailus Feedus offers a seamless user experience with authentication, recipe management, and a shopping cart. Whether you're browsing top recipes or adding your own, this app makes cooking delightful! 🚀

---

## 📋 Project Overview

Tailus Feedus is a recipe platform where users can:
- Explore recipes by name, ingredient, or category.
- Add recipes to a cart for meal planning.
- Create accounts to add, manage, and delete personal recipes.
- Enjoy a consistent, mobile-responsive design with accessibility in mind.

The app integrates with the MealDB API for recipe data and uses `localStorage` for user and recipe persistence, with a modern UI featuring yellow gradients and `Geist Sans` typography.

---

## ✨ Features Implemented

### Non-Technical Description
- **Discover Recipes** 🌟: Browse top recipes on the home page, search by name, ingredient, or category, and view detailed recipe pages with ingredients and instructions.
- **Shopping Cart** 🛒: Add recipes to your cart to plan meals, with the cart count displayed in the navigation bar. Your cart saves locally and syncs with your account if logged in.
- **User Accounts** 👤: Sign up with your name, email, and password, then log in to access personalized features like adding recipes and viewing your profile.
- **Add Your Recipes** 🍳: Create and share your own recipes through a simple 3-step form, including recipe details, ingredients, and instructions.
- **Manage Recipes** ✏️: View and delete your recipes from your profile or recipe details page.
- **Responsive Design** 📱: Enjoy a seamless experience on mobile, tablet, or desktop with a clean, modern look.
- **Notifications** 🔔: Get instant feedback with toast notifications for actions like signing up, logging in, or adding recipes.
- **Accessibility** ♿: Navigate easily with keyboard support and screen reader compatibility.

### Technical Description
- **Authentication** (`UserContext`):
  - **Signup/Login**: Client-side forms at `/signup` and `/login` with validation (email format, password length). Stores user data in `localStorage`.
  - **UserContext**: Manages user state (`name`, `email`, `password`, `recipes`) and provides `signup`, `login`, `logout` functions.
  - **Protected Routes**: `/add-recipe` and `/profile` redirect to `/login` if not authenticated.
- **Recipe Management**:
  - **Multi-Step Form** (`/add-recipe`): 3-step form (Basic Info, Ingredients, Instructions) with progress indicators, dynamic ingredient fields, and validation. Recipes stored in `localStorage` with `userId`.
  - **Recipe Deletion**: Delete buttons in `RecipeDetails` and `/profile` for user-added recipes, updating `localStorage`.
  - **HttpKit Integration**: Modified `HttpKit` to include user recipes in `getTopRecipes`, `searchRecipesByName`, `searchRecipesByIngredient`, `filterByCategory`, and `getRecipeDetails`.
- **Cart Functionality** (`CartContext`):
  - Persists cart items in `localStorage`, synced with user account if logged in.
  - Displays cart count in `Navbar` and allows adding recipes from `RecipeCard`, `SingleRecipe`, and `RecipeDetails`.
- **Pages**:
  - **Home** (`/`): `RecipesList` with `Hero` banner, search bar, and top recipes grid.
  - **All Recipes** (`/all-recipes`): Displays all recipes with search and pagination support.
  - **Recipe Details** (`/recipes/[id]`): Shows recipe details, ingredients, instructions, and actions (add to cart, share, delete for user recipes).
  - **Cart** (`/cart`): Lists cart items with quantity controls and removal.
  - **Profile** (`/profile`): Displays user info and their recipes with delete options.
  - **Signup/Login** (`/signup`, `/login`): Authentication forms with validation and toast feedback.
  - **Add Recipe** (`/add-recipe`): Multi-step form for creating recipes.
- **UI/UX**:
  - **Navbar**: Sticky navigation with links to `/all-recipes`, `/cart`, `/add-recipe`, `/profile` (authenticated users), and dynamic auth buttons (`Sign Up`, `Log In`, `Log Out`).
  - **Footer**: Dark-themed with brand info, navigation, social media links (`Twitter`, `GitHub`, `LinkedIn`), and copyright.
  - **Hero**: Modern banner with gradient background, bold typography, and CTA (`Browse Recipes`).
  - **Styling**: Uses `bg-gray-50`, yellow gradients (`from-yellow-200 to-yellow-300`), `Geist Sans` font, and `animate-fade-in` transitions.
  - **Responsive**: Mobile-first design with Tailwind’s responsive utilities (e.g., `flex-col md:flex-row`, `grid-cols-1 lg:grid-cols-3`).
- **Additional Features**:
  - **Toast Notifications**: `react-toastify` for feedback on signup, login, logout, recipe add/delete.
  - **Accessibility**: ARIA labels, keyboard navigation, semantic HTML (`section`, `main`, `form`).
  - **Animations**: `animate-fade-in` for components (`Hero`, `Navbar`, `Footer`, forms).

---

## 🐞 Bug Fixes

1. **Mobile Menu Toggle Complexity**:
   - **Issue**: `Navbar` used a CSS `peer-checked` checkbox hack for mobile menu, making it hard to maintain and less React-idiomatic.
   - **Fix**: Replaced with `useState` for `isOpen`, simplifying logic and improving accessibility.
2. **Cart Count Not Updating**:
   - **Issue**: Cart count in `Navbar` didn’t always reflect `localStorage` changes.
   - **Fix**: Ensured `CartContext` updates `cart` state on `localStorage` changes using `useEffect`.
3. **Recipe Details Missing User Recipes**:
   - **Issue**: `RecipeDetails` didn’t handle user-added recipes (stored in `localStorage`).
   - **Fix**: Updated `HttpKit.getRecipeDetails` to fetch user recipes by `idMeal` starting with `user_`.


---

## ⏰ Time Estimate

**Total Time Spent**: ~12 hours
- **Setup and Bug Fixes**: 3 hours (project setup, dependency updates, fixing `useCart`, mobile menu, cart count, `HttpKit`).
- **UI Components**: 2 hours (modernizing `Navbar`, `Footer`, `Hero` with Tailwind CSS, `react-icons`, animations).
- **Authentication**: 2 hours (`UserContext`, `/signup`, `/login` pages, `Navbar` updates).
- **Recipe Management**: 2 hours (`/add-recipe` multi-step form, `/profile`, recipe deletion, `HttpKit` updates).
- **Additional Features**: 2 hours (toast notifications, protected routes, accessibility).
- **Documentation**: 1 hour (updating `README.md`).

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (Pages Router)
- **Styling**: Tailwind CSS 3.4
- **State Management**: React Context (`CartContext`, `UserContext`)
- **Data Fetching**: Tanstack Query (`@tanstack/react-query`), Axios (`axios`)
- **API**: MealDB API
- **Icons**: `react-icons` (`IoCart`, `IoPerson`, `IoAddCircle`, etc.)
- **Notifications**: `react-toastify`
- **Fonts**: `Geist Sans`, `Geist Mono` (via `next/font/local`)
- **Storage**: `localStorage` for cart, user, and recipe data
- **Dependencies**: `axios`, `next`, `react`, `react-dom`

---

## 🚀 Getting Started

### Prerequisites
- Node.js (>=18.x)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/gaznafis007/repliq-meal
   cd tailus-feedus
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

### Project Structure
```
├── components/
│   ├── Navbar.js
│   ├── Footer.js
│   ├── Hero.js
│   ├── RecipesList.js
│   ├── RecipeCard.js
│   ├── SingleRecipe.js
│   ├── Modal.js
├── contexts/
│   ├── CartContext.js
│   ├── UserContext.js
├── pages/
│   ├── _app.js
│   ├── index.js
│   ├── all-recipes.js
│   ├── cart.js
│   ├── signup.js
│   ├── login.js
│   ├── add-recipe.js
│   ├── profile.js
│   ├── recipes/[id].js
├── common/helpers/
│   ├── HttpKit.js
├── public/
│   ├── fonts/
│   │   ├── GeistVF.woff
│   │   ├── GeistMonoVF.woff
│   ├── images/home/
│   │   ├── food.webp
├── styles/
│   ├── globals.css
```

---

## 🌐 Deployment

- **GitHub Repository**: [https://github.com/your-username/tailus-feedus](https://github.com/gaznafis007/repliq-meal)
- **Live Demo**: [https://tailus-feedus.vercel.app](https://repliq-meal.vercel.app/) (Update with your Vercel/Netlify link)

### Deployment Steps
1. Push to GitHub:
   ```bash
   git add .
   git commit -m "Final project submission"
   git push origin main
   ```
2. Deploy to Vercel:
   - Connect your GitHub repository to [Vercel](https://vercel.com).
   - Set environment variables (none required for this project).
   - Deploy and get the live URL.

---

## 📝 Submission Guidelines

- **GitHub Link**: [https://github.com/gaznafis007/repliq-meal](https://github.com/gaznafis007/repliq-meal)
- **Live Link**: [https://repliq-meal.vercel.app/](https://repliq-meal.vercel.app/)
- **Original Repository**: Cloned from [https://github.com/khalek-repliq/frontend-assessment](https://github.com/khalek-repliq/frontend-assessment), `.git` folder removed.
- **Hosting**: Deployed on Vercel for a live demo.

---

## 🎯 Future Enhancements

- **Backend Integration**: Replace `localStorage` with a backend (e.g., Firebase, Supabase) for user and recipe data.
- **Wishlist Feature**: Implement `WishlistContext` and `/wishlist` page for saving favorite recipes.
- **Recipe Editing**: Allow users to edit their recipes via a form similar to `/add-recipe`.
- **Image Upload**: Enable file uploads for recipe images using a CDN (e.g., Cloudinary).
- **Advanced Search**: Add filters for user recipes and dietary preferences.
- **SEO**: Implement `getServerSideProps` for dynamic pages and add Open Graph tags.

---

## 📧 Contact

For questions or feedback, reach out to [gazinafisrafi.gnr@gmail.com](mailto:gazinafisrafi.gnr@gmail.com) or open an issue on the [GitHub repository](https://github.com/gaznafis007/repliq-meal).

Happy cooking with Tailus Feedus! 🍴
