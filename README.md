# Gemu Sekai

> A lightweight web-based gaming platform featuring classic browser games without installation requirements.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Games](#games)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Development](#development)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

## 🎮 Overview

Gemu Sekai is a web-based gaming platform that allows users to play classic games directly in their browser. No downloads or installations required - just click and play!

**Live Demo:** [gemusekai.vercel.app](https://gemusekai.vercel.app)

## ✨ Features

- 🎯 **Instant Play** - No installation required
- 📱 **Responsive Design** - Works on desktop and mobile
- 🎨 **Modern UI** - Clean and intuitive interface
- 🔍 **Search Functionality** - Quickly find your favorite games
- 🎬 **Smooth Animations** - AOS (Animate On Scroll) integration
- 🎮 **Multiple Games** - Growing collection of classic games

## 🎲 Games

### Available Games

1. **Snake**
   - Classic snake game with increasing speed
   - Keyboard and touch controls
   - Score tracking
   - Path: `/play/snake/preview/`

2. **Tic Tac Toe**
   - 4x3 grid variant
   - Two-player mode
   - Win detection with multiple patterns
   - Path: `/play/tictactoe/preview/`

3. **Rock Paper Scissors**
   - Play against computer
   - Animated hand gestures
   - Win/Loss/Draw statistics
   - Path: `/play/roshambo/preview/`

4. **Ping Pong**
   - Bot AI and 2-player modes
   - Keyboard and mobile touch controls
   - Dynamic difficulty
   - Path: `/play/pingpong/preview/`

## 🛠 Tech Stack

### Frontend
- **HTML5** - Markup structure
- **CSS3** - Styling with custom properties
- **Vanilla JavaScript** - Game logic and interactions

### Libraries & Frameworks
- **AOS** (v2.3.4) - Scroll animations
- **Ionicons** (v7.1.0) - Icon system
- **Canvas API** - Game rendering (Snake, Ping Pong)

### Development Tools
- **live-server** (v1.2.2) - Local development server
- **npm** - Package management

## 📁 Project Structure

```
gemusekai/
├── index.html                 # Main landing page
├── style.css                  # Global styles
├── script.js                  # Main app logic
├── package.json              # Project dependencies
│
├── assets/                   # Game thumbnails and images
│   ├── snake.png
│   ├── tictactoe.png
│   ├── paperrockscissors.png
│   └── pingpong.png
│
├── favicon/                  # App icons and favicons
│   ├── favicon.ico
│   ├── favicon.svg
│   └── apple-touch-icon.png
│
└── play/                     # Games directory
    ├── config/               # Shared game configuration
    │   ├── index.js         # Game list configuration
    │   └── style.css        # Shared game styles
    │
    ├── snake/
    │   └── preview/
    │       ├── index.html   # Game preview page
    │       └── game/
    │           ├── index.html
    │           ├── script.js
    │           └── style.css
    │
    ├── tictactoe/
    │   └── preview/
    │       ├── index.html
    │       └── game/
    │           ├── index.html
    │           ├── scriptGame.js
    │           └── style.css
    │
    ├── roshambo/
    │   └── preview/
    │       ├── index.html
    │       └── game/
    │           ├── index.html
    │           ├── main.js
    │           ├── style.css
    │           └── assets/
    │
    └── pingpong/
        └── preview/
            ├── index.html
            └── game/
                ├── index.html
                ├── main.js
                └── style.css
```

## 🚀 Installation

### Prerequisites
- Node.js (v12 or higher)
- npm or yarn

### Steps

1. **Clone the repository**
```bash
git clone https://github.com/fridfn/gemusekai.git
cd gemusekai
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm start
# or
npx live-server
```

4. **Open in browser**
```
http://localhost:8080
```

## 💻 Development

### Adding a New Game

1. **Create game directory structure**
```bash
mkdir -p play/your-game/preview/game
```

2. **Add game files**
```
play/your-game/
├── preview/
│   ├── index.html
│   └── game/
│       ├── index.html
│       ├── main.js
│       └── style.css
```

3. **Register game in configuration**

Edit `play/config/index.js`:
```javascript
const listGames = [
  // ... existing games
  {
    name: "Your Game",
    link: "play/your-game/preview/index.html",
    image: "assets/your-game.png"
  }
];
```

4. **Add game thumbnail**
- Place image in `assets/` folder
- Recommended size: 400x300px

### CSS Variables

The project uses CSS custom properties for theming:

```css
:root {
  --secondary-color-text: rgb(105,105,105);
  --primary-color-text: #eaeaea;
  --primary-color-cards: #1f1f2e;
  --primary-color-backgroud: #000;
  --primary-main-color: #3a56ed;
}
```

## ⚙️ Configuration

### Game List Configuration

Located in `play/config/index.js`:

```javascript
const listGames = [
  {
    name: "Game Name",        // Display name
    link: "path/to/game",     // Relative path from root
    image: "assets/image.png" // Thumbnail image
  }
];
```

### Animation Configuration

AOS animations are initialized with:

```javascript
AOS.init({
  once: true,    // Animation runs only once
  offset: 90     // Offset trigger point
});
```

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m "Add: your feature description"
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/your-feature
   ```
5. **Open a Pull Request**

### Code Standards

- Use consistent indentation (2 spaces)
- Follow existing naming conventions
- Comment complex logic
- Test on multiple browsers
- Ensure mobile responsiveness

## 📝 License

This project is licensed under the ISC License.

```
Copyright (c) 2024 Gemu Sekai

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.
```

## 🔗 Links

- **Repository:** [github.com/fridfn/gemusekai](https://github.com/gemusekai/gemusekai)
- **Issues:** [github.com/fridfn/gemusekai/issues](https://github.com/gemusekai/gemusekai/issues)
- **Live Demo:** [gemusekai.vercel.app](https://gemusekai.vercel.app)

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Made with ❤️ by the Gemu Sekai Team**