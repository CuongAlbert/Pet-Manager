"use strict";

const sidebar = document.getElementById("sidebar");
const navActive = document.querySelector(".active");

let petArr = JSON.parse(getFromStorage("key"))
  ? JSON.parse(getFromStorage("key"))
  : [];

let breedArr = JSON.parse(getFromStorage("bm"))
  ? JSON.parse(getFromStorage("bm"))
  : [];

sidebar.addEventListener("click", function () {
  navActive.classList.toggle("active");
});

// Export du lieu
document.getElementById("export-btn").addEventListener("click", function () {
  const blobPet = new Blob([JSON.stringify(petArr)], {
    type: "text/plain;charset=utf-8",
  });
  saveAs(blobPet, "petArr.json");
});
document.getElementById("export-btn").addEventListener("click", function () {
  const blobBreed = new Blob([JSON.stringify(breedArr)], {
    type: "text/plain;charset=utf-8",
  });
  saveAs(blobBreed, "breedArr.json");
});

// Import du lieu
document.getElementById("import-btn").addEventListener("click", function () {
  const file = document.getElementById("input-file").files[0];
  console.log(file);

  if (file) {
    const reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = function (evt) {
      console.log(evt);

      console.log(evt.target.result);
      if (file.name === "petArr.json") {
        petArr = JSON.parse(evt.target.result);
        console.log(petArr);
        saveToStorage("key", JSON.stringify(petArr));
      }
      if (file.name === "breedArr.json") {
        breedArr = JSON.parse(evt.target.result);
        console.log(breedArr);
        saveToStorage("bm", JSON.stringify(breedArr));
      }
    };
  }
});
