// Our Skills
let section = document.querySelector(".our-skills");
let skillSpans = document.querySelectorAll(".skills-bar span");
// skillSpans.forEach.style.transition = "1.6s";
window.onscroll = function () {
  if (window.scrollY >= section.offsetTop) {
    console.log("Reached Section Three");
    skillSpans.forEach((span) => {
      span.style.width = span.dataset.width;
    });
  }
};
