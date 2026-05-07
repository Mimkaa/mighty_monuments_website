import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getDatabase,
  ref,
  onValue,
  set,
  get
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCj6Ii9ucx5OzqM__-hmFzKMdp7A8lM5j0",
  authDomain: "mighty-monuments-website.firebaseapp.com",
  databaseURL: "https://mighty-monuments-website-default-rtdb.firebaseio.com",
  projectId: "mighty-monuments-website",
  storageBucket: "mighty-monuments-website.firebasestorage.app",
  messagingSenderId: "101199791785",
  appId: "1:101199791785:web:fbe6e681bd8f42f05d0bb8",
  measurementId: "G-HHW5DQXD8D"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const progressRef = ref(database, "progress");

const progressButton = document.getElementById("progressButton");
const resetButton = document.getElementById("resetButton");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const statusText = document.getElementById("statusText");

let progress = 0;

onValue(progressRef, (snapshot) => {
  const value = snapshot.val();

  if (value === null) {
    progress = 0;
    set(progressRef, 0);
  } else {
    progress = value;
  }

  updateProgressUI();
});

progressButton.addEventListener("click", async () => {
  const snapshot = await get(progressRef);

  let currentProgress = snapshot.val();

  if (currentProgress === null) {
    currentProgress = 0;
  }

  let newProgress = currentProgress + 10;

  if (newProgress > 100) {
    newProgress = 100;
  }

  await set(progressRef, newProgress);
});

resetButton.addEventListener("click", async () => {
  await set(progressRef, 0);
});

function updateProgressUI() {
  progressBar.style.width = progress + "%";
  progressText.textContent = progress + "%";

  if (progress === 0) {
    statusText.textContent = "Not started";
    progressButton.textContent = "Work on Monument";
  } else if (progress < 100) {
    statusText.textContent = "Building...";
    progressButton.textContent = "Work on Monument";
  } else {
    statusText.textContent = "Monument completed!";
    progressButton.textContent = "Completed";
  }
}