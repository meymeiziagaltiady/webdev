const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");
const startButton = document.getElementById("startBtn");
const scoreDisplay = document.getElementById("scoreDisplay");

let isGameOver = true;
let gameInterval;
let score = 0;
let gameDuration = 0;

// game dimulai
function startGame() {
  if (!isGameOver) {
    gameInterval = setInterval(function () {
      gameDuration += 0.01; // hitung durasi main
      score = Math.floor(gameDuration * 10); //hitung score berdasarkan waktu main

      // tampilkan score secara real time
      showScore();

      // ambil nilai Y player
      let playerBottom = parseInt(
        window.getComputedStyle(player).getPropertyValue("bottom")
      );

      // ambil nilai X obstacle
      let obstacleLeft = parseInt(
        window.getComputedStyle(obstacle).getPropertyValue("left")
      );

      // deteksi collision
      if (obstacleLeft < 10 && obstacleLeft > 0 && playerBottom <= 40) {
        console.log("collision");
        obstacle.classList.add("pause");
        
        stopGame();
      }
    }, 10);
  }
}

// game over
function stopGame() {
  isGameOver = true; // set game jadi berakhir
  clearInterval(gameInterval); // reset interval
  player.classList.remove("jump"); // hapus jump player, agar tidak bisa bergerak
  score = 0; // reset score
  gameDuration = 0; // reset duration
  
  // tampilkan tombol restart
  const restartButton = document.getElementById("restartBtn");
  restartButton.style.display="block";

  restartButton.addEventListener("click", function () {
    // reset posisi player dan obstacles
    player.style.bottom = "0px"; 
    obstacle.style.left = "640px";

    obstacle.classList.remove("pause");
    obstacle.classList.remove("obstacle-running");

    showScore(); // tampilkan score ter-reset
    
    restartButton.style.display="none";
    startButton.style.display="block";
  });

}

// start game ketika tombol start di klik
startButton.addEventListener("click", function(){
  startButton.style.display="none";
  isGameOver = false;
  obstacle.classList.add("obstacle-running"); // play animasi obstacle
  startGame();
});

// aksi lompat
function jump() {
  if (player.classList != "jump") {
    player.classList.add("jump");

    // cooldown untuk bisa melakukan jump lagi
    setTimeout(function () {
      player.classList.remove("jump");
    }, 600);
  }
}

// lompat dengan keyboard
document.addEventListener("keydown", function (event) {
  if (!isGameOver) {
    if (event.key === "ArrowUp" || event.key === " ") {
      jump();
    }
  }
});

// lompat dengan klik layar
document.addEventListener("click", function () {
  if (!isGameOver) {
    jump();
  }
});

// tampilkan score
function showScore(){
  scoreDisplay.textContent = "score " + score;
}