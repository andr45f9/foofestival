const spotsUrl = "http://localhost:8080/available-spots";
let spotsData;

/* Object where I store the users inputs */
let fullOrder = {
  area: "",
  amount: "",
  regTicket: "",
  vipTicket: "",
  greenCamp: "",
  twoPeopleCamp: "",
  threePeopleCamp: "",
  userName: "",
  userMail: "",
  guestName: "",
  guestMail: "",
};

/* Object where I store the put data respons, so the reservation data*/
let responsData = {
  id: "",
};

window.addEventListener("DOMContentLoaded", init);

function init() {
  addingEventListeners();
  newOption();
}

function addingEventListeners() {
  //ALL INPUT OR SELECT FORM CLICKS
  /* camping area and number of people */
  document.querySelector('[id="areas"]').addEventListener("click", selectCampingArea);
  document.querySelectorAll('[id="people-spots"]').forEach((option) => option.addEventListener("input", selectPeopleAmount));

  /* ticket type */
  document.querySelectorAll('[id="reg-ticket"]').forEach((option) => option.addEventListener("input", selectOptions));
  document.querySelectorAll('[id="reg-ticket"]').forEach((option) => option.addEventListener("input", selectOptions));

  /* camping options */
  document.querySelectorAll('[id="vip-ticket"]').forEach((option) => option.addEventListener("input", selectOptions));
  document.querySelectorAll('[id="green-camp"]').forEach((option) => option.addEventListener("input", selectOptions));
  document.querySelectorAll('[id="2p-camp"]').forEach((option) => option.addEventListener("input", selectOptions));
  document.querySelectorAll('[id="3p-camp"]').forEach((option) => option.addEventListener("input", selectOptions));

  /* Name and E-mail */
  document.querySelector('[id="user-name"]').addEventListener("input", selectTicketHolderName);
  document.querySelectorAll('[id="user-mail"]').forEach((option) => option.addEventListener("input", selectTicketHolderName));
  document.querySelector('[id="guest-name"]').addEventListener("input", selectTicketHolderName);
  document.querySelectorAll('[id="guest-mail"]').forEach((option) => option.addEventListener("input", selectTicketHolderName));

  //ALL BUTTON CLICKS for the booking system
  document.querySelector("#reserve_button").disabled = true;
  document.querySelector("#reserve_button").addEventListener("click", formFlow2);

  document.querySelector("#next_button").disabled = true;
  document.querySelector("#next_button").addEventListener("click", formFlow3);

  document.querySelector("#checkout_button").disabled = true;
  document.querySelector("#checkout_button").addEventListener("click", formFlow4);
  document.querySelector("#clear_button").addEventListener("click", resetOrder);
  document.querySelector("#goback_button").addEventListener("click", goToHomePage);
  document.querySelector("#buynow_button").addEventListener("click", formFlowComplete);
}

/*----  Creating dynamic options in the dropdown form with the /available-spots data  ----*/

async function newOption() {
  const resspons = await fetch(spotsUrl);
  const data = await resspons.json();

  console.log("data", data);

  let areaSelect = document.querySelector("#areas");
  for (let i = 0; i < data.length; i++) {
    let areaOption = document.createElement("option");
    areaOption.innerHTML = data[i]["area"] + "  (Spots left: " + data[i]["available"] + ")";
    areaOption.value = data[i]["area"];
    areaOption.id = "area";
    areaSelect.appendChild(areaOption);

    if (data[i]["available"] <= 0) {
      areaOption.disabled = true;
    }
  }
}

/*----  Reading inputs and adding if statemnts to control the flow of the form ----*/

function selectCampingArea() {
  const e = document.querySelector(".area_dropdown");
  fullOrder.area = e.options[e.selectedIndex].value;
}

function selectPeopleAmount() {
  fullOrder.amount = document.querySelector('[id="people-spots"]').value;

  //if statement for controlling when the guest form should pop up.
  if (fullOrder.amount >= 2) {
    document.querySelector(".guest_ticket").style.display = "block";
  }

  //if else statement for controlling when the reserve button should be clickable
  if (fullOrder.amount >= 1) {
    document.querySelector("#reserve_button").className = "button_outline_after";
    document.querySelector("#reserve_button").disabled = false;
  } else {
    document.querySelector("#reserve_button").className = "button_outline";
  }
}

function selectOptions() {
  fullOrder.regTicket = document.querySelector('[id="reg-ticket"]').value;
  fullOrder.vipTicket = document.querySelector('[id="vip-ticket"]').value;
  fullOrder.greenCamp = document.querySelector('[id="green-camp"]').value;
  fullOrder.twoPeopleCamp = document.querySelector('[id="2p-camp"]').value;
  fullOrder.threePeopleCamp = document.querySelector('[id="3p-camp"]').value;

  //if else statement for controlling when the next button should be clickable
  if (fullOrder.regTicket === fullOrder.amount && fullOrder.vipTicket === "0") {
    document.querySelector("#next_button").className = "button_outline_after";
    document.querySelector("#next_button").disabled = false;
  } else if (fullOrder.vipTicket === fullOrder.amount && fullOrder.regTicket === "0") {
    document.querySelector("#next_button").className = "button_outline_after";
    document.querySelector("#next_button").disabled = false;
  } else if (fullOrder.vipTicket + fullOrder.regTicket === fullOrder.amount) {
    document.querySelector("#next_button").className = "button_outline_after";
    document.querySelector("#next_button").disabled = false;
  } else {
    document.querySelector("#next_button").className = "button_outline";
  }
}

function selectTicketHolderName() {
  fullOrder.userName = document.querySelector('[id="user-name"]').value;
  fullOrder.userMail = document.querySelector('[id="user-mail"]').value;

  fullOrder.guestName = document.querySelector('[id="guest-name"]').value;
  fullOrder.guestMail = document.querySelector('[id="guest-mail"]').value;

  if (fullOrder.userName === fullOrder.userName) {
    document.querySelector("#checkout_button").className = "button_outline_after";
    document.querySelector("#checkout_button").disabled = false;
  } else {
    document.querySelector("#reserve_button").className = "button_outline";
  }
}

/*----  PUT request - submitting a reservation ----*/
function putReservation() {
  const spotsOrder = {
    area: fullOrder.area,
    amount: fullOrder.amount,
  };

  const reserve = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(spotsOrder),
  };

  fetch("http://localhost:8080/reserve-spot", reserve)
    .then((response) => response.json())
    .then(function (data) {
      responsData = data;
      console.log("responsData:", responsData);
    })
    .catch((err) => console.error(err));
}

/*----  POST request - fullfilling the reservation ----*/
function postReservation() {
  /* Object where I only store the reservation respons id */

  const fullfill = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(responsData),
  };

  fetch("http://localhost:8080/fullfill-reservation", fullfill)
    .then((response) => response.json())
    .then((JSON) => console.log("JSON:", JSON))
    .catch((err) => console.error(err));
}

/*----  POST request - sending the reservation to a databse ----*/

async function saveOrderInformation() {
  const databaseUrl = "https://ubxzdsekdngfhgaexaxa.supabase.co";
  const res = await fetch(databaseUrl + "/rest/v1/fooData", {
    method: "POST",
    headers: {
      apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVieHpkc2VrZG5nZmhnYWV4YXhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzExODY1MTUsImV4cCI6MTk4Njc2MjUxNX0.NAR7-EMDwQNkG23qu41JR7zJZ_212imdsQUc3md_Y7k",
      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVieHpkc2VrZG5nZmhnYWV4YXhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzExODY1MTUsImV4cCI6MTk4Njc2MjUxNX0.NAR7-EMDwQNkG23qu41JR7zJZ_212imdsQUc3md_Y7k",
      Prefer: "return=representation",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(fullOrder),
  });
  /*     .then((res) => res.json())
    .then((res) => console.log(res))
    .catch((err) => console.error(err)); */

  return await res.json();
}

/*---- Adding and removing html elemnts on button click for the form flow ----*/

function formFlow2() {
  const flow2 = document.querySelector("#formflow_2");
  flow2.style.display = "block"; //showig the form after click.
  flow2.className = "left_animation"; //when showing the form - then adding a fade in animation.

  /* Timer settings */
  const showTimer = document.querySelector("#timer");
  showTimer.style.display = "block";
  showTimer.className = "scale_animation";
  display = document.querySelector(".display_timer");
  const fiveMinutes = 60 * 5;

  startTimer(fiveMinutes, display);

  putReservation();
}

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
  postReservation();
  saveOrderInformation();
}

/*----  Everything with 5 min timer ----*/

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

function stopTimer() {
  clearInterval(countingDown);
}

/*---- Reloading page! ----*/
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
