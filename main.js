// Our Skills
let skillsSction = document.querySelector(".our-skills");
let skillSpans = document.querySelectorAll(".skills-bar span");

window.onscroll = function () {
  if (window.scrollY >= skillsSction.offsetTop) {
    skillSpans.forEach((span) => {
      span.style.width = span.dataset.width;
    });
  }
};

// Start ourskills number animat

let statSec = document.querySelector(".stats");
let nums = document.querySelectorAll("span.records-count");
let started = false;

window.onscroll = function () {
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
