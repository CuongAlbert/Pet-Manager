"use strict";
const breedTable = document.getElementById("tbody");
const inputBreed = document.getElementById("input-breed");
const inputType = document.getElementById("input-type");
const btnSubmit = document.getElementById("submit-btn");

const sidebar = document.getElementById("sidebar");
const navActive = document.querySelector(".active");

const petArr = JSON.parse(getFromStorage("key"))
  ? JSON.parse(getFromStorage("key"))
  : [];

const breedArr = JSON.parse(getFromStorage("bm"))
  ? JSON.parse(getFromStorage("bm"))
  : [];

const renderBreedData = function (arr) {
  breedTable.innerHTML = "";
  arr.forEach((el, i) => {
    let row = document.createElement("tr");
    const breed = el.breed;
    row.innerHTML = `
    <td>${i + 1}</td>
    <td>${el.breed}</td>
    <td>${el.type}</td>
    <td><button class="btn btn-danger" onclick="deleteBreed('${breed}')">Delete</button></td>
    `;
    breedTable.appendChild(row);
  });
};
renderBreedData(breedArr);

const validateBreed = function () {
  if (inputBreed.value == "") {
    alert("Please input breed");
    inputBreed.focus();
  } else if (inputType.value == "Select Type") {
    alert("Please input type");
    inputType.focus();
  } else {
    return true;
  }
};
const clearInputBreed = () => {
  inputBreed.value = "";
  inputType.value = "";
};

// click sidebar
sidebar.addEventListener("click", function () {
  navActive.classList.toggle("active");
});

//Click submit
btnSubmit.addEventListener("click", function () {
  if (validateBreed()) {
    breedArr.push({ breed: inputBreed.value, type: inputType.value });
    clearInputBreed();
    saveToStorage("bm", JSON.stringify(breedArr));
    renderBreedData(breedArr);
  }
});
console.log(breedArr);

const myFindIndex = (breed) => {
  for (let i = 0; i < breedArr.length; i++) {
    if (breedArr[i].breed === breed) return i;
  }
  return -1;
};
// xoa du lieu breed
const deleteBreed = (breed) => {
  // Confirm before deletePet
  if (confirm("Are you sure?")) {
    breedArr.splice(myFindIndex(breed), 1);
    breedTable.innerHTML = "";
    saveToStorage("bm", JSON.stringify(breedArr));
    renderBreedData(breedArr);
  }
};
