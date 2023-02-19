"use strict";

const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const typeInput = document.getElementById("input-type");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const tableBodyEl = document.getElementById("tbody");
const btnFind = document.getElementById("find-btn");

const sidebar = document.getElementById("sidebar");
const navActive = document.querySelector(".active");

let petArr = getFromStorage("key") ? JSON.parse(getFromStorage("key")) : [];

const breedArr = getFromStorage("bm") ? JSON.parse(getFromStorage("bm")) : [];
// console.log(petArr);
// console.log(breedArr);

const renderTableData = function (petArr) {
  // Show date
  const showDate = function (date) {
    let month = new Date(date).getMonth() + 1;
    let day = new Date(date).getDate();
    let yyyy = new Date(date).getFullYear();
    return `${day}/${month}/${yyyy}`;
  };

  // emotion
  const emo = (x) => (x ? "check" : "x");
  tableBodyEl.innerHTML = "";
  petArr.forEach((el) => {
    let row = document.createElement("tr");
    const petId = el.id;
    row.innerHTML = `
    <th>${petId}</th>
    <td>${el.name}</td> 
    <td>${el.age}</td> 
    <td>${el.type}</td>
    <td>${el.weight} kg</td>
    <td>${el.length} cm</td>
    <td>${el.breed}</td>
    <td><i class="bi bi-square-fill" style="color: ${el.color}"></i></td>
    <td><i class="bi bi-${emo(el.vaccinated)}-circle-fill"></i></td>
    <td><i class="bi bi-${emo(el.dewormed)}-circle-fill"></i></td>
    <td><i class="bi bi-${emo(el.sterilized)}-circle-fill"></i></td> 
    <td>${showDate(el.date)}</td>
    `;
    tableBodyEl.appendChild(row);
  });
};

// click sidebar
sidebar.addEventListener("click", function () {
  navActive.classList.toggle("active");
});
//Option Breed
const renderBreed = function (arr) {
  breedInput.innerHTML = "<option>Select Breed</option>";
  arr.forEach((el) => {
    const option = document.createElement("option");
    option.innerHTML = `
    ${el.breed}
    `;
    breedInput.appendChild(option);
  });
};
renderBreed(breedArr);

const showBreed = function (type) {
  if (type === "Dog") {
    return renderBreed(breedArr.filter((el) => el.type === type));
  } else if (type === "Cat") {
    renderBreed(breedArr.filter((el) => el.type === type));
  } else {
    renderBreed(breedArr);
  }
};
typeInput.addEventListener("change", function () {
  showBreed(typeInput.value);
});

// Event tim kiem
btnFind.addEventListener("click", function (e) {
  let petSearch = petArr;

  if (idInput.value !== "") {
    petSearch = petSearch.filter((el) => el.id.includes(idInput.value));
  }

  if (nameInput.value !== "") {
    petSearch = petSearch.filter((el) => el.name.includes(nameInput.value));
  }

  if (typeInput.value !== "Select Type") {
    petSearch = petSearch.filter((el) => el.type === typeInput.value);
  }

  if (breedInput.value !== "Select Breed") {
    petSearch = petSearch.filter((el) => el.breed === breedInput.value);
  }

  if (vaccinatedInput.checked) {
    petSearch = petSearch.filter((el) => el.vaccinated);
  }

  if (dewormedInput.checked) {
    petSearch = petSearch.filter((el) => el.dewormed);
  }

  if (sterilizedInput.checked) {
    petSearch = petSearch.filter((el) => el.sterilized);
  }
  renderTableData(petSearch);
});
