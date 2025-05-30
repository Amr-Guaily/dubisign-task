# 🛒 ShopHub - Shopping Landing Page

A fully functional shopping landing page built with Next.js and TypeScript.

## 📋 Task Requirements

### ✅ Core Features Implemented

1. **Landing Page with Product Display**

   - Real product images from Unsplash
   - Responsive grid layout (1-4 columns based on screen size)

2. **Product Structure**

   - Each product includes: name, price, category, and high-quality images
   - 12 sample products across 4 categories (Electronics, Sports, Home, Fashion)

3. **Advanced Cart Functionality**

   - Add products to cart with quantity support
   - Update quantities with +/- buttons
   - Remove individual items from cart
   - Real-time total price calculation
   - Sliding cart sidebar
   - Cart persistence using localStorage

4. **Search & Filter System**

   - Real-time search by product name (debounced for performance)
   - Category filtering with dropdown selection
   - Price price range filtering
   - URL-based filtering for shareable links
   - Server-side filtering with API integration

5. **Enhanced User Experience**

   - Active filter display with removable chips
   - "Reset All Filters" functionality
   - Loading states and smooth transitions
   - Mobile-first responsive design

6. **Technical Excellence**
   - Server-side rendering (SSR) with Next.js App Router
   - TypeScript for type safety
   - Context API for centralized filter state management
   - localStorage persistence for cart data
   - RESTful API routes for data fetching

## 🛠️ Tech Stack

### Frontend Framework

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **React 18** - UI library with hooks and context

### Styling & UI

- **Tailwind CSS** - Utility-first CSS framework

### State Management

- **React Context API** - Global state management for filters
- **React Hooks** - useState, useEffect, useContext, useTransition
- **localStorage** - Client-side cart persistence

### Data & API

- **Next.js API Routes** - Server-side API endpoints
- **Static JSON Data** - Mock product database

## 🚀 Installation & Setup

### Prerequisites

Make sure you have the following installed on your machine:

- **Node.js** (version 18.0 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd shopping-landing-page
```

### Step 2: Install Dependencies

Using npm:

```bash
npm install
```

Using yarn:

```bash
yarn install
```

### Step 3: Environment Setup (Optional)

Create a `.env.local` file in the root directory if you need custom environment variables:

```env
# Optional: Custom base URL for production
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### Step 4: Run the Development Server

Using npm:

```bash
npm run dev
```

Using yarn:

```bash
yarn dev
```

## 🎯 Key Features Explained

### 1. Server-Side Rendering (SSR)

- Initial page load fetches data on the server
- SEO-friendly with proper meta tags
- Fast initial page load times

### 2. Advanced Filtering System

- **Context-based state management** for filters
- **URL synchronization** for shareable filter states
- **Debounced search** to optimize API calls
- **Server-side filtering** for better performance

### 3. Cart Management

- **Persistent storage** using localStorage
- **Real-time updates** across all components
- **Quantity management** with validation
- **Total calculation** with proper formatting

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler
```

## 🌐 API Endpoints

### GET /api/products

Fetch filtered products based on query parameters.

**Query Parameters:**

- `search` - Filter by product name
- `category` - Filter by product category
- `minPrice` - Minimum price filter
- `maxPrice` - Maximum price filter

**Example:**

```
GET /api/products?search=headphones&category=Electronics&minPrice=50&maxPrice=200
```

## 🚀 Deployment

### Vercel

**Live Demo:**  
[https://dubisign-task-two.vercel.app/](https://dubisign-task-two.vercel.app/)

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**

```

```
