
window.addEventListener ("scroll", function() {
  // let scroLled = window.scrollY;
  let header = document.querySelector(".header");
  header.classList.toggle("sticky", window.scrollY > 0)

  }
)


// Our Skills animat
let skillsSction = document.querySelector(".our-skills");
let skillSpans = document.querySelectorAll(".skills-bar span");

let statSec = document.querySelector(".stats");
let nums = document.querySelectorAll("span.records-count");
let started = false;

window.onscroll = function () {
  // Skills section animate width
  if (window.scrollY >= skillsSction.offsetTop - 200) {
    skillSpans.forEach((span) => {
      span.style.width = span.dataset.width;
    });
  }
  // Start ourskills number animat
  if (window.scrollY >= statSec.offsetTop) {
    if (!started) {
      nums.forEach((num) => startCount(num));
    }
    started = true;
  }
};

function startCount(el) {
  let goal = el.dataset.goal;
  let count = setInterval(() => {
    el.textContent++;
    if (el.textContent == goal) {
      clearInterval(count);
    }
  }, 2000 / goal);
}

// Event Section Animation

let countDownDate = new Date("Nov 21, 2023 23:59:59").getTime();
// console.log(countDownDate);
let counter = setInterval(() => {
  // Get date now
  let dateNow = new Date().getTime();
  //Find the diffrance between our countDowDate and Date Now
  let dateDiff = countDownDate - dateNow;
  // Get time units & Using Math.floor to return Inmteger value
  let days = Math.floor(dateDiff / (1000 * 60 * 60 * 24));
  let hours = Math.floor((dateDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((dateDiff % (1000 * 60 * 60)) / (1000 * 60));
  let secondes = Math.floor((dateDiff % (1000 * 60)) / 1000);

  document.querySelector(".days").innerHTML = days < 10 ? `0${days}` : days;

  document.querySelector(".hours").innerHTML = hours < 10 ? `0${hours}` : hours;

  document.querySelector(".minutes").innerHTML =
    minutes < 10 ? `0${minutes}` : minutes;

  document.querySelector(".secondes").innerHTML =
    secondes < 10 ? `0${secondes}` : secondes;
}, 1000);
