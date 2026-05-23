# 🎵 Star Music - Web Audio Player

Star Music is a fully functional, responsive, and beautifully designed web-based music player built entirely with HTML, CSS, and Vanilla JavaScript. Developed as an internship project, this app showcases modern web development techniques including the HTML5 Audio API, CSS variables for theming, and dynamic state management in JavaScript.

## ✨ Key Features

### 🎧 Core Audio Playback
* **Fully Functional Player:** Play, pause, skip forward, and skip backward through a dynamically loaded playlist of 15 tracks.
* **Advanced Controls:** Implemented **Shuffle** (randomized next track) and **Loop** (continuous playback of the current track) functionalities.
* **Media Scrubber & Volume:** Real-time progress bar syncing, timeline scrubbing, and volume control using interactive range inputs.
* **Auto-Play:** Automatically transitions to the next song in the queue (or random song if shuffle is active) when the current track finishes.

### 🎨 Modern UI/UX Design
* **Dual Theme Support:** Seamlessly switch between Light and Dark modes with a single click (handled via CSS `:root` variables and JS class toggling).
* **App-Like Navigation:** Features a fixed bottom navigation bar to switch between Home, Search, Explore, and Library views without page reloads.
* **Sliding Player Modal:** A sleek, full-screen player interface that slides up from the bottom when a song is selected, mimicking native mobile music apps.
* **Interactive Sidebar:** A hidden sidebar menu with a background overlay for additional app options (Profile, History, Downloads).

### ⚡ Dynamic Interactions
* **Dynamic DOM Rendering:** The home page playlists (Quick Picks, Trending, Bollywood) are populated dynamically using JavaScript arrays and template literals.
* **Media Toggle:** Click the album art inside the player to seamlessly toggle to a lyrics view.
* **Micro-interactions:** Action buttons (Like, Save, Download) feature visual state changes (filling in icons, changing text) to provide immediate tactile feedback to the user.

## 🛠️ Technologies Used

* **HTML5:** Semantic structure and integration of the native `<audio>` element.
* **CSS3:** CSS Grid/Flexbox layouts, CSS custom properties (variables) for dark mode routing, smooth transitions, and keyframe animations.
* **Vanilla JavaScript (ES6):** State management (isPlaying, isShuffle, isLoop), HTML5 Audio API manipulation, event listeners, and dynamic UI updates.
* **Material Symbols:** Utilized Google's Material Icons for scalable, interactive UI elements.

## Note

This project is a frontend-only music player built using HTML, CSS, and JavaScript.
Features like Download, Like, and Watch Later are currently for UI/demo purposes only and are not functional due to the absence of backend integration.

Demo songs used in this project are from NCS (NoCopyrightSounds), so some sections may contain placeholder English tracks.

The main purpose of this project is to showcase the UI design, animations, responsiveness, and frontend functionality of a music player.
