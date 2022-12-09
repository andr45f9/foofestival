const url = "http://localhost:8080/bands";
let data;

window.addEventListener("DOMContentLoaded", init);

function init() {
  getData();
}

async function getData() {
  const resspons = await fetch(url);
  const json = await resspons.json();

  data = json;
  console.log("data", data);

  cleanData(data);
}

function cleanData(data) {
  //Makeing sure that that only 8 items in the array is getting shown. WE WRITE 9 BECAUSE WE WANT TO SKIP THE FIRST ITEM.
  const showArtistAmount = 9;
  //Choosing to skip the first item in the array, since the band name was pretty long, and it was not aesthetically pleasing.
  const chosenArtists = data.slice(1, showArtistAmount);

  show(chosenArtists);
}

function show(chosenArtists) {
  const container = document.querySelector("#all_artists");
  const template = document.querySelector("template").content;
  container.textContent = "";

  chosenArtists.forEach((artist) => {
    const clone = template.cloneNode(true);
    clone.querySelector("h3").textContent = artist.name;
    clone.querySelector("h4").textContent = artist.members.join("/ ");
    container.appendChild(clone);
  });
}
