let progress = 0;

const progressButton = document.getElementById("progressButton");
const resetButton = document.getElementById("resetButton");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const statusText = document.getElementById("statusText");

progressButton.addEventListener("click", () => {
  progress += 10;

  if (progress > 100) {
    progress = 100;
  }

  updateProgress();
});

resetButton.addEventListener("click", () => {
  progress = 0;
  updateProgress();
});

function updateProgress() {
  progressBar.style.width = progress + "%";
  progressText.textContent = progress + "%";

  if (progress === 0) {
    statusText.textContent = "Not started";
  } else if (progress < 100) {
    statusText.textContent = "Building...";
  } else {
    statusText.textContent = "Monument completed!";
    progressButton.textContent = "Completed";
  }

  if (progress < 100) {
    progressButton.textContent = "Work on Monument";
  }
}
