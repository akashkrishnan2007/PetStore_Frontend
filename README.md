# 🐾 PetZone — Pet Store Management System (Frontend)

A fully responsive React.js frontend for the PetZone Pet Store Management System, connected to a live Node.js + Express + MongoDB backend.

🌐 **Live Demo:** [https://petstore-frontend.vercel.app](https://petstore-frontend.vercel.app)  
🔗 **Backend API:** [https://petstore-backend-bx6c.onrender.com](https://petstore-backend-bx6c.onrender.com)  
📦 **GitHub:** [https://github.com/akashkrishnan2007/PetStore_Frontend](https://github.com/akashkrishnan2007/PetStore_Frontend)

---

## 🚀 Tech Stack

| Technology | Purpose |
|---|---|
| React.js 19 + Vite 8 | Frontend framework + build tool |
| React Router DOM v7 | Client-side routing |
| Axios | HTTP API calls to backend |
| Context API | Global auth state + cart state |
| Bootstrap 5 | Responsive layout & components |
| Custom CSS | Design system (style.css + admin.css) |

---

## 📁 Project Structure

```
src/
├── Asset/
│   ├── CSS/
│   │   ├── style.css          # Main design system (colors, components)
│   │   └── admin.css          # Admin panel styles
│   └── Images/                # Pet images, product images
│
├── Components/
│   ├── Navbar.jsx             # Sticky navbar with mobile hamburger
│   ├── Footer.jsx             # Site footer with links
│   ├── AdminSidebar.jsx       # Admin panel sidebar with badges
│   ├── AdminRoute.jsx         # Admin protected route wrapper
│   ├── ProtectedRoute.jsx     # User protected route wrapper
│   ├── ProductCard.jsx        # Reusable product card
│   ├── TeamCard.jsx           # About page team member card
│   ├── BackToTop.jsx          # Floating back-to-top button
│   ├── ScrollToTop.jsx        # Auto scroll to top on route change
│   ├── GlobalToast.jsx        # Global toast notification
│   ├── Spinner.jsx            # Loading spinner for API calls
│   └── useFadeUp.js           # Custom hook for scroll animations
│
├── Context/
│   └── AuthContext.jsx        # Auth state, cart state, toast state
│
├── Pages/
│   ├── Home.jsx               # Landing page with hero, products, testimonials
│   ├── About.jsx              # About page with team, mission, stats
│   ├── Contact.jsx            # Contact form → POST /api/contact
│   ├── Adoption.jsx           # Pet adoption listing + modal form
│   ├── Seller.jsx             # Seller registration form
│   ├── Login.jsx              # User login → POST /api/users/login
│   ├── Signup.jsx             # User register → POST /api/users/register
│   ├── Profile.jsx            # User profile → GET /api/users/profile
│   ├── CartPage.jsx           # Shopping cart with qty management
│   ├── ForgotPassword.jsx     # Forgot password page
│   ├── FAQ.jsx                # Accordion FAQ page
│   ├── PrivacyPolicy.jsx      # Privacy policy page
│   ├── TermsConditions.jsx    # Terms & conditions page
│   ├── NotFound.jsx           # 404 page
│   ├── AdminLogin.jsx         # Admin login → POST /api/admin/login
│   ├── Dashboard.jsx          # Admin dashboard → GET /api/admin/dashboard
│   ├── AdminUsers.jsx         # View all registered users
│   ├── AdminSellers.jsx       # View all registered sellers
│   ├── AdminAdoptions.jsx     # Approve/reject adoption requests
│   ├── AdminMessages.jsx      # View/delete contact messages
│   └── AdminReports.jsx       # Reports & analytics page
│
├── Routers/
│   └── AppRouter.jsx          # All route definitions
│
└── services/
 |
    └── api.js                 # Axios instance + all API functions
```

---

## ✨ Features

### 👤 User Features
- **Register** with firstname, lastname, email, 10-digit phone, password
- **Login** with JWT token authentication
- **Profile page** — view account details and adoption history
- **Shopping Cart** — add/remove/update quantity, persisted in localStorage
- **Pet Adoption** — browse 9 pets, filter by type/age, submit adoption request
- **Contact Form** — send message directly to backend database
- **Forgot Password** page

### 🏪 Seller Features
- **Seller Registration** — register with shop name, category, address, password
- **Seller Login** — authenticate as seller

### 🔧 Admin Features
- **Secure Admin Login** — JWT protected
- **Dashboard** — live stats: total users, sellers, adoptions, messages
- **Charts** — monthly overview (line chart) + adoption status (donut chart)
- **Manage Users** — view all registered users
- **Manage Sellers** — view all registered sellers
- **Manage Adoptions** — approve ✅ / reject ❌ adoption requests
- **Manage Messages** — view and delete contact messages
- **Reports Page** — analytics and summaries

### 🎨 UI/UX Features
- Fully **responsive** — mobile, tablet, desktop
- **Sticky Navbar** with mobile hamburger menu (React state)
- **Scroll animations** via custom `useFadeUp` hook
- **Global Toast notifications** for success/error
- **Loading Spinner** on all API form submissions
- **Back to Top** floating button
- **Auto scroll to top** on every route change
- **404 Not Found** page

---

## 🔌 API Integration

All API calls are in `src/services/api.js` connected to:
```
https://petstore-backend-bx6c.onrender.com/api
```

| Method | Endpoint | Page Used |
|---|---|---|
| POST | `/users/register` | Signup.jsx |
| POST | `/users/login` | Login.jsx |
| GET | `/users/profile` | Profile.jsx |
| POST | `/sellers/register` | Seller.jsx |
| POST | `/sellers/login` | SellerLogin |
| GET | `/sellers` | AdminSellers.jsx |
| POST | `/contact` | Contact.jsx |
| GET | `/contact` | AdminMessages.jsx |
| DELETE | `/contact/:id` | AdminMessages.jsx |
| POST | `/adoption` | Adoption.jsx |
| GET | `/adoption` | AdminAdoptions.jsx |
| PUT | `/adoption/:id/approve` | AdminAdoptions.jsx |
| PUT | `/adoption/:id/reject` | AdminAdoptions.jsx |
| POST | `/admin/login` | AdminLogin.jsx |
| GET | `/admin/dashboard` | Dashboard.jsx |

### Auth
JWT token stored in `localStorage` as `petzoneToken`.  
Automatically attached to all requests via Axios interceptor.

---

## 🪝 React Hooks Used

| Hook | Where Used | Purpose |
|---|---|---|
| `useState` | All pages | Form state, loading, error, success |
| `useEffect` | Profile, Dashboard, Adoptions | Fetch data on mount |
| `useRef` | Dashboard, About | Canvas charts, scroll refs |
| `useContext` | Navbar, Profile, Cart | Auth state, cart, toast |
| `useNavigate` | Login, Signup, Admin | Redirect after actions |
| `useLocation` | Navbar, ScrollToTop | Active link, route change |
| Custom `useFadeUp` | All pages | Scroll reveal animations |

---

## ⚙️ Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
# Clone the repo
git clone https://github.com/akashkrishnan2007/PetStore_Frontend.git
cd PetStore_Frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### Build for Production

```bash
npm run build
```

---

## 🌍 Deployment

Deployed on **Vercel** with `vercel.json` for React Router support:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

---

## 👨‍💻 Author

**Akash K**  
Full Stack Developer — PetZone Project  
SECE 2024–2028 Batch
