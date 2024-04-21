const input = document.querySelector("input");
const check = document.getElementById("Check");
const num = document.querySelector(".num");
const h3 = document.querySelector("h3");
const form = document.querySelector("form");
const score = document.getElementById("score");
const Again = document.getElementById("Again");
const highVal = document.getElementById("highVal");
let scoreStr = "💯 Score: ";
let scoreValue = 20;
let highScoreValue = 0;
let prevHigh;
let randomNum;
// =================================================================================
// localStorage.setItem("highScore",JSON.stringify(highScore));
if (!localStorage.getItem("highScore")) {
  localStorage.setItem("highScore", "0");
  highVal.innerHTML = `${JSON.parse(localStorage.getItem("highScore"))}`;
} else {
  prevHigh = JSON.parse(localStorage.getItem("highScore"));
  console.log("prevHigh", prevHigh);
  highVal.innerHTML = `${JSON.parse(localStorage.getItem("highScore"))}`;
}
// =================================================================================
const random = () => Math.trunc(Math.random() * 20) + 1; // returns a random number between 1 and 20
randomNum = random();
console.log(randomNum);
// =================================================================================
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const guess = Number(input.value);
  console.log(guess);
  if (scoreValue > 1) {
    switch (true) {
      //* when guess is true
      case guess === randomNum:
        score.innerHTML = `${scoreStr} ${++scoreValue}`;
        if (!localStorage.getItem("highScore")) {
          localStorage.setItem("highScore", JSON.stringify(prevHigh));
          highVal.innerHTML = `${JSON.parse(
            localStorage.getItem("highScore")
          )}`;
        }
        h3.innerHTML = "🎉 Correct Number!";
        document.body.style.backgroundColor = "#60b347";
        document.querySelector(".num").style.padding = "0.5% 5%";
        num.innerHTML = randomNum;
        if (prevHigh < scoreValue) {
          highVal.innerHTML = `${scoreValue}`;
          localStorage.setItem("highScore", highVal.innerHTML);
          prevHigh = Number(localStorage.getItem("highScore"));
          console.log("1 hi");
        }
        randomNum = Math.trunc(Math.random() * 20) + 1;
        console.log("new random", randomNum);
        //   if (scoreValue < highScore.innerHTML) {
        //     highScore.innerHTML =
        //   }
        //   highScore.innerHTML = `${highScoreStr} ${Number(JSON.parse(localStorage.getItem("highScore")))}
        //   `;
        break;
      // when guess is unequal to random
      case guess !== randomNum && guess != 0:
        h3.innerHTML = guess > randomNum?"📈 High Number!":"📉 Low Number!";
        document.body.style.backgroundColor = "";
        document.querySelector(".num").style.padding = "";
        num.innerHTML = "?";
        score.innerHTML = `${scoreStr} ${--scoreValue}`;
        break;
      // // when guess is low
      // case guess < randomNum && guess != 0:
      //   h3.innerHTML = "📉 Low Number!";
      //   document.body.style.backgroundColor = "";
      //   document.querySelector(".num").style.padding = "";
      //   num.innerHTML = "?";
      //   score.innerHTML = `${scoreStr} ${--scoreValue}`;
      //   break;
      case guess == 0 || "":
        h3.innerHTML = "🚫 No Number Entered!";
        break;
      default:
        h3.innerHTML = "Start Guessing...";
        break;
    }
    //! when score is zero, show game over and reset Score
  } else {
    h3.innerHTML = "💥 Game Over!";
    document.body.style.backgroundColor = "red";
    score.innerHTML = `${scoreStr} 0`;
    randomNum = Math.trunc(Math.random() * 20) + 1;
  }
  input.value = "";
});
// =====================================|reset|============================================
Again.addEventListener("click", () => {
  document.body.style.backgroundColor = "";
  document.querySelector(".num").style.padding = "";
  score.innerHTML = `${scoreStr}20`;
  scoreValue = 20;
  // highVal.innerHTML = `${JSON.parse(localStorage.getItem("highScore"))}`;
  num.innerHTML = "?";
  input.value = "";
  h3.innerHTML = "Start Guessing...";
  random();
});
