const spotsUrl = "http://localhost:8080/available-spots";
let spotsData;

window.addEventListener("DOMContentLoaded", init);

function init() {
  getSpotsData();
  addingEventListeners();
}

function addingEventListeners() {
  //ALL BUTTON CLICKS for the booking system
  document.querySelector("#reserve_button").addEventListener("click", formFlow2);
  document.querySelector("#next_button").addEventListener("click", formFlow3);
  document.querySelector("#checkout_button").addEventListener("click", formFlow4);
  document.querySelector("#clear_button").addEventListener("click", resetOrder);
  document.querySelector("#goback_button").addEventListener("click", goToHomePage);
  document.querySelector("#buynow_button").addEventListener("click", formFlowComplete);
}

async function getSpotsData() {
  const resspons = await fetch(spotsUrl);
  const json = await resspons.json();

  spotsData = json;
  console.log("data", spotsData);

  formFlow1(spotsData);
}

function formFlow1(spotsData) {
  let campArea = document.querySelectorAll("option").value;
  console.log("area chosen:", campArea);

  /*  campArea.forEach((campAreaChoice) => {
    campArea = campAreaChoice.value;

    console.log("area chosen:", campArea);
  }); */

  const ticketAmount = document.querySelector('[id="people-spots"]').value;
  console.log("ticket amount:", ticketAmount);
}

function formFlow2() {
  const flow2 = document.querySelector("#formflow_2");
  flow2.style.display = "block"; //showig the form after click.
  flow2.className = "left_animation"; //when showing the form - then adding a fade in animation.

  const showTimer = document.querySelector("#timer");
  showTimer.style.display = "block";
  showTimer.className = "scale_animation";

  startTimer();
}

function startTimer(duration, display) {
  let timer = duration,
    minutes,
    seconds;

  countingDown = setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
      resetOrder();
    }
  }, 1000);
}

window.onload = function () {
  const fiveMinutes = 60 * 5,
    display = document.querySelector(".display_timer");
  startTimer(fiveMinutes, display);
};

function formFlow3() {
  const flow3 = document.querySelector("#formflow_3");
  flow3.style.display = "block";
  flow3.className = "right_animation";
}

function formFlow4() {
  const flow4 = document.querySelector("#basket");
  flow4.style.display = "block";
  flow4.className = "right_animation";

  document.querySelector("#booking").style.display = "none";
  document.querySelector("#timer").style.display = "none";

  stopTimer();
}

/*---- Stopping and resetting things ----*/

function stopTimer() {
  clearInterval(countingDown);
  console.log("stopped the time");
}

function resetOrder() {
  location.reload();
}

function goToHomePage() {
  window.location = "/";
}

/*---- Flow complete - Sending booking information ----*/

function formFlowComplete() {
  document.querySelector(".complete_message").style.display = "block";
}
