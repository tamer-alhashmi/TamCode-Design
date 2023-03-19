//  Start Landing Slider

let sliderImages = Array.from(document.querySelectorAll(".sliderImage"));

let sliderCount = sliderImages.length;

let sliderHeading = Array.from(document.querySelectorAll(".sliderText h2"));
let sliderPara = Array.from(document.querySelectorAll(".sliderText p"));

// Creating ul and li
let paginationelement = document.createElement("ul");
paginationelement.setAttribute("id", "pagination-ul");

for (let i = 1; i <= sliderCount; i++) {
  let paginationItem = document.createElement("li");
  paginationItem.setAttribute("data-index", i);
  // paginationItem.appendChild(document.createTextNode(i));
  paginationelement.appendChild(paginationItem);
}
document.getElementById("indicators").appendChild(paginationelement);
currentSlide = 1;

document.addEventListener("DOMContentLoaded", () => {
  removeAllActive();

  sliderImages[currentSlide + 0].classList.add("active");
  sliderHeading[currentSlide + 0].classList.add("active");
  sliderPara[currentSlide + 0].classList.add("textAnimation");
  paginationCreatedUl.children[currentSlide + 0].classList.add("active");
});

// Array From List
let paginationBullets = Array.from(
  document.querySelectorAll("#pagination-ul li")
);

for (let i = 0; i < paginationBullets.length; i++) {
  paginationBullets[i].onclick = function () {
    currentSlide = parseInt(this.getAttribute("data-index"));
    theChecker();
  };
}
let paginationCreatedUl = document.getElementById("pagination-ul");
theChecker();

// Creating TheChecker
function theChecker() {
  setInterval(() => {
    removeAllActive();

    sliderImages[currentSlide - 1].classList.add("active");
    sliderHeading[currentSlide - 1].classList.add("active");
    sliderPara[currentSlide - 1].classList.add("textAnimation");
    paginationCreatedUl.children[currentSlide - 1].classList.add("active");

    // currentSlide = 1;
    currentSlide++;
    if (currentSlide > sliderCount) {
      currentSlide = 1;
    }
  }, 6000);
}

function removeAllActive() {
  sliderImages.forEach(function (img) {
    img.classList.remove("active");
  });

  paginationBullets.forEach(function (bull) {
    bull.classList.remove("active");
  });

  sliderHeading.forEach(function (hed) {
    hed.classList.remove("active");
  });

  sliderPara.forEach(function (para) {
    para.classList.remove("textAnimation");
  });
}
// theChecker();

//  End Landing Slider

let megaImgDiv = document.querySelector(".mega-Img");
let megaImgPic = document.createElement("img");
megaImgDiv.append(megaImgPic);
megaImgPic.src = "photo/megamenu.png";
megaImgPic.style.cssText = "width: 100%;";

// Start Creating ScrollUp Button
let scrBtn = document.createElement("button");
scrBtn.className = "scroll-Up";

// Scroll button icon
let scrIcon = document.createElement("i");
scrIcon.style.fontSize = "18px";
scrIcon.className = "fa-solid fa-chevron-up";

// Append btn to document
scrBtn.append(scrIcon);
document.body.prepend(scrBtn);

window.addEventListener("scroll", function () {
  let header = document.querySelector(".header");
  header.classList.toggle("sticky", window.scrollY > 0);
});

// Our Skills animat
let skillsSction = document.querySelector(".our-skills");
let skillSpans = document.querySelectorAll(".skills-bar>span");

let statSec = document.querySelector(".stats");
let nums = document.querySelectorAll("span.records-count");
let started = false;

scrBtn.onclick = function () {
  window.scrollTo({
    left: 0,
    top: 0,
    behavior: "smooth",
  });
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

// Event Section Animation Start

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
// Event Section Animation End

// Videos Section
let vidList = document.querySelectorAll(".videos .vid-menu ul li");
let vidZone = document.querySelector(".vid-zone video source");

// List
vidList.forEach(function (li) {
  li.addEventListener("click", (e) => {
    console.log("yes");
  });
});

// scroller
let scroller = document.querySelector(".scroller");
let height =
  document.documentElement.scrollHeight - document.documentElement.clientHeight;

// console.log(scroller);
// console.log(height);

window.addEventListener("scroll", () => {
  let scrollTop = document.documentElement.scrollTop;
  scroller.style.width = `${(scrollTop / height) * 100}%`;
});

// Start TimeLine

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    // console.log(entry);
    if (entry.isIntersecting) {
      entry.target.classList.add("show");

      skillSpans.forEach((span) => {
        span.style.width = span.dataset.width;
      });

      if (window.scrollY >= statSec.offsetTop - 100) {
        if (!started) {
          nums.forEach((num) => startCount(num));
        }
        started = true;
      }

      // Scrollup btn display
      if (window.scrollY >= 600) {
        // console.log(`Scrolling Value Is ${window.scrollY}`);
        scrBtn.style.display = "block";
      } else {
        scrBtn.style.display = "none";
      }
    } else {
      entry.target.classList.remove("show");
    }
  });
});

const hiddenElement = document.querySelectorAll(".hidden");
hiddenElement.forEach((el) => observer.observe(el));

const hiddenRightElement = document.querySelectorAll(".hidden-top");
hiddenRightElement.forEach((el) => observer.observe(el));

// parrallTitlePixl function

const parrallTitle = document.querySelectorAll(".parrallTitle");

// window.addEventListener("scroll", () => {
//   // const sectinoScrollable =
//   //   document.documentElement.scrollHeight - window.innerHeight;
//   const scrollable = document.documentElement.scrollHeight - window.innerHeight;
//   const scrolled = window.scrollY;
//   // console.log(scrolled);
//   // console.log(scrollable);

//   // if (Math.ceil(scrolled) === scrollable) {
//   // }
// });
// End TimeLine

// const statHeight2 = window.scrollY - statSec.scrollHeight;
// const statHeight3 = window.innerHeight - statSec.scrollHeight;
// const statHeight4 =
//   document.documentElement.scrollHeight - statSec.scrollHeight;
// const sectinoScrollable =
//   document.documentElement.scrollHeight - window.innerHeight;

// const offSet = statSec.offsetTop;
// const statHeight = statSec.scrollHeight;
// const totalHeight = offSet + statSec.scrollHeight;

// console.log(offSet);
// console.log(statHeight);
// console.log(totalHeight);
// console.log(statHeight2);
// console.log(statHeight3);
// console.log(statHeight4);
// console.log(sectinoScrollable);

// Start Gameing ***********************************************************
document.querySelector(".control-buttons span").onclick = function () {
  let userName = prompt("What Is Your Name?");
  window.localStorage.setItem("userName", userName);
  if (window.localStorage.getItem(userName)) {
    document.querySelector(".control-buttons").style.display = "none";
  }

  if (userName == null || userName == "") {
    document.querySelector(".info .userName span").innerHTML = "Unknown";
  } else {
    document.querySelector(".info .userName span").innerHTML = userName;
    document.querySelector(".control-buttons").remove();
  }
};

let duration = 1000;

let blocksContainer = document.querySelector(".memory-game-block");
let blocks = Array.from(blocksContainer.children);
let blocksCount = blocks.length;

// let orderRange = [...Array(blocksCount).keys()];// Using "..." Spred Operator to extracting data into Array
// ***** Or
let orderRange = Array.from(Array(blocksCount).keys()); // Using Normal Array.from to extracting data into Array
shuffle(orderRange);

// Add Order Css Property to game blocks
blocks.forEach((block, index) => {
  block.style.order = orderRange[index];

  // Add Click Event
  block.addEventListener("click", function () {
    flipBlock(block);
  });
});

// Flip Block Function
function flipBlock(selectedBlock) {
  // Add class is flipped
  selectedBlock.classList.add("is-flipped");

  // collect all flipped Cards
  let allFlippedBlocks = blocks.filter((flippedBlock) =>
    flippedBlock.classList.contains("is-flipped")
  );

  if (allFlippedBlocks.length === 2) {
    console.log("Tow Flipped Cards Selected");
    // Stop Clicking Function
    stopClicking();

    // Check Matched Block Function
    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}

// Stop Clicking Function
function stopClicking() {
  // Add class no-clicking on main container
  blocksContainer.classList.add("no-clicking");

  setTimeout(() => {
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}

//Check Matched Blocks
function checkMatchedBlocks(firstBlock, secondeBlock) {
  let triesElement = document.querySelector(".tries span");

  if (firstBlock.dataset.type === secondeBlock.dataset.type) {
    firstBlock.classList.remove("is-flipped");
    secondeBlock.classList.remove("is-flipped");

    firstBlock.classList.add("has-mach");
    secondeBlock.classList.add("has-mach");

    document.getElementById("success").play();
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
      secondeBlock.classList.remove("is-flipped");
    }, duration);
    document.getElementById("fail").play();
  }
  // Check Tries Function
}

// Shuffle Function
function shuffle(array) {
  // Setting Vars
  let current = array.length,
    temp,
    random;

  while (current > 0) {
    // Get Random Numbers
    random = Math.floor(Math.random() * current);

    //Decrease Length By One
    current--;

    // [1] Save current elemnt in stash
    temp = array[current];

    // [2] Curent Element = Random Element
    array[current] = array[random];

    // [3] Random Element = Get Element From Stash
    array[random] = temp;
  }
  return array;
}


// **************************** Start  QUIIIIZ.





// **************************** End  QUIIIIZ.