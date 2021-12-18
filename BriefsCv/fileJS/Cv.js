import { programmers } from "./data.js";

let trainees = getFromStorage("users") || saveToStorage(programmers);

function initGridList() {
  let box = document.querySelector("#cv-list");
  box.innerHTML = `<div class="newBox"><a href="#addNew" class="cv_link"><span>+Add new person</span></a></div>`;
  trainees.forEach((cv) => {
    box.innerHTML += `<div class="item"><a href="#page?id=${cv.id}">${cv.firstName} ${cv.lastName}</a></div>`;
  });
}

window.addEventListener("hashchange", function () {
  let cvList = document.querySelector("#cv-list");
  let personalPage = document.querySelector("#cv-body");
  let register = document.querySelector("#register");
  let about = document.querySelector("#about");
  let addNew = document.querySelector("#add-new-member");
  let hash = window.location.hash;
  switch (hash) {
    case "":
    case "#home":
      cvList.classList.add("hidden");
      personalPage.classList.add("hidden");
      register.classList.add("hidden");
      about.classList.add("hidden");
      addNew.classList.add("hidden");
      break;
    case "#cvPage":
      initGridList();
      cvList.classList.remove("hidden");
      personalPage.classList.add("hidden");
      register.classList.add("hidden");
      about.classList.add("hidden");
      addNew.classList.add("hidden");
      break;
    case "#about":
      cvList.classList.add("hidden");
      personalPage.classList.add("hidden");
      register.classList.add("hidden");
      about.classList.remove("hidden");
      addNew.classList.add("hidden");
      break;
    case "#register":
      cvList.classList.add("hidden");
      personalPage.classList.add("hidden");
      register.classList.remove("hidden");
      about.classList.add("hidden");
      addNew.classList.add("hidden");
      break;
    case "#addNew":
      cvList.classList.add("hidden");
      personalPage.classList.add("hidden");
      register.classList.add("hidden");
      about.classList.add("hidden");
      addNew.classList.remove("hidden");
      break;
    default:
      if (hash.includes("id=")) {
        cvList.classList.add("hidden");
        personalPage.classList.remove("hidden");
        register.classList.add("hidden");
        about.classList.add("hidden");
        addNew.classList.add("hidden");

        //shows personalData using hash-id
        showPersonalData(getUserById(hash.split("=")[1]));
      } else {
        window.location.hash = "#home";
      }

      break;
  }
});
function getUserById(id) {
  const personObj = trainees.find(function (person) {
    return person.id == id;
  });
  return personObj;
}

document
  .querySelector("#submit-button")
  .addEventListener("click", function (event) {
    event.preventDefault();

    let id = "id=" + new Date().valueOf();
    let newUserCV = {
      imagePath: "../poto/icon-17.jpg",
      id: "id=" + new Date().valueOf(),
    };
    let formElements = document.querySelector(".new-member").elements;

    for (let index = 0; index < formElements.length; index++) {
      newUserCV[formElements[index].name] = formElements[index].value;
    }

    trainees.push(newUserCV);
    saveToStorage(trainees);
    window.location.hash = "#cvPage";
  });

function showPersonalData(programmer) {
  console.log("personalData===", programmer);
  document.querySelector(".secondPageName").innerHTML =
    programmer.firstName + " " + programmer.lastName;
  document.querySelector(".phone").innerHTML = "phone: " + programmer.phone;
  document.querySelector(".email").innerHTML = "email: " + programmer.email;
  document.querySelector(".infoHeader").innerHTML =
    "education: " + programmer.education;
  document.querySelector(".infoWork").innerHTML =
    "workExperience: " + programmer.workExperience;
  document.querySelector(".trainings").innerHTML =
    "trainings: " + programmer.trainings;
}
function saveToStorage(data) {
  let stringifiedData = JSON.stringify(data);
  window.localStorage.setItem("users", stringifiedData);
  return data;
}
function getFromStorage(key) {
  let dataFromStorage = window.localStorage.getItem(key);
  if (dataFromStorage) {
    return JSON.parse(dataFromStorage);
  }
  return false;
}
