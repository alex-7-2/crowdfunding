const navBackground = document.getElementById("mobileNavBackground");
const mobileNav = document.getElementById("mobileNav");
const toggleButtons = document.querySelectorAll(".toggle");

/* Mobile Nav */

const toggleNav = () => {
  mobileNav.classList.toggle("active");
  navBackground.classList.toggle("active");
  toggleButtons.forEach((button) => button.classList.toggle("active"));
};

toggleButtons.forEach((button) => button.addEventListener("click", toggleNav));

navBackground.addEventListener("click", () => {
  if (mobileNav.style.maxHeight !== 0) {
    toggleNav();
  } 
});
