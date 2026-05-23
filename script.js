// --- 1. THEME TOGGLE ---
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
});

// --- 2. SIDEBAR MENU ---
const menuBtn = document.getElementById('menu-btn');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const closeMenu = document.getElementById('close-menu');

function toggleMenu() {
    sidebar.classList.toggle('active');
    overlay.style.display = sidebar.classList.contains('active') ? 'block' : 'none';
}
menuBtn.addEventListener('click', toggleMenu);
closeMenu.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);

// --- 3. BOTTOM NAVIGATION ---
const navBtns = document.querySelectorAll('.nav-btn');
const pages = document.querySelectorAll('.page');

navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        navBtns.forEach(b => b.classList.remove('active'));
        pages.forEach(p => p.classList.remove('active'));
        
        btn.classList.add('active');
        const targetId = btn.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active');

        if (targetId === 'search') document.getElementById('searchInput').focus();
    });
});

// --- 4. PLAYLIST DATA (15 Songs, Real Audio Links) ---
const playlist = [
    // Quick Picks (0-4)
    { title: "Neon Nights", artist: "Synth Bros", cover: "https://picsum.photos/seed/s1/300/300", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
    { title: "Ocean Breeze", artist: "Chill Wave", cover: "https://picsum.photos/seed/s2/300/300", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
    { title: "Urban Pulse", artist: "Metro Beats", cover: "https://picsum.photos/seed/s3/300/300", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
    { title: "Starlight", artist: "Cosmic Array", cover: "https://picsum.photos/seed/s4/300/300", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
    { title: "Dawn Chorus", artist: "Nature Sounds", cover: "https://picsum.photos/seed/s5/300/300", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" },
    // Trending Now (5-9)
    { title: "Firestarter", artist: "DJ Ignite", cover: "https://picsum.photos/seed/s6/300/300", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3" },
    { title: "Bass Drop", artist: "Heavy Hitter", cover: "https://picsum.photos/seed/s7/300/300", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3" },
    { title: "Summer Anthem", artist: "The Boys", cover: "https://picsum.photos/seed/s8/300/300", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" },
    { title: "Electric Feel", artist: "Volt", cover: "https://picsum.photos/seed/s9/300/300", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3" },
    { title: "Midnight Drive", artist: "Night Owl", cover: "https://picsum.photos/seed/s10/300/300", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3" },
    // Desi/Bollywood (10-14)
    { title: "Desi Swag", artist: "Punjab Pro", cover: "https://picsum.photos/seed/s11/300/300", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3" },
    { title: "Mumbai Magic", artist: "B-Town", cover: "https://picsum.photos/seed/s12/300/300", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3" },
    { title: "Retro Vibes", artist: "Classic Kumar", cover: "https://picsum.photos/seed/s13/300/300", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3" },
    { title: "Sufi Soul", artist: "Qawwali Kings", cover: "https://picsum.photos/seed/s14/300/300", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3" },
    { title: "Dance Floor", artist: "DJ Raj", cover: "https://picsum.photos/seed/s15/300/300", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3" }
];

// Populate DOM with songs
function renderSongs(containerId, startIndex, endIndex) {
    const container = document.getElementById(containerId);
    for (let i = startIndex; i <= endIndex; i++) {
        let song = playlist[i];
        container.innerHTML += `
            <div class="card" onclick="playSong(${i})">
                <img src="${song.cover}" alt="Cover">
                <p>${song.title}</p>
            </div>
        `;
    }
}
renderSongs('quick-picks-container', 0, 4);
renderSongs('trending-container', 5, 9);
renderSongs('bollywood-container', 10, 14);

// --- 5. PLAYER LOGIC & CONTROLS ---
const audioPlayer = document.getElementById('audio-player');
const playerModal = document.getElementById('player-modal');
const playPauseBtn = document.getElementById('play-pause');
const coverArt = document.getElementById('cover-art');
const progressBar = document.getElementById('progress-bar');
const currentTimeTxt = document.getElementById('current-time');
const durationTxt = document.getElementById('duration');

let currentIndex = 0;
let isPlaying = false;
let isShuffle = false;
let isLoop = false;

function playSong(index) {
    currentIndex = index;
    const song = playlist[currentIndex];
    
    document.querySelector('.song-title').innerText = song.title;
    document.querySelector('.song-artist').innerText = song.artist;
    coverArt.src = song.cover;
    
    audioPlayer.src = song.src;
    audioPlayer.play();
    isPlaying = true;
    playPauseBtn.innerText = 'pause_circle';
    
    playerModal.classList.add('active');
}

function closePlayer() { playerModal.classList.remove('active'); }

// Play/Pause
playPauseBtn.addEventListener('click', () => {
    if (!audioPlayer.src) return;
    if (isPlaying) { audioPlayer.pause(); } 
    else { audioPlayer.play(); }
    isPlaying = !isPlaying;
    playPauseBtn.innerText = isPlaying ? 'pause_circle' : 'play_circle';
});

// Next / Prev Logic
function playNext() {
    if (isShuffle) {
        currentIndex = Math.floor(Math.random() * playlist.length);
    } else {
        currentIndex = (currentIndex + 1) % playlist.length;
    }
    playSong(currentIndex);
}

function playPrev() {
    currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    playSong(currentIndex);
}

document.getElementById('next-btn').addEventListener('click', playNext);
document.getElementById('prev-btn').addEventListener('click', playPrev);

// Auto-play next song when current ends
audioPlayer.addEventListener('ended', () => {
    if (isLoop) {
        audioPlayer.currentTime = 0;
        audioPlayer.play();
    } else {
        playNext();
    }
});

// Shuffle & Loop Toggles
const shuffleBtn = document.getElementById('shuffle-btn');
const loopBtn = document.getElementById('loop-btn');

shuffleBtn.addEventListener('click', () => {
    isShuffle = !isShuffle;
    shuffleBtn.classList.toggle('active');
});

loopBtn.addEventListener('click', () => {
    isLoop = !isLoop;
    loopBtn.classList.toggle('active');
    audioPlayer.loop = isLoop; // HTML5 native loop
});

// Sync Progress Bar
audioPlayer.addEventListener('timeupdate', () => {
    if (audioPlayer.duration) {
        progressBar.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        
        let curMins = Math.floor(audioPlayer.currentTime / 60);
        let curSecs = Math.floor(audioPlayer.currentTime % 60);
        currentTimeTxt.innerText = `${curMins}:${curSecs < 10 ? '0' : ''}${curSecs}`;
        
        let durMins = Math.floor(audioPlayer.duration / 60);
        let durSecs = Math.floor(audioPlayer.duration % 60);
        durationTxt.innerText = `${durMins}:${durSecs < 10 ? '0' : ''}${durSecs}`;
    }
});

progressBar.addEventListener('input', () => {
    if (audioPlayer.duration) {
        audioPlayer.currentTime = (progressBar.value / 100) * audioPlayer.duration;
    }
});

document.getElementById('volume-bar').addEventListener('input', (e) => {
    audioPlayer.volume = e.target.value / 100;
});

// Cover / Lyrics Toggle
document.getElementById('media-toggle').addEventListener('click', () => {
    coverArt.classList.toggle('active');
    document.getElementById('lyrics-view').classList.toggle('active');
});

// --- 6. INTERACTIVE ACTION BUTTONS (The Delusion of Action) ---
const likeBtn = document.getElementById('like-btn');
const saveBtn = document.getElementById('save-btn');
const shareBtn = document.getElementById('share-btn');
const downloadBtn = document.getElementById('download-btn');
const eqModeBtn = document.getElementById('eq-mode-btn');

likeBtn.addEventListener('click', () => likeBtn.classList.toggle('filled'));
saveBtn.addEventListener('click', () => saveBtn.classList.toggle('filled'));

shareBtn.addEventListener('click', () => {
    shareBtn.style.color = 'var(--x-color)';
    setTimeout(() => shareBtn.style.color = '', 500); // flashes color
});

downloadBtn.addEventListener('click', () => {
    if (downloadBtn.innerText === 'download') {
        downloadBtn.innerText = 'download_done';
        downloadBtn.classList.add('filled');
    } else {
        downloadBtn.innerText = 'download';
        downloadBtn.classList.remove('filled');
    }
});

eqModeBtn.addEventListener('click', () => {
    eqModeBtn.classList.toggle('active');
    eqModeBtn.innerText = eqModeBtn.classList.contains('active') ? 'Mode: Bass Boost' : 'Mode (EQ)';
});