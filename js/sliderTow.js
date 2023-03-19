// New Slider
let sliderImage = Array.from(
  document.querySelectorAll(".sliderZone .sliderOne")
);
let sliderCount = sliderImage.length;

let sliderTitle = Array.from(
  document.querySelectorAll(".sliderZone .newSlidTitle")
);

let maskBg = Array.from(document.querySelectorAll(".maskRay .mask"));

let credit = document.getElementById("credit");

let sliderMenuLi = Array.from(document.querySelectorAll(".sliderMenu ul li"));

let lesIstem = document.querySelectorAll(".sliderMenu ul li");

currentSlide = 1;

checkFunction();
// firstLoad();

for (let i = 1; i <= sliderImage.length; i++) {
  sliderMenuLi.forEach(function (lis) {
    lis.setAttribute("data-count", i++);
  });
}

// First Load
document.addEventListener("DOMContentLoaded", () => {
  sliderImage[currentSlide + 2].classList.add("active");
  sliderTitle[currentSlide + 2].classList.add("active");
  sliderMenuLi[currentSlide + 2].classList.add("active");
  maskBg[currentSlide + 2].classList.add("active");
});

// check Function

// function checkFunction() {
//   setInterval(() => {
//     removeAllActive();
//     sliderImage[currentSlide - 1].classList.add("active");
//     sliderTitle[currentSlide - 1].classList.add("active");
//     sliderMenuLi[currentSlide - 1].classList.add("active");
//     maskBg[currentSlide - 1].classList.add("active");
//     listChick();

//     currentSlide++;
//     if (currentSlide > sliderCount) {
//       currentSlide = 1;
//     }
//   }, 5000);
// }

function checkFunction() {
  setInterval(() => {
    removeAllActive();

    sliderImage[currentSlide - 1].classList.add("active");
    sliderTitle[currentSlide - 1].classList.add("active");
    sliderMenuLi[currentSlide - 1].classList.add("active");
    maskBg[currentSlide - 1].classList.add("active");
    listChick();

    currentSlide++;
    if (currentSlide > sliderCount) {
      currentSlide = 1;
    }
  }, 5000);
}

for (let i = 0; i < sliderMenuLi.length; i++) {
  sliderMenuLi[i].onclick = function () {
    currentSlide = parseInt(this.getAttribute("data-count"));
    clearInterval(checkFunction);
  };
}

// List BG Slide
function listChick() {
  sliderMenuLi.forEach(function (lis) {

    if (lis.classList.contains("active")) {
      lis.style.backgroundColor = "#212121";
      lis.style.color = "#ffffff";
    } else {
      lis.style.backgroundColor = "#facc6b";
      lis.style.color = "#212121";
    }
  });
}
// List clicked Function

// Remove All Active Classes from all Elements
function removeAllActive() {
  sliderImage.forEach(function (img) {
    img.classList.remove("active");
  });

  maskBg.forEach(function (msk) {
    msk.classList.remove("active");
  });
  sliderTitle.forEach(function (titl) {
    titl.classList.remove("active");
  });
  sliderMenuLi.forEach(function (lis) {
    lis.classList.remove("active");
  });
}

//   checkFunction();
