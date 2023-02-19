"use strict";

//Khai bao bien dau vao
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
const tableBodyEl = document.getElementById("tbody");

const sidebar = document.getElementById("sidebar");
const navActive = document.querySelector(".active");

const btnSubmit = document.getElementById("submit-btn");
const btnHealthy = document.getElementById("healthy-btn");
const btnBmi = document.getElementById("bmi-btn");

// Khai bao petArr lay tu kho du lieu
const petArr = JSON.parse(getFromStorage("key"))
  ? JSON.parse(getFromStorage("key"))
  : [];

const breedArr = JSON.parse(getFromStorage("bm"))
  ? JSON.parse(getFromStorage("bm"))
  : [];
console.log(petArr);
console.log(breedArr);

let healthyCheck;

//Add Data in table
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
    <td><button class="btn btn-danger" onclick="deletePet('${petId}')">Delete</button></td>
    `;
    tableBodyEl.appendChild(row);
  });
};
renderTableData(petArr);
// Check validate
const validate = function (data) {
  for (let i = 0; i < petArr.length; i++) {
    if (data.id === petArr[i].id) {
      alert("ID must be unique!");
      idInput.focus();
      return false;
    }
  }
  if (data.id == "") {
    alert("Please input ID");
    idInput.focus();
  } else if (data.name == "") {
    alert("Please input name");
    nameInput.focus();
  } else if (data.age < 1 || isNaN(data.age) == true || data.age > 15) {
    alert("Age must be between 1 and 15!");
    ageInput.focus();
  } else if (data.type === "Select Type") {
    alert("Please select Type!");
    typeInput.focus();
  } else if (
    data.weight < 1 ||
    isNaN(data.weight) == true ||
    data.weight > 15
  ) {
    alert("Weight must be between 1 and 15!");
    weightInput.focus();
  } else if (
    data.length < 1 ||
    isNaN(data.length) == true ||
    data.length > 100
  ) {
    alert("length must be between 1 and 100!");
    lengthInput.focus();
  } else if (data.breed === "Select Breed") {
    alert("Please select Breed!");
    breedInput.focus();
  } else {
    return true;
  }
};

// Clear Input
const clearInput = function () {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select Type";
  weightInput.value = "";
  lengthInput.value = "";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
};

//Event click Submit
btnSubmit.addEventListener("click", function () {
  const data = {
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
  };

  if (validate(data)) {
    petArr.push(data);
    clearInput();
    //Save to storeage
    saveToStorage("key", JSON.stringify(petArr));
    renderTableData(petArr);
    healthyCheck = false;
    btnHealthy.textContent = "Show Healthy Pet";
  }
});

// ham tra ve vi tri pet
const myFindIndex = (petId) => {
  for (let i = 0; i < petArr.length; i++) {
    if (petArr[i].id === petId) return i;
  }
  return -1;
};
// xoa du lieu pet
const deletePet = (petId) => {
  // Confirm before deletePet
  if (confirm("Are you sure?")) {
    petArr.splice(myFindIndex(petId), 1);
    tableBodyEl.innerHTML = "";
    saveToStorage("key", JSON.stringify(petArr));
    renderTableData(petArr);
  }
};

// Check button
healthyCheck = false;
//2. tạo sự kiện click Show Healthy pet
btnHealthy.addEventListener("click", function () {
  const healthyPetArr = petArr.filter(
    (el) =>
      el.vaccinated === true && el.dewormed === true && el.sterilized === true
  );

  if (!healthyCheck) {
    //3. chạy lại render
    btnHealthy.textContent = "Show All Pet";
    renderTableData(healthyPetArr);
  } else {
    btnHealthy.textContent = "Show Healthy Pet";
    renderTableData(petArr);
  }
  healthyCheck = !healthyCheck;
});

// Event click Sidebar
sidebar.addEventListener("click", function () {
  navActive.classList.toggle("active");
});

// Option breed
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
