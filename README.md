# NexOps AI — Website + Presentation

A modern AI startup website with integrated presentation mode, built with Next.js 14, Tailwind CSS, and Framer Motion.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
nexops-ai/
├── app/
│   ├── globals.css          # Global styles, fonts, animations
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Main page (toggles landing/presentation)
├── components/
│   ├── LandingPage.tsx      # Landing page shell
│   ├── Navbar.tsx           # Sticky navigation bar
│   ├── HeroSection.tsx      # Hero with QR code
│   ├── AboutSection.tsx     # About + mission
│   ├── TeamSection.tsx      # 4 team member cards
│   ├── Footer.tsx           # Footer with CTA
│   ├── PresentationMode.tsx # Full-screen slide presentation
│   └── QRCodePlaceholder.tsx # QR code SVG placeholder
├── public/
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── next.config.js
```

---

## ✏️ Customization

### Update Team Names
Edit `components/TeamSection.tsx` — change the `name` field in the `teamMembers` array:

```tsx
const teamMembers = [
  { name: 'Your Name Here', role: 'AI Marketing Specialist', ... },
  ...
]
```

### Add Real QR Code
Replace `components/QRCodePlaceholder.tsx` with a real QR code library:

```bash
npm install qrcode.react
```

Then in `HeroSection.tsx`:
```tsx
import QRCode from 'qrcode.react'
<QRCode value="https://nexops-ai.vercel.app" size={100} />
```

---

## 🌐 Deploy to Vercel

### Option 1: Vercel CLI (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow prompts:
# - Link to existing project or create new
# - Framework: Next.js (auto-detected)
# - Deploy!
```

### Option 2: GitHub + Vercel Dashboard

1. Push this project to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: NexOps AI website"
   git remote add origin https://github.com/YOUR_USERNAME/nexops-ai.git
   git push -u origin main
   ```

2. Go to [vercel.com](https://vercel.com)
3. Click **"New Project"**
4. Import your GitHub repository
5. Vercel auto-detects Next.js — click **"Deploy"**
6. Your site is live at `https://nexops-ai.vercel.app` 🎉

### Option 3: One-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

---

## ⚙️ Environment

No environment variables required. Works out of the box.

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Primary Blue | `#2563EB` |
| Dark Blue | `#1D4ED8` |
| Background | `#FFFFFF` |
| Dark bg | `#020617` |
| Display Font | Syne |
| Body Font | DM Sans |
| Mono Font | DM Mono |

---

## 📋 Features

- ✅ Real startup website aesthetic
- ✅ Smooth animated transitions (Framer Motion)
- ✅ Full-screen presentation mode
- ✅ Keyboard navigation (← → arrows, Esc to exit)
- ✅ Progress bar in slides
- ✅ Responsive design
- ✅ SEO-optimized metadata
- ✅ QR code placeholder
- ✅ Sticky navbar with scroll effect
- ✅ Team member cards with hover animations
- ✅ Statistical callouts per slide
