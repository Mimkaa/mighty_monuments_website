import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getDatabase,
  ref,
  onValue,
  runTransaction,
  set
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

const downloadsRef = ref(database, "downloads");

const downloadButton = document.getElementById("downloadButton");
const progressBar = document.getElementById("progressBar");
const downloadText = document.getElementById("downloadText");
const statusText = document.getElementById("statusText");

const DOWNLOAD_GOAL = 100;

let downloads = 0;

function updateDownloadUI() {
  downloadText.textContent = `${downloads} / ${DOWNLOAD_GOAL} downloads`;

  const percentage = Math.min((downloads / DOWNLOAD_GOAL) * 100, 100);

  progressBar.style.width = percentage + "%";
  statusText.textContent = `${Math.round(percentage)}%`;
}

onValue(downloadsRef, async (snapshot) => {
  const value = snapshot.val();

  if (value === null) {
    downloads = 0;
    await set(downloadsRef, 0);
  } else {
    downloads = value;
  }

  updateDownloadUI();
});

downloadButton.addEventListener("click", () => {
  downloads++;
  updateDownloadUI();

  runTransaction(downloadsRef, (currentValue) => {
    return (currentValue || 0) + 1;
  });
});