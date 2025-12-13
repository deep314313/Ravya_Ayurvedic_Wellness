# RAVYA - Features Documentation

## 🎨 Design Features

### Visual Style (Poppi-Inspired)
- ✅ Playful, clean, minimal aesthetic
- ✅ Soft rounded shapes and corners
- ✅ Asymmetrical section layouts
- ✅ Floating decorative elements (fruits, herbs, squiggles)
- ✅ Bold, bubbly headlines using Fredoka display font
- ✅ Smooth scroll animations
- ✅ Product-specific color coding
- ✅ Gradient text accents
- ✅ Soft shadows and glows

### Color System
```css
Golden Turmeric: #F4B942 (warm yellow)
Jamun Purple: #6B2E7A (deep purple)  
Beetroot Red: #C73E4A (rich red)
Cream Background: #FBF8F3
White: #FFFFFF
Dark Text: #1A1A1A
Gray Text: #6B6B6B
```

### Typography
- **Display Font**: Fredoka (400, 500, 600, 700 weights)
  - Used for: Headlines, product names, CTAs
- **Body Font**: Inter (300, 400, 500, 600, 700 weights)
  - Used for: Body text, descriptions, UI elements

### Responsive Breakpoints
- Desktop: 1400px+ (max container width)
- Laptop: 968px - 1399px
- Tablet: 768px - 967px
- Mobile: < 768px

## 📱 Components & Sections

### 1. Sticky Navigation Bar
**Features:**
- Fixed position with backdrop blur on scroll
- Logo with brand tagline
- Horizontal menu items
- Primary CTA button
- Smooth scroll to sections
- Mobile hamburger menu
- Scroll-triggered shadow effect

**Interactions:**
- Hover effects on menu items
- Underline animation on hover
- Mobile menu slide-in
- Auto-hide menu on section click

### 2. Hero Section
**Features:**
- Two-column grid layout
- Animated headline with gradient text
- Dual CTA buttons (primary + secondary)
- 3D bottle display with product colors
- Floating ingredient circles with animations
- Decorative SVG squiggles
- Statistics bar with key metrics
- Badge with USP

**Animations:**
- Fade-in on mount
- Floating bottle animations (staggered)
- Ingredient circles orbit effect
- Hover scale on bottles
- Smooth entrance transitions

### 3. Trust Strip
**Features:**
- 5 benefit badges with icons
- Icon + title + description format
- Horizontal scrollable on mobile
- White background card

**Benefits Shown:**
1. Ayurvedic Formulations
2. No Added Sugar
3. Cold-Pressed
4. Clinically Inspired
5. Made in India

### 4. Story / Brand Section
**Features:**
- Split layout (image + content)
- Brand narrative paragraph
- "Our Ayurvedic Promise" checklist
- Lifestyle image placeholder
- Decorative colored circles
- Gradient background elements

**Promise Points:**
- Pure, ethically-sourced herbs
- Science-backed formulations
- Small-batch production
- No artificial additives
- FSSAI approved

### 5. Product Showcase
**Features:**
- 3-column grid (responsive)
- Product cards with:
  - Color-coded tags
  - 3D bottle mockups with glows
  - Product name & tagline
  - Key benefits list (3 items)
  - Hover-reveal ingredients
  - Price display
  - Individual CTA buttons
- Hover animations (lift + scale)
- Colored border reveal on hover

**Product Cards Include:**
- Tag chip (e.g., "Best for Immunity")
- Bottle visualization
- Benefits checklist
- Ingredients tags (on hover)
- Price per 250ml
- Buy Now CTA

### 6. How It Works
**Features:**
- 3-step horizontal process
- Numbered badges
- Large emoji icons
- Step descriptions
- Dotted arrow connectors (desktop)
- Medical disclaimer box

**Steps:**
1. Choose Your Focus
2. Drink Daily  
3. Feel the Difference

### 7. Ayurvedic Science / Education
**Features:**
- Split layout (illustration + content)
- Floating herb circles animation
- 3 educational bullet points
- Certification badges
- Point cards with hover effects

**Educational Points:**
- Food as Medicine
- Convenient Functionality
- Better Than Supplements

**Badges:**
- FSSAI Compliant
- Non-GMO
- No Artificial Colors

### 8. Reviews / Social Proof
**Features:**
- Customer review slider
- Large star ratings
- Customer quotes
- Avatar circles with initials
- Verified customer badges
- Social proof metrics
- Previous/Next navigation
- Dot pagination
- Auto-rotate option (optional)

**Metrics Shown:**
- 10,000+ Bottles Enjoyed
- 4.8 Average Rating
- 95% Would Recommend

### 9. FAQ Section
**Features:**
- Accordion-style expandable items
- Smooth expand/collapse animations
- Plus/minus toggle icons
- 8 common questions
- "Still have questions?" CTA

**Topics Covered:**
- Safety & daily consumption
- Sugar content
- Usage frequency
- Who can drink
- Shelf life
- Shipping
- Returns & refunds
- Certifications

### 10. Contact Form
**Features:**
- Split layout (info + form)
- Contact information cards
- Real-time form validation
- Success/error messaging
- API integration
- Loading states
- Sticky sidebar (desktop)

**Form Fields:**
- Full Name (required)
- Email (required)
- Phone (optional)
- Subject (required)
- Message (required)

**Contact Info:**
- Email address
- Phone number
- Physical address
- Business hours

### 11. Footer
**Features:**
- 5-column grid layout
- Newsletter signup form
- Quick links navigation
- Social media icons
- Privacy links
- Copyright notice
- Brand logo & tagline

**Sections:**
- Brand info + social
- Shop links
- Learn links
- Support links
- Newsletter signup

**Newsletter:**
- Email input with validation
- Submit button
- Success/error feedback
- API integration

## 🔧 Technical Features

### Frontend Architecture
- **Framework**: Next.js 14 (React 18)
- **Styling**: CSS Modules (scoped styles)
- **State Management**: React Hooks (useState, useEffect)
- **Animations**: Framer Motion + CSS animations
- **Icons**: React Icons + emoji
- **HTTP**: Axios
- **Scroll**: Intersection Observer API

### Backend Architecture
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Middleware**: CORS, Body Parser
- **Validation**: Built-in Mongoose validation

### API Endpoints

#### Products
```
GET    /api/products           # List all products
GET    /api/products/:slug     # Get single product
POST   /api/products           # Create product
```

#### Orders
```
POST   /api/orders             # Create order
GET    /api/orders/:id         # Get order
GET    /api/orders             # List orders
```

#### Reviews
```
GET    /api/reviews                    # List all reviews
GET    /api/reviews/product/:id        # Get product reviews
POST   /api/reviews                    # Submit review
```

#### Newsletter
```
POST   /api/newsletter/subscribe       # Subscribe
POST   /api/newsletter/unsubscribe     # Unsubscribe
```

#### Contact
```
POST   /api/contact                    # Submit contact form
GET    /api/contact                    # List submissions
```

### Database Models

#### Product Schema
```javascript
{
  name: String,
  slug: String (unique),
  tagline: String,
  description: String,
  price: Number,
  color: String (hex),
  imageUrl: String,
  benefits: [String],
  keyIngredients: [String],
  tag: String,
  inStock: Boolean,
  nutritionalInfo: Object,
  featured: Boolean
}
```

#### Order Schema
```javascript
{
  customerInfo: {
    name, email, phone, address
  },
  items: [{
    product: ObjectId,
    quantity: Number,
    price: Number
  }],
  totalAmount: Number,
  status: Enum,
  paymentStatus: Enum,
  orderDate: Date
}
```

#### Review Schema
```javascript
{
  product: ObjectId,
  customerName: String,
  rating: Number (1-5),
  comment: String,
  verified: Boolean,
  helpful: Number
}
```

#### Newsletter Schema
```javascript
{
  email: String (unique),
  subscribed: Boolean,
  subscribedAt: Date
}
```

#### Contact Schema
```javascript
{
  name: String,
  email: String,
  phone: String,
  subject: String,
  message: String,
  status: Enum
}
```

## 🎯 User Experience Features

### Navigation
- ✅ Smooth scroll to sections
- ✅ Sticky navigation bar
- ✅ Mobile-friendly menu
- ✅ Breadcrumb highlighting (optional)

### Interactions
- ✅ Hover effects on all clickable elements
- ✅ Focus states for accessibility
- ✅ Loading states for async actions
- ✅ Success/error feedback messages
- ✅ Form validation with error messages

### Performance
- ✅ Lazy loading for images
- ✅ Code splitting (Next.js automatic)
- ✅ CSS modules for optimized styles
- ✅ API response caching (optional)
- ✅ Optimized animations (GPU-accelerated)

### Accessibility
- ✅ Semantic HTML structure
- ✅ ARIA labels on interactive elements
- ✅ Keyboard navigation support
- ✅ Sufficient color contrast
- ✅ Alt text for images
- ✅ Focus indicators

### SEO
- ✅ Meta tags (title, description, OG)
- ✅ Semantic heading hierarchy
- ✅ Clean URL structure
- ✅ Sitemap ready
- ✅ Mobile-responsive
- ✅ Fast load times

## 📊 Conversion Optimization

### CTA Placement
- Hero section (2 CTAs)
- Product cards (individual CTAs)
- Sticky navigation (1 CTA)
- Footer (newsletter CTA)
- Contact section
- Multiple "Buy Now" touchpoints

### Trust Signals
- Customer reviews with ratings
- Social proof metrics
- Certification badges
- Verified customer tags
- FSSAI compliance
- Money-back guarantee (in copy)

### Urgency/Scarcity (Optional)
- Stock status indicators
- Limited-time offers placeholder
- "10,000+ bottles enjoyed" social proof

## 🚀 Future Enhancements

### Phase 2
- [ ] Shopping cart functionality
- [ ] User accounts & authentication
- [ ] Order history
- [ ] Wishlist feature
- [ ] Product search & filters

### Phase 3
- [ ] Payment gateway (Razorpay)
- [ ] Real-time order tracking
- [ ] Email notifications
- [ ] SMS notifications
- [ ] Subscription model

### Phase 4
- [ ] Admin dashboard
- [ ] Inventory management
- [ ] Analytics dashboard
- [ ] A/B testing platform
- [ ] Referral program

### Phase 5
- [ ] Mobile app (React Native)
- [ ] Loyalty program
- [ ] Personalized recommendations
- [ ] Chat support
- [ ] Blog/content section

---

**Total Components**: 11 major components
**Total Pages**: 1 landing page (expandable)
**Total API Endpoints**: 13 endpoints
**Total Database Models**: 5 models

