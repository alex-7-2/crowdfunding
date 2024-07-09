const backProject = document.getElementById("supportProject");
const bookmarkButton = document.getElementById("bookmarkButton");
const bookmarkText = document.querySelector("#bookmarkButton p");
const modalBackground = document.getElementById("modalBackground");
const selectionModal = document.getElementById("selectionModal");
const closeModal = document.getElementById("closeModal");
const body = document.querySelector("body");
const selectButtons = document.querySelectorAll(".select-reward button");

bookmarkButton.addEventListener("click", (e) => {
  bookmarkButton.classList.toggle("active");
  if (bookmarkButton.classList.contains("active")) {
    setTimeout(() => {
      bookmarkText.innerHTML = "Bookmarked";
    }, 200);
  } else {
    setTimeout(() => {
      bookmarkText.innerHTML = "Bookmark";
    }, 100);
  }
});

const toggleModal = () => {
  modalBackground.classList.toggle("active");
  selectionModal.classList.toggle("active");

  if (modalBackground.classList.contains("active")) {
    body.style.overflow = "hidden";
  } else {
    body.style.overflow = "auto";
  }
};

backProject.addEventListener("click", toggleModal);
modalBackground.addEventListener("click", toggleModal);
closeModal.addEventListener("click", toggleModal);

selectButtons.forEach((button) =>
  button.addEventListener("click", toggleModal)
);
