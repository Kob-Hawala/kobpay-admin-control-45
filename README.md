# 🚀 KOB HAWALA Admin Panel (Frontend)

A fully responsive, modern, and scalable admin dashboard built with **Next.js 15**, **Tailwind CSS**, **TypeScript**, and integrated with **Socket.IO**, **Fireblocks**, and other enterprise APIs.

This dashboard powers the **KOB HAWALA Crypto P2P & Broker System**, supporting real-time trading operations, P2P management, vault liquidity, KYC approvals, and messaging.

---

## 🧱 Tech Stack

| Tool | Description |
|------|-------------|
| [React.js](https://react.dev) | App Router architecture with server-side rendering |
| [TypeScript](https://www.typescriptlang.org/) | Static typing for maintainability |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first responsive styling |
| [React Query](https://tanstack.com/query) | Data fetching and state management |
| [Socket.IO Client](https://socket.io/docs/v4/client-api/) | Realtime notifications |
| [ShadCN/UI](https://ui.shadcn.com/) | Beautiful UI components |
| [React Hot Toast](https://react-hot-toast.com/) | Toast-based alerts |
| [Radix UI](https://www.radix-ui.com/) | Accessible components (menu, dialog) |
| [Zustand](https://zustand-demo.pmnd.rs/) | Optional lightweight state management |
| [Lucide Icons](https://lucide.dev/) | Icon system used in nav and table actions |

---

## 🔧 Features

### ✅ Admin Authentication
- Email + password login
- OTP verification (Hubtel/email)
- JWT session with role-based access
- Login alerts with IP, device, and location

### 📊 Dashboard Widgets
- Live vault balances (Hot/Cold via Fireblocks)
- User/KYC stats
- P2P volume metrics
- Revenue and fees generated
- Real-time crypto exchange rates
- News Feed from configurable API
- Toggle light/dark mode

### 🧍 User Management
- View and filter users
- Review individual user details
- Wallet activity (funds, deposits, withdrawals)
- KYC review with document viewer
- Staking activity

### 💸 P2P Trading System
- Manage buy/sell ads
- Review active/matched orders
- Escrow approval and cancellation
- Payment methods (CRUD)
- Appeals review thread
- Merchant applications panel

### 🔔 Notifications System
- Socket.IO alerts (deposits, flagged activity, failed txs)
- Unified toast position (top-right)
- `/admin/notifications` page to view and mark notifications as read

### 💬 Messaging System
- View user-to-user P2P conversations
- Monitor disputes and flagged chats
- Admin moderation interface

### 🔐 Vault & Liquidity Management
- Transfer between Hot & Cold vaults
- Configure refill thresholds
- Display balances per asset

### ⚙️ System Settings
- Manage fees (flat/percent)
- API credentials (Hubtel, CoinGecko, News API, etc.)
- Platform modes (live, maintenance)
- Admin profile settings & 2FA

---

## 📁 Project Structure

```
src/
├── app/                   # Next.js App Router
│   ├── admin/             # Admin routes & layouts
│   └── layout.tsx         # Root layout with dark/light theme
├── components/            # Reusable UI components
│   ├── sidebar/           # Collapsible sidebar
│   ├── notifications/     # Toast system
│   └── logs/              # Activity log viewer
├── hooks/                 # Custom hooks (theme, auth)
├── contexts/              # Global stores (e.g., SidebarContext)
├── lib/                   # API utils, Fireblocks, etc.
├── styles/                # Tailwind base + global CSS
├── types/                 # Global TypeScript types
├── utils/                 # Helpers (formatting, filters)
```

---

## 🛠 Installation & Setup

```bash
# 1. Clone the repo
git clone https://github.com/Kob-Hawala/kobpay-admin-control-45.git

# 2. Navigate into the project
cd kob-hawala-admin

# 3. Install dependencies
npm install

# 4. Set environment variables
cp .env.example .env.local
# Fill in the required values for Fireblocks, Hubtel, News API, etc.

# 5. Run dev server
npm run dev
```

---

## 🌐 Environment Variables (.env.local)

```env
NEXT_PUBLIC_FIREBLOCKS_KEY=your-key
NEXT_PUBLIC_HUBTEL_API_KEY=your-key
NEXT_PUBLIC_EXCHANGE_API=https://api.coingecko.com/api/v3/
NEXT_PUBLIC_SOCKET_URL=https://socket.kobhawala.com
NEXT_PUBLIC_CRYPTO_NEWS_API=https://newsapi.org/...
```

---

## 🔍 Testing

You can test most features using mock data or plug into the live backend.

```bash
npm run lint
npm run test
```

> e2e testing via Playwright or Cypress is recommended in production.

---

## 🧑‍💼 Admin Roles

| Role            | Capabilities |
|------------------|--------------|
| `SUPER_ADMIN`    | Full access: settings, users, vaults, fees, messages |
| `ADMIN_REVIEWER` | KYC approval, user monitoring, chat review |
| `MODERATOR`      | Appeal handling, dispute resolution |
| `SUPPORT`        | Read-only access to logs, tickets, messages |

---

## 🧪 Developer Utilities

- `SidebarContext` manages the collapsed state globally
- All toasts use `react-hot-toast` from a single `<Toaster />` in `layout.tsx`
- Icons adapt to theme using `dark:text-XXX` and `text-gray-700`
- Notification list and messaging UI are powered by Socket.IO client events

---

## 📦 Future Roadmap

- [ ] Admin push messages to users
- [ ] Real-time staking & earnings visualizations
- [ ] Downloadable user reports (PDF, CSV)
- [ ] Wallet reconciliation & audit mode
- [ ] Mobile admin PWA

---

## 🤝 Contributing

```bash
# Fork this repo
# Create your feature branch: git checkout -b feature/new-module
# Commit your changes: git commit -m 'feat: add new feature'
# Push to the branch: git push origin feature/new-module
# Submit a PR 🚀
```

---

## 📃 License

This project is proprietary software under the KOB HAWALA Ecosystem.  
All rights reserved © {{year}}.

---

## ✉️ Support

For questions, feature requests, or bug reports:  
📧 hello@kobhawala.com
