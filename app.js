//scrolls
new fullpage("#fullpage", {
  autoScrolling: true,
  continuousVertical: true,
});

//NAVBAR PĀRLEKŠANA
const sections = document.querySelectorAll("section");
const bubble = document.querySelector(".bubble");
const gradients = [
  "linear-gradient(to right, #8a8a8a, #383838)",
  // "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
  // "linear-gradient(to right, #f12711, #f5af19)",
];

const options = {
  threshold: 0.7,
};

let observer = new IntersectionObserver(navCheck, options);

function navCheck(entries) {
  entries.forEach((entry) => {
    const id = entry.target.id;
    const activeAnchor = document.querySelector(`[data-page=${id}]`);
    const gradientIndex = entry.target.getAttribute("data-index");
    const coords = activeAnchor.getBoundingClientRect();
    const directions = {
      height: coords.height,
      width: coords.width,
      top: coords.top,
      left: coords.left,
    };
    if (entry.isIntersecting) {
      bubble.style.setProperty("left", `${directions.left}px`);
      bubble.style.setProperty("bottom", `${directions.top - 3}px`);
      bubble.style.setProperty("width", `${directions.width}px`);
      bubble.style.setProperty("height", `${directions.height - 23}px`);
      bubble.style.background = gradients[gradientIndex];
    }
  });
}

sections.forEach((section) => {
  observer.observe(section);
});

//PAKALPOJUMU TABS
let btns = document.querySelectorAll(".tab-btn");
let services = document.querySelector(".services");
let articles = document.querySelectorAll(".content");

services.addEventListener("click", function (e) {
  console.log(e.target.dataset.id);
  let id = e.target.dataset.id;
  if (id) {
    //remove active from other buttons
    btns.forEach(function (btn) {
      btn.classList.remove("active");
      //add active to clicked button
      e.target.classList.add("active");
    });
    //hide other articles
    articles.forEach(function (article) {
      article.classList.remove("active");
    });
    let element = document.getElementById(id);
    element.classList.add("active");
  }
});

// Initialize and add the map
function initMap() {
  // The location of Uluru
  const uluru = { lat: 56.92216238814079, lng: 24.216073922245258 };
  // The map, centered at Uluru
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 14,
    center: uluru,
  });
  // The marker, positioned at Uluru
  const marker = new google.maps.Marker({
    position: uluru,
    map: map,
  });
}

// SHOW MENU
// izveidota funkcija "showMenu"
// funkcijai ir divi parametri => "toggleId" un "navId"
// abi šie parametri tiek meklēti html failā pēc id
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);
  // ja abi šie elementi pēc id tiek atrasti, tad
  // "toggle" elementam tiek pievienota klausīšanās funkcija uz "click"
  //teorija - Toggles between a class name for an element.
  // The first parameter removes the specified class from an element, and returns false.
  // If the class does not exist, it is added to the element, and the return value is true.
  // ja tiek izsaukta "toggle" elementa funkcija, tad "nav" elementam tiek pievienota klase "show"
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("show-menu");
    });
  }
};
//"showMenu" funkcija ar norādītām vērtībām
showMenu("nav-toggle", "nav-menu");

// REMOVE MENU MOBILE
// elementi ar klasi "nav__link" zem viena parametra "navLink"
const navLink = document.querySelectorAll(".nav__link");
//funkcija "linkAction" kurā tiek sameklēts elements pēc ID "nav-menu"
// un noņemta tam klase "show-menu"
function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.remove("show-menu");
}
//katrama navLink elementam tiek piešķirta funkcija "linkAction"
//kura tiek izpildīta ja tiek uzklikšķināts uz šī elementa
navLink.forEach((n) => n.addEventListener("click", linkAction));
