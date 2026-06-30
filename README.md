# Will You Be My Girlfriend? 💕

A beautiful, romantic single-page web app to ask that special question.

## Features

- ✨ Beautiful animated interface with floating hearts
- 💕 Smooth transitions and animations
- 🎉 Confetti celebration when "Yes" is clicked
- 🏃 The "No" button playfully runs away (on both desktop and mobile)
- 📱 Fully responsive - works on all devices
- 🖼️ Photo gallery placeholders for your memories
- 💌 Customizable love message

## Customization

### Add Your Photos

1. Replace the circular image placeholder in `src/components/QuestionScreen.tsx`
2. Replace the photo gallery placeholders in `src/components/SuccessScreen.tsx`

### Customize the Message

Edit the romantic message in `src/components/SuccessScreen.tsx`:
- Find the `"From the moment I met you..."` text
- Replace with your personal message
- Update the signature at the bottom

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment to Vercel

### Option 1: Via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Deploy
vercel
```

### Option 2: Via GitHub

1. Push this project to a GitHub repository
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Vercel will auto-detect Vite and deploy

### Option 3: Drag & Drop

1. Run `npm run build`
2. Go to [vercel.com](https://vercel.com)
3. Drag the `dist` folder to deploy

## Project Structure

```
├── public/
│   └── heart.svg          # Favicon
├── src/
│   ├── components/
│   │   ├── FloatingHeartsBackground.tsx
│   │   ├── HeartIcon.tsx
│   │   ├── QuestionScreen.tsx
│   │   └── SuccessScreen.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vercel.json
└── vite.config.ts
```

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Framer Motion (animations)
- Canvas Confetti
- Vite (build tool)

## License

Made with ❤️ for that special someone.
