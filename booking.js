const spotsUrl = "http://localhost:8080/available-spots";
let spotsData;

const putSpots = {
  area: "",
  amount: "",
};

console.log(putSpots);

window.addEventListener("DOMContentLoaded", init);

function init() {
  getSpotsData();
  addingEventListeners();
  newOption();
}

function addingEventListeners() {
  document.querySelector('[id="areas"]').addEventListener("click", selectCampingArea);
  document.querySelectorAll('[id="people-spots"]').forEach((option) => option.addEventListener("click", selectPeopleAmount));

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
}

async function newOption() {
  const resspons = await fetch(spotsUrl);
  const data = await resspons.json();

  let areaSelect = document.querySelector("#areas");
  for (let i = 0; i < data.length; i++) {
    let areaOption = document.createElement("option");
    areaOption.innerHTML = data[i]["area"] + " - Spots " + data[i]["spots"];
    areaOption.value = data[i]["area"];
    areaOption.id = "area";
    areaSelect.appendChild(areaOption);
  }
}

function selectCampingArea() {
  const e = document.querySelector(".area_dropdown");
  putSpots.area = e.options[e.selectedIndex].value;

  console.log("chosen area:", putSpots.area);
}

function selectPeopleAmount() {
  putSpots.amount = document.querySelector('[id="people-spots"]').value;

  console.log("ticket amount:", putSpots.amount);
}

function putReservation() {
  /* If statement that only allows you to put a reservation if 
  the amount of people is either equal or less than the available spots  */

  const reserve = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(putSpots),
  };

  fetch("http://localhost:8080/reserve-spot", reserve)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}

/*---- Adding and removing html elemnts on button click for the form flow ----*/

function formFlow2() {
  const flow2 = document.querySelector("#formflow_2");
  flow2.style.display = "block"; //showig the form after click.
  flow2.className = "left_animation"; //when showing the form - then adding a fade in animation.

  const showTimer = document.querySelector("#timer");
  showTimer.style.display = "block";
  showTimer.className = "scale_animation";

  startTimer();
  putReservation();
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
