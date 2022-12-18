window.addEventListener("DOMContentLoaded", init);

function init() {
  // Clear forms here
  document.querySelectorAll('[type="text"]').value = "";
  document.querySelector(".area_dropdown").value = "Select area here";

  cardPayment();
}

function cardPayment() {
  const cardForm = document.querySelector("#formflow_4");

  cardForm.elements.cardnumber.addEventListener("input", (e) => {
    if (cardForm.elements.cardnumber.value.length === 15) {
      cardForm.elements.expmonth.focus();
    }
  });

  cardForm.elements.expmonth.addEventListener("input", (e) => {
    if (cardForm.elements.expmonth.value.length === 2) {
      cardForm.elements.expyear.focus();
    }
  });
  cardForm.elements.expyear.addEventListener("input", (e) => {
    if (cardForm.elements.expyear.value.length === 4) {
      cardForm.elements.cvv.focus();
    }
  });

  cardForm.elements.cvv.value.length === 3;
}

window.onload = init;

function allButtons() {}
