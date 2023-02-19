"use strict";
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const editTable = document.getElementById("tbody");
const inputForm = document.getElementById("container-form");

const sidebar = document.getElementById("sidebar");
const navActive = document.querySelector(".active");

const btnSubmit = document.getElementById("submit-btn");

const petArr = JSON.parse(getFromStorage("key"))
  ? JSON.parse(getFromStorage("key"))
  : [];

const breedArr = JSON.parse(getFromStorage("bm"))
  ? JSON.parse(getFromStorage("bm"))
  : [];

const emo = (x) => (x ? "check" : "x");

const showDate = function (date) {
  let month = new Date(date).getMonth() + 1;
  let day = new Date(date).getDate();
  let yyyy = new Date(date).getFullYear();
  return `${day}/${month}/${yyyy}`;
};
const renderTableData = function (petArr) {
  editTable.innerHTML = "";
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
    <td><button class="btn btn-warning" onclick="startEditPet('${petId}')">Edit</button></td>
    `;
    editTable.appendChild(row);
  });
};
renderTableData(petArr);

const findIndex = (petId) => {
  for (let i = 0; i < petArr.length; i++) {
    if (petArr[i].id == petId) return i;
  }
  return -1;
};

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

// Avtive sidebar
sidebar.addEventListener("click", function () {
  navActive.classList.toggle("active");
});

//Show breed theo type
const showBreed = function (type) {
  if (type === "Dog") {
    return renderBreed(breedArr.filter((el) => el.type === type));
  } else if (type === "Cat") {
    renderBreed(breedArr.filter((el) => el.type === type));
  } else {
    renderBreed(breedArr);
  }
};

// Ham edit tai onclick
const startEditPet = function (petId) {
  inputForm.classList.remove("hide");
  let i = findIndex(petId);

  idInput.value = petId;
  nameInput.value = petArr[i].name;
  ageInput.value = petArr[i].age;
  typeInput.value = petArr[i].type;
  showBreed(typeInput.value);
  weightInput.value = petArr[i].weight;
  lengthInput.value = petArr[i].length;
  colorInput.value = petArr[i].color;
  breedInput.value = petArr[i].breed;
  vaccinatedInput.checked = petArr[i].vaccinated;
  dewormedInput.checked = petArr[i].dewormed;
  sterilizedInput.checked = petArr[i].sterilized;

  // Xoa du lieu edit ra khoi mang khi nhap edit
  petArr.splice(i, 1);

  typeInput.addEventListener("change", function () {
    breedInput.innerHTML = "<option>Select Breed</option>";
    showBreed(typeInput.value);
  });
};

// Validate data
const validateNewDataPet = () => {
  if (nameInput.value == "") {
    alert("Please input name");
    nameInput.focus();
  } else if (
    ageInput.value < 1 ||
    isNaN(ageInput.value) == true ||
    ageInput.value > 15
  ) {
    alert("Age must be between 1 and 15!");
    ageInput.focus();
  } else if (typeInput.value === "Select Type") {
    alert("Please select Type!");
    typeInput.focus();
  } else if (
    weightInput.value < 1 ||
    isNaN(weightInput.value) == true ||
    weightInput.value > 15
  ) {
    alert("Weight must be between 1 and 15!");
    weightInput.focus();
  } else if (
    lengthInput.value < 1 ||
    isNaN(lengthInput.value) == true ||
    lengthInput.value > 100
  ) {
    alert("length must be between 1 and 100!");
    lengthInput.focus();
  } else if (breedInput.value === "Select Breed") {
    alert("Please select Breed!");
    breedInput.focus();
  } else {
    return true;
  }
};

btnSubmit.addEventListener("click", function () {
  if (validateNewDataPet()) {
    petArr.push({
      id: idInput.value,
      name: nameInput.value,
      age: parseInt(ageInput.value),
      type: typeInput.value,
      weight: parseInt(weightInput.value),
      length: parseInt(lengthInput.value),
      color: colorInput.value,
      breed: breedInput.value,
      vaccinated: vaccinatedInput.checked,
      dewormed: dewormedInput.checked,
      sterilized: sterilizedInput.checked,
      date: new Date(),
    });
    inputForm.classList.add("hide");
    //Save to storage
    saveToStorage("key", JSON.stringify(petArr));
    renderTableData(petArr);
  }
});
