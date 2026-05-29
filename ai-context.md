# PNV Enterprises — AI Context File

> This file provides full context of the PNV Enterprises project for AI assistants. Share this file when requesting new features or debugging.

---

## Project Overview

**PNV Enterprises** Manufacturing & Supply of Industrial Chemicals, Polymers & Lab Solutions. It is a full-stack web application with:

- **Backend**: Node.js + Express + MongoDB (Mongoose)
- **Frontend**: React (Vite) SPA
- **Architecture**: Repository → Service → Controller pattern with Joi validation middleware

---

## Tech Stack

| Layer         | Technology                       |
| ------------- | -------------------------------- |
| Backend       | Node.js, Express.js              |
| Database      | MongoDB Atlas (Mongoose ODM)     |
| Frontend      | React 18, Vite, React Router     |
| Email         | Resend (transactional emails)    |
| Image CDN     | ImageKit.io                      |
| Auth          | JWT (user), static token (admin) |
| Styling       | Plain CSS (single index.css)     |
| Notifications | react-hot-toast                  |

---

## Project Structure

```
pnv/
├── backend/
│   ├── index.js                 # Express app entry point
│   ├── package.json
│   ├── seed.js                  # DB seeding script
│   ├── scripts/
│   │   └── seedCmsPages.js      # Seed Razorpay-required CMS policy pages
│   ├── .env                     # Environment variables
│   ├── config/
│   │   ├── db.js                # MongoDB connection
│   │   └── env.js               # Centralized env config
│   ├── controllers/             # Route handlers (thin, delegate to services)
│   │   ├── adminController.js
│   │   ├── authController.js
│   │   ├── cmsController.js
│   │   ├── orderController.js
│   │   ├── pincodeController.js
│   │   ├── productController.js
│   │   └── profileController.js
│   ├── middlewares/
│   │   ├── adminAuth.js         # Admin token check (x-admin-token header)
│   │   ├── auth.js              # JWT bearer token check
│   │   ├── errorHandler.js      # Global error handler
│   │   ├── rateLimiter.js       # OTP rate limiting (5/15min)
│   │   └── validate.js          # Joi schema validation
│   ├── models/                  # Mongoose schemas
│   │   ├── BankDetails.js
│   │   ├── CmsPage.js
│   │   ├── HomepageSection.js
│   │   ├── Order.js
│   │   ├── OtpRequest.js
│   │   ├── Pincode.js
│   │   ├── Product.js
│   │   └── User.js
│   ├── repositories/            # Data access layer (Mongoose queries)
│   │   ├── bankDetailsRepository.js
│   │   ├── cmsPageRepository.js
│   │   ├── homepageSectionRepository.js
│   │   ├── orderRepository.js
│   │   ├── otpRepository.js
│   │   ├── pincodeRepository.js
│   │   ├── productRepository.js
│   │   └── userRepository.js
│   ├── routes/                  # Express route definitions
│   │   ├── adminRoutes.js
│   │   ├── authRoutes.js
│   │   ├── cmsRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── pincodeRoutes.js
│   │   ├── productRoutes.js
│   │   └── profileRoutes.js
│   ├── services/                # Business logic layer
│   │   ├── authService.js
│   │   ├── bankDetailsService.js
│   │   ├── cmsService.js
│   │   ├── homepageSectionService.js
│   │   ├── orderService.js
│   │   ├── pincodeService.js
│   │   ├── productService.js
│   │   └── profileService.js
│   └── utils/
│       ├── ApiError.js          # Custom error class
│       ├── email.js             # Resend email sender
│       ├── emailTemplates.js    # HTML email templates
│       ├── generateOrderId.js   # Unique order ID generator
│       ├── imagekit.js          # ImageKit SDK setup
│       ├── otp.js               # OTP generation & hashing
│       └── slugify.js           # URL slug generator
│
└── frontend/web-app/
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── vercel.json              # SPA rewrite rules for Vercel deployment
    ├── .env                     # VITE_API_URL
    └── src/
        ├── App.jsx              # Router config
        ├── main.jsx             # Entry point
        ├── index.css            # All styles (single file)
        ├── api/                 # Axios API clients
        │   ├── admin.js
        │   ├── auth.js
        │   ├── client.js        # Axios instance with baseURL & auth interceptor
        │   ├── cms.js
        │   ├── orders.js
        │   ├── pincode.js
        │   ├── products.js
        │   └── profile.js
        ├── components/
        │   ├── layout/
        │   │   ├── Footer.jsx
        │   │   └── Header.jsx
        │   └── ui/
        │       ├── Loader.jsx
        │       ├── Logo.jsx     # SVG logo component
        │       ├── Pagination.jsx
        │       ├── ProductCard.jsx
        │       └── Skeleton.jsx
        ├── context/
        │   ├── AuthContext.jsx   # Auth state (token, user, login/logout)
        │   └── CartContext.jsx   # Cart state (localStorage persisted)
        ├── layouts/
        │   ├── AdminLayout.jsx  # Sidebar + main content
        │   └── MainLayout.jsx   # Header + Footer wrapper
        └── pages/
            ├── AuthPage.jsx
            ├── BankDetailsPage.jsx
            ├── CartPage.jsx
            ├── CheckoutPage.jsx
            ├── CmsPageView.jsx
            ├── HomePage.jsx
            ├── OrdersPage.jsx       # Dedicated order history page (detailed tiles)
            ├── ProductDetailPage.jsx
            ├── ProductsPage.jsx
            ├── ProfilePage.jsx
            └── admin/
                ├── AdminBankDetailsPage.jsx
                ├── AdminCmsPagesPage.jsx
                ├── AdminDashboard.jsx
                ├── AdminHomepageSectionsPage.jsx
                ├── AdminLoginPage.jsx
                ├── AdminOrdersPage.jsx
                ├── AdminPincodesPage.jsx
                └── AdminProductsPage.jsx
```

---

## Database Models

### User

| Field           | Type    | Notes                                  |
| --------------- | ------- | -------------------------------------- |
| email           | String  | Required, unique, lowercase            |
| businessName    | String  |                                        |
| gstNumber       | String  |                                        |
| contactPerson   | String  |                                        |
| phone           | String  |                                        |
| billingAddress  | Object  | { line1, line2, city, state, pincode } |
| shippingAddress | Object  | { line1, line2, city, state, pincode } |
| isActive        | Boolean | Default: true                          |

### Product

| Field         | Type     | Notes                            |
| ------------- | -------- | -------------------------------- |
| name          | String   | Required, text-indexed           |
| slug          | String   | Required, unique, auto-generated |
| description   | String   | Text-indexed                     |
| images        | [String] | URLs (max 5), first = main image |
| price         | Number   | Required, min: 0                 |
| discountPrice | Number   | Optional                         |
| unit          | String   | Default: "piece"                 |
| minOrderQty   | Number   | Default: 1                       |
| stock         | Number   | Default: 0                       |
| sku           | String   | Unique, sparse                   |
| category      | String   | Indexed                          |
| isActive      | Boolean  | Default: true                    |

### Order

| Field        | Type     | Notes                                                                |
| ------------ | -------- | -------------------------------------------------------------------- |
| orderId      | String   | Required, unique (auto-generated)                                    |
| userId       | ObjectId | Ref: User                                                            |
| userSnapshot | Object   | Snapshot of user data at order time                                  |
| items        | [Object] | { productId, name, slug, sku, price, discountPrice, quantity, unit } |
| totalAmount  | Number   | Required                                                             |
| status       | Enum     | pending → confirmed → processing → shipped → delivered / cancelled   |
| notes        | String   |                                                                      |

### OtpRequest

| Field     | Type    | Notes                              |
| --------- | ------- | ---------------------------------- |
| email     | String  | Required, lowercase                |
| otpHash   | String  | SHA256 hashed                      |
| expiresAt | Date    | TTL index (auto-deletes on expiry) |
| verified  | Boolean | Default: false                     |
| attempts  | Number  | Default: 0                         |

### Pincode

| Field             | Type    | Notes                     |
| ----------------- | ------- | ------------------------- |
| pincode           | String  | Required, unique, 6-digit |
| state             | String  | Required                  |
| city              | String  |                           |
| deliveryAvailable | Boolean | Default: true             |
| deliveryDays      | Number  | Default: 3                |

### CmsPage

| Field           | Type    | Notes                       |
| --------------- | ------- | --------------------------- |
| title           | String  | Required                    |
| slug            | String  | Required, unique, lowercase |
| content         | String  | HTML content                |
| metaTitle       | String  |                             |
| metaDescription | String  |                             |
| isPublished     | Boolean | Default: false              |

### HomepageSection

| Field    | Type    | Notes                                                |
| -------- | ------- | ---------------------------------------------------- |
| title    | String  | Required                                             |
| slug     | String  | Required, unique, lowercase                          |
| type     | Enum    | banner / featured / categories / text / cta / custom |
| content  | Mixed   | Flexible object                                      |
| order    | Number  | Sort order, indexed                                  |
| isActive | Boolean | Default: true                                        |

### BankDetails

| Field         | Type   | Notes    |
| ------------- | ------ | -------- |
| bankName      | String | Required |
| accountName   | String | Required |
| accountNumber | String | Required |
| ifscCode      | String | Required |
| branch        | String |          |
| upiId         | String |          |
| notes         | String |          |

---

## API Routes

### Public Routes (no auth)

| Method | Endpoint              | Description                               |
| ------ | --------------------- | ----------------------------------------- |
| POST   | /api/auth/send-otp    | Send OTP to email (rate-limited: 5/15min) |
| POST   | /api/auth/verify-otp  | Verify OTP, returns JWT                   |
| GET    | /api/products         | List products (paginated, filterable)     |
| GET    | /api/products/:slug   | Get single product by slug                |
| GET    | /api/pincode/:code    | Check delivery availability               |
| GET    | /api/cms/home         | Get homepage sections                     |
| GET    | /api/cms/page/:slug   | Get CMS page by slug                      |
| GET    | /api/cms/bank-details | Get bank details                          |

**Product list query params:** page, limit, sort (price_asc/price_desc/name_asc/name_desc), category, search, minPrice, maxPrice

### Authenticated Routes (JWT Bearer token)

| Method | Endpoint        | Description         |
| ------ | --------------- | ------------------- |
| GET    | /api/profile    | Get user profile    |
| POST   | /api/profile    | Update user profile |
| POST   | /api/orders     | Create new order    |
| GET    | /api/orders/my  | Get user's orders   |
| GET    | /api/orders/:id | Get specific order  |

### Admin Routes (x-admin-token header)

| Method | Endpoint                         | Description              |
| ------ | -------------------------------- | ------------------------ |
| POST   | /api/admin/login                 | Validate admin token     |
| POST   | /api/admin/upload-image          | Upload image to ImageKit |
| GET    | /api/admin/products              | List all products        |
| POST   | /api/admin/products              | Create product           |
| PUT    | /api/admin/products/:id          | Update product           |
| DELETE | /api/admin/products/:id          | Delete product           |
| GET    | /api/admin/orders                | List all orders          |
| PATCH  | /api/admin/orders/:id/status     | Update order status      |
| GET    | /api/admin/cms-pages             | List CMS pages           |
| POST   | /api/admin/cms-pages             | Create CMS page          |
| PUT    | /api/admin/cms-pages/:id         | Update CMS page          |
| DELETE | /api/admin/cms-pages/:id         | Delete CMS page          |
| GET    | /api/admin/homepage-sections     | List homepage sections   |
| POST   | /api/admin/homepage-sections     | Create homepage section  |
| PUT    | /api/admin/homepage-sections/:id | Update homepage section  |
| DELETE | /api/admin/homepage-sections/:id | Delete homepage section  |
| GET    | /api/admin/bank-details          | Get bank details         |
| PUT    | /api/admin/bank-details          | Upsert bank details      |
| GET    | /api/admin/pincodes              | List pincodes            |
| POST   | /api/admin/pincodes              | Create pincode           |
| PUT    | /api/admin/pincodes/:id          | Update pincode           |
| DELETE | /api/admin/pincodes/:id          | Delete pincode           |

---

## Frontend Routes

### Customer Pages (MainLayout — Header + Footer)

| Path             | Component         | Auth Required            |
| ---------------- | ----------------- | ------------------------ |
| /                | HomePage          | No                       |
| /products        | ProductsPage      | No                       |
| /products/:slug  | ProductDetailPage | No                       |
| /cart            | CartPage          | No                       |
| /checkout        | CheckoutPage      | Yes (redirects to /auth) |
| /auth            | AuthPage          | No                       |
| /profile         | ProfilePage       | Yes (redirects to /auth) |
| /orders          | OrdersPage        | Yes (redirects to /auth) |
| /bank-details    | BankDetailsPage   | No                       |
| /about-us        | CmsPageView       | No                       |
| /contact         | CmsPageView       | No                       |
| /privacy-policy  | CmsPageView       | No                       |
| /terms           | CmsPageView       | No                       |
| /refund-policy   | CmsPageView       | No                       |
| /shipping-policy | CmsPageView       | No                       |
| /:slug           | CmsPageView       | No                       |

### Admin Pages (AdminLayout — Sidebar + Content)

| Path                     | Component                 |
| ------------------------ | ------------------------- |
| /admin/login             | AdminLoginPage            |
| /admin/dashboard         | AdminDashboard            |
| /admin/products          | AdminProductsPage         |
| /admin/orders            | AdminOrdersPage           |
| /admin/cms-pages         | AdminCmsPagesPage         |
| /admin/homepage-sections | AdminHomepageSectionsPage |
| /admin/bank-details      | AdminBankDetailsPage      |
| /admin/pincodes          | AdminPincodesPage         |

---

## Authentication

### Customer Auth

- **Flow**: Email → OTP (6-digit, valid 10 min) → JWT token
- **Token storage**: `localStorage` key `uiop_token`
- **Header**: `Authorization: Bearer <token>`
- **JWT payload**: `{ userId, email }`
- **OTP**: SHA256 hashed in DB, auto-expires via MongoDB TTL index
- **Rate limit**: 5 OTP requests per 15 minutes per email

### Admin Auth

- **Flow**: Static token comparison
- **Token storage**: `localStorage` key `adminToken`
- **Header**: `x-admin-token: <token>`
- **Default token**: Set via `ADMIN_TOKEN` env var

---

## External Services

### Resend (Email)

- Transactional email service
- Templates: OTP, Order Confirmation (with "what happens next" steps), Admin Order Alert
- All emails include PNV Enterprises branded header and footer

### ImageKit (Image CDN)

- **ID**: sljqsazoe
- **URL Endpoint**: https://ik.imagekit.io/sljqsazoe
- **SDK**: `@imagekit/nodejs`
- **Usage**: Product image uploads via admin panel
- **Upload endpoint**: POST /api/admin/upload-image (multipart/form-data, field: "image")
- **Limits**: 5MB per file, images only, max 5 per product
- **Storage folder**: /products

---

## Environment Variables

### Backend (.env)

```
PORT=8080
MONGO_URI=<mongodb-connection-string>
CLIENT_URL=http://localhost:5173
RESEND_API_KEY=<resend-api-key>
JWT_SECRET=<jwt-secret>
ADMIN_EMAIL=<admin-notification-email>
FROM_EMAIL=onboarding@resend.dev
ADMIN_TOKEN=<admin-access-token>
IMAGEKIT_ID=sljqsazoe
IMAGEKIT_PUBLIC_KEY=<imagekit-public-key>
IMAGEKIT_PRIVATE_KEY=<imagekit-private-key>
```

### Frontend (.env)

```
VITE_API_URL=http://localhost:8080
```

---

## Key Patterns & Conventions

1. **Repository Pattern**: All DB queries go through repository files. Services call repositories, never Mongoose directly.
2. **Service Layer**: All business logic lives in services. Controllers are thin wrappers.
3. **Validation**: Joi schemas in `middlewares/validate.js`. Applied via `validate(schema)` middleware on routes.
4. **Error Handling**: Custom `ApiError` class. Global error handler catches all errors and formats responses.
5. **Slugs**: Auto-generated from names using `utils/slugify.js`.
6. **Order IDs**: Custom generated (not MongoDB ObjectId) via `utils/generateOrderId.js`.
7. **User Snapshot in Orders**: Orders store a snapshot of user data at order time for historical accuracy.
8. **Cart**: Client-side only, persisted in `localStorage` under key `uiop_cart`.
13. **Header Nav (signed in)**: Home, Products, Cart, My Orders, Profile, Logout. "My Orders" and "Profile" only show when logged in.
14. **Footer Policies**: Terms & Conditions, Privacy Policy, Shipping Policy, Cancellation & Refund Policy (all required by Razorpay).
9. **CSS**: Single `index.css` file, no CSS modules or preprocessors. Mobile-first responsive design.
10. **Admin Panel**: Separate layout with sidebar navigation. Token-based auth (not JWT).
11. **Product Images**: Stored as URL array in product document. First image is the main/display image.
12. **Logo**: SVG component at `components/ui/Logo.jsx`, used in Header, Footer, and email templates.

---

## Deployment

- **Frontend**: Deployed on Vercel. `vercel.json` in `frontend/web-app/` has SPA rewrite rules (`"source": "/(.*)"` → `"/index.html"`) so client-side routing works on page refresh.
- **Backend**: Deployed separately (provide your own host).

---

## Razorpay Compliance — Required CMS Pages

Razorpay verification requires these 5 policy pages to be publicly accessible on the website. All are served via `CmsPageView` component which fetches content from the CMS API by slug.

| Page                         | Route              | CMS Slug               | Footer Link |
| ---------------------------- | ------------------ | ---------------------- | ----------- |
| Privacy Policy               | /privacy-policy    | privacy-policy         | Yes         |
| Terms & Conditions           | /terms             | terms-and-conditions   | Yes         |
| Shipping Policy              | /shipping-policy   | shipping-policy        | Yes         |
| Cancellation & Refund Policy | /refund-policy     | refund-policy          | Yes         |
| Contact Us                   | /contact           | contact-us             | Yes         |

**Slug mapping** is in `CmsPageView.jsx` (`SLUG_MAP` object). When adding new CMS routes, add the route in `App.jsx`, the slug mapping in `CmsPageView.jsx`, and a footer link in `Footer.jsx`.

**Seed script**: `backend/scripts/seedCmsPages.js` creates all 5 pages with placeholder content if they don't exist. Run with `node scripts/seedCmsPages.js` from the `backend/` folder. Update placeholder text (`[Date]`, `[your email]`, etc.) from the admin panel at `/admin/cms-pages`.

---

## Running the Project

### Backend

```bash
cd backend
npm install
npm run dev                    # nodemon, port 8080
npm run seed                   # seed database
node scripts/seedCmsPages.js   # seed Razorpay-required policy pages
```

### Frontend

```bash
cd frontend/web-app
npm install
npm run dev      # Vite dev server, port 5173
```

---

## Order Flow

1. Customer browses products → adds to cart (client-side localStorage)
2. Customer logs in (if not already) → OTP email verification
3. Checkout → profile must have phone + shipping address
4. Order placed → stock validated, order created in DB
5. Emails sent: confirmation to customer + alert to admin
6. Customer sees order success page with "what happens next" steps
7. Admin confirms order via phone → updates status in admin panel
8. Status flow: pending → confirmed → processing → shipped → delivered

---

## Adding New Features — Checklist

1. **New Model**: Create in `models/`, add repository in `repositories/`
2. **New API**: Add service in `services/`, controller in `controllers/`, route in `routes/`, register in `index.js`
3. **Validation**: Add Joi schema in `middlewares/validate.js`, apply in route
4. **New Page**: Create in `pages/`, add route in `App.jsx`
5. **New API Client**: Add in `src/api/`, use Axios instance from `client.js`
6. **Admin Feature**: Add to admin controller + routes, create admin page, add sidebar link in `AdminLayout.jsx`
