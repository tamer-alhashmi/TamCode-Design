// New Slider
let sliderImage = Array.from(
  document.querySelectorAll(".sliderZone .sliderOne")
);

let sliderTitle = Array.from(
  document.querySelectorAll(".sliderZone .newSlidTitle h2")
);

let maskBg = Array.from(document.querySelectorAll(".maskRay .mask"));
function maskBgLoop() {
  for (let i = 0; i < maskBg.length; i++) {}
}
let credit = document.getElementById("credit");
let sliderMenuLi = Array.from(document.querySelectorAll(".sliderMenu ul li"));

// console.log(sliderImage);
// console.log(sliderTitle);
console.log(maskBg);
// console.log(credit);
// console.log(sliderMenuLi);

sliderCount = sliderImage.length;
currentSlide = 1;
checkFunction();

// check Function
function checkFunction() {
  setInterval(() => {
    removeAllActive();

    sliderImage[currentSlide - 1].classList.add("active");
    sliderTitle[currentSlide - 1].classList.add("active");
    sliderMenuLi[currentSlide - 1].classList.add("active");
    maskBg[currentSlide - 1].classList.add("active");
    // mask.style.cssText =
    //   "border-image: url(../photo/landingSlider/agriculture-iot-with-rice-field-background.jpg) 25 25;";

    currentSlide++;
    if (currentSlide > 4) {
      currentSlide = 1;
    }
  }, 6000);
}

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
