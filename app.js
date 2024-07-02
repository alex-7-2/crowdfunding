const mobileLayout = document.getElementById("mobileLayoutMode");
const mobileNav = document.getElementById("mobileNav");
const toggleButtons = document.querySelectorAll(".toggle");

const toggleNav = () => {
  mobileNav.classList.toggle("active");
  mobileLayout.classList.toggle("active");
  toggleButtons.forEach((button) => button.classList.toggle("active"));
};

toggleButtons.forEach((button) => button.addEventListener("click", toggleNav));

mobileLayout.addEventListener("click", () => {
  if (mobileNav.style.maxHeight !== 0) {
    toggleNav();
  } 
});


