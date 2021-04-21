//scrolls
new fullpage("#fullpage", {
  autoScrolling: true,
  // navigation: true,
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
