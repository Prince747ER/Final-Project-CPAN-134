// DOM Elements
const magic8Ball = document.getElementById("magic8ball");
const answerDisplay = document.getElementById("song-result");
const youtubeBaseUrl = "https://www.youtube.com/results?search_query=";
const activityPopup = document.getElementById("activityPopup");
const overlay = document.getElementById("overlay");

// Song Data
let songs = [];

// Initialize on page load
loadSongs();

// Main Functions
async function getActivity() {
  try {
    const activityRes = await fetch("https://www.boredapi.com/api/activity");
    const activityData = await activityRes.json();
    
    const extraActivity = "Buy an online item, broski 🛒";
    const random = Math.random() < 0.5 ? activityData.activity : extraActivity;
    
    showPopup(`<strong>Activity:</strong> ${random}`);
  } catch (err) {
    console.error("Bored API error:", err);
    const fallbackActivities = [
      "Take a walk, broski 🌳",
      "Listen to your favorite song 🎵",
      "Drink some water, homie 🚰",
      "Buy an Expensive item from Amazon 🛒",
      "Dunk a Basketball 🏀",
      "Punch a wall 👊",
      "Buy Wasabi and Eat it 🍴",
      "Ask you Crush out ❤️",
      "Score a Bicycle Kick from a Cross on FC ⚽",
      "Defeat Lone Shadow Vilehand & Interior Ministry Ninja From Sekiro ⚔️",
      "Take a Cold Shower 🚿",
      "Eat a Jalapeno 🌶️",
    ];
    const randomFallback = fallbackActivities[Math.floor(Math.random() * fallbackActivities.length)];
    showPopup(`<strong>Activity:</strong> ${randomFallback}`);
  }
}

function showPopup(content) {
  document.getElementById("activity").innerHTML = content;
  overlay.classList.add("active");
  activityPopup.classList.add("active");
}

function closePopup() {
  overlay.classList.remove("active");
  activityPopup.classList.remove("active");
}

async function loadSongs() {
  songs = [
    "R★O★C★K★S - Hound Dog",
    "Billie Jean - Michael Jackson",
    "大張偉 - 阳光彩虹小白马",
    "Last Ride - Sidhu M.W",
    "Upuan - Gloc 9",
    "Chambea - Bad Bunny",
    "Duz it - Eazy E",
    "I love music - Ahmad Jamal",
    "Интернационал",
    "AEAO - Dynamic Duo",
    "Temperature - Sean Paul",
    "Shutdown - Skepta",
    "Love Nwantiti - Ckay",
    "Wavin' Flag - K'naan",
    "Danza Kuduro - Don Omar"
  ];
}

function getRandomSong() {
  if (songs.length === 0) return "Load songs first, broski!";
  const randomIndex = Math.floor(Math.random() * songs.length);
  return songs[randomIndex];
}

function shake8Ball() {
  if (songs.length === 0) {
    answerDisplay.innerHTML = "Load songs first, broski!";
    return;
  }

  // Reset
  answerDisplay.innerHTML = "???";
  magic8Ball.classList.remove("shake");

  // Force reflow for animation restart
  setTimeout(() => {
    magic8Ball.classList.add("shake");
    
    // Show answer after shake
    setTimeout(() => {
      const song = getRandomSong();
      const youtubeLink = `${youtubeBaseUrl}${encodeURIComponent(song)}`;
      answerDisplay.innerHTML = `
        <div class="song-result">${song}</div>
        <a href="${youtubeLink}" target="_blank" class="youtube-button">
          🎵 Play on YouTube
        </a>
      `;
    }, 1000);
  }, 10);
}

// Close popup when clicking overlay
overlay.addEventListener('click', closePopup);