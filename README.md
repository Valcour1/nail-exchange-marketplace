# 🔨 Nail Exchange Marketplace

**Professional marketplace for trading spare building nails with real-time order book and trading features**

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue)](https://same-p9s4yivl1eh-latest.netlify.app)
[![Next.js](https://img.shields.io/badge/Next.js-15.3.2-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC)](https://tailwindcss.com/)

## 🏗️ Project Overview

Nail Exchange is a specialized B2B marketplace designed for the construction industry, enabling professionals to trade surplus building nails efficiently. The platform features real-time order book trading, comprehensive user authentication, and advanced filtering capabilities.

## ✨ Key Features

- **📊 Real-time Order Book Trading** - Live buy/sell orders with dynamic pricing
- **🔐 Secure User Authentication** - Professional account management system  
- **🏷️ Product Categorization** - Browse nails by type, size, material, and finish
- **📱 Individual Trading Pages** - Dedicated trading interface for each nail type
- **🔍 Advanced Filtering** - Filter by brand, size, coating, head type, and more
- **📈 Order History** - Complete transaction tracking and history
- **💰 Market Analytics** - Price tracking and market insights
- **📋 Professional UI** - Clean, industry-focused design

## 🛠️ Tech Stack

- **Framework:** [Next.js 15.3.2](https://nextjs.org/) with App Router
- **Language:** [TypeScript 5.8.3](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 3.4.17](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/) with Radix UI primitives
- **State Management:** [Zustand 5.0.6](https://zustand-demo.pmnd.rs/)
- **Forms:** [React Hook Form 7.60.0](https://react-hook-form.com/) with Zod validation
- **Icons:** [Lucide React](https://lucide.dev/)
- **Package Manager:** [Bun](https://bun.sh/)
- **Deployment:** [Netlify](https://netlify.app/)

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- Git

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/Valcour1/nail-exchange-marketplace.git
   cd nail-exchange-marketplace
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   bun install
   # or
   npm install
   \`\`\`

3. **Start the development server**
   \`\`\`bash
   bun run dev
   # or
   npm run dev
   \`\`\`

4. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- \`bun run dev\` - Start development server with Turbopack
- \`bun run build\` - Build for production
- \`bun run start\` - Start production server
- \`bun run lint\` - Run TypeScript checks and ESLint
- \`bun run format\` - Format code with Biome

## 📱 Application Structure

\`\`\`
src/
 app/                    # Next.js App Router pages
   ├── login/             # Authentication page
   ├── trade/[nailType]/  # Dynamic trading pages
   ├── layout.tsx         # Root layout
   └── page.tsx           # Homepage
 components/            # React components
   ├── ui/                # shadcn/ui components
   ├── OrderBook.tsx      # Trading order book
   ├── OrderForm.tsx      # Buy/sell order forms
   ├── ProductGallery.tsx # Product listing grid
   ├── FilterSidebar.tsx  # Product filtering
   └── UserAuth.tsx       # Authentication forms
 lib/                   # Utility functions
 store/                 # Zustand state management
 types/                 # TypeScript type definitions
\`\`\`

## 🔧 Configuration

The project includes several configuration files:

- \`tailwind.config.ts\` - Tailwind CSS configuration with custom theme
- \`components.json\` - shadcn/ui component configuration
- \`biome.json\` - Code formatting and linting rules
- \`next.config.js\` - Next.js configuration
- \`netlify.toml\` - Netlify deployment settings

## 🎨 Design System

The application uses a consistent design system built on:

- **Color Palette:** Professional blue/gray theme suitable for B2B applications
- **Typography:** Geist font family for modern, readable text
- **Components:** Fully accessible shadcn/ui components
- **Responsive Design:** Mobile-first approach with Tailwind CSS
- **Custom Icons:** Industry-specific SVG icons for nail types and tools

## 📦 Key Components

### OrderBook Component
Real-time display of buy and sell orders with price aggregation and market depth visualization.

### ProductGallery Component  
Grid-based product listing with filtering, search, and category navigation.

### OrderForm Component
Professional trading interface with order validation, price calculation, and submission handling.

### FilterSidebar Component
Advanced filtering system supporting multiple criteria including brand, size, material, and coating options.

## 🌐 Live Demo

Visit the live application: **[https://same-p9s4yivl1eh-latest.netlify.app](https://same-p9s4yivl1eh-latest.netlify.app)**

## 📄 License

This project is private and proprietary. All rights reserved.

## 🤝 Contributing

This is a professional marketplace application. For contribution guidelines and development standards, please contact the project maintainers.

---

**Built with ❤️ for the construction industry**
EOF  
cd /home/project && cd nail-marketplace && cat > README.md << 'EOF'
# 🔨 Nail Exchange Marketplace

**Professional marketplace for trading spare building nails with real-time order book and trading features**

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue)](https://same-p9s4yivl1eh-latest.netlify.app)
[![Next.js](https://img.shields.io/badge/Next.js-15.3.2-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC)](https://tailwindcss.com/)

## 🏗️ Project Overview

Nail Exchange is a specialized B2B marketplace designed for the construction industry, enabling professionals to trade surplus building nails efficiently. The platform features real-time order book trading, comprehensive user authentication, and advanced filtering capabilities.

## ✨ Key Features

- **📊 Real-time Order Book Trading** - Live buy/sell orders with dynamic pricing
- **🔐 Secure User Authentication** - Professional account management system  
- **🏷️ Product Categorization** - Browse nails by type, size, material, and finish
- **📱 Individual Trading Pages** - Dedicated trading interface for each nail type
- **🔍 Advanced Filtering** - Filter by brand, size, coating, head type, and more
- **📈 Order History** - Complete transaction tracking and history
- **💰 Market Analytics** - Price tracking and market insights
- **📋 Professional UI** - Clean, industry-focused design

## 🛠️ Tech Stack

- **Framework:** [Next.js 15.3.2](https://nextjs.org/) with App Router
- **Language:** [TypeScript 5.8.3](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 3.4.17](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/) with Radix UI primitives
- **State Management:** [Zustand 5.0.6](https://zustand-demo.pmnd.rs/)
- **Forms:** [React Hook Form 7.60.0](https://react-hook-form.com/) with Zod validation
- **Icons:** [Lucide React](https://lucide.dev/)
- **Package Manager:** [Bun](https://bun.sh/)
- **Deployment:** [Netlify](https://netlify.app/)

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- Git

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/Valcour1/nail-exchange-marketplace.git
   cd nail-exchange-marketplace
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   bun install
   # or
   npm install
   \`\`\`

3. **Start the development server**
   \`\`\`bash
   bun run dev
   # or
   npm run dev
   \`\`\`

4. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- \`bun run dev\` - Start development server with Turbopack
- \`bun run build\` - Build for production
- \`bun run start\` - Start production server
- \`bun run lint\` - Run TypeScript checks and ESLint
- \`bun run format\` - Format code with Biome

## 📱 Application Structure

\`\`\`
src/
 app/                    # Next.js App Router pages
   ├── login/             # Authentication page
   ├── trade/[nailType]/  # Dynamic trading pages
   ├── layout.tsx         # Root layout
   └── page.tsx           # Homepage
 components/            # React components
   ├── ui/                # shadcn/ui components
   ├── OrderBook.tsx      # Trading order book
   ├── OrderForm.tsx      # Buy/sell order forms
   ├── ProductGallery.tsx # Product listing grid
   ├── FilterSidebar.tsx  # Product filtering
   └── UserAuth.tsx       # Authentication forms
 lib/                   # Utility functions
 store/                 # Zustand state management
 types/                 # TypeScript type definitions
\`\`\`

## 🔧 Configuration

The project includes several configuration files:

- \`tailwind.config.ts\` - Tailwind CSS configuration with custom theme
- \`components.json\` - shadcn/ui component configuration
- \`biome.json\` - Code formatting and linting rules
- \`next.config.js\` - Next.js configuration
- \`netlify.toml\` - Netlify deployment settings

## 🎨 Design System

The application uses a consistent design system built on:

- **Color Palette:** Professional blue/gray theme suitable for B2B applications
- **Typography:** Geist font family for modern, readable text
- **Components:** Fully accessible shadcn/ui components
- **Responsive Design:** Mobile-first approach with Tailwind CSS
- **Custom Icons:** Industry-specific SVG icons for nail types and tools

## 📦 Key Components

### OrderBook Component
Real-time display of buy and sell orders with price aggregation and market depth visualization.

### ProductGallery Component  
Grid-based product listing with filtering, search, and category navigation.

### OrderForm Component
Professional trading interface with order validation, price calculation, and submission handling.

### FilterSidebar Component
Advanced filtering system supporting multiple criteria including brand, size, material, and coating options.

## 🌐 Live Demo

Visit the live application: **[https://same-p9s4yivl1eh-latest.netlify.app](https://same-p9s4yivl1eh-latest.netlify.app)**

## 📄 License

This project is private and proprietary. All rights reserved.

## 🤝 Contributing

This is a professional marketplace application. For contribution guidelines and development standards, please contact the project maintainers.

---

**Built with ❤️ for the construction industry**
