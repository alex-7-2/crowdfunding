// const selectionModal = document.getElementById("selectionModal");
const backProject = document.getElementById("supportProject");
const bookmarkButton = document.getElementById("bookmarkButton");
const bookmarkText = document.querySelector("#bookmarkButton p");

// const toggleModal = () => selectionModal.classList.toggle("active");

// backProject.addEventListener("click", toggleModal);
// selectionModal.addEventListener("click", toggleModal);

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
