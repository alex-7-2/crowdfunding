const backProject = document.getElementById("supportProject");
const bookmarkButton = document.getElementById("bookmarkButton");
const bookmarkText = document.querySelector("#bookmarkButton p");
const statsSection = document.getElementById("stats");
const statsMeter = document.getElementById("statsMeter");
const selectButtons = document.querySelectorAll(".select-reward button");
const modalBackground = document.getElementById("modalBackground");
const selectionModal = document.getElementById("selectionModal");
const closeModal = document.getElementById("closeModal");
const radioButtons = document.querySelectorAll("input[name='option']");
const pledgeOptions = document.querySelectorAll(".option");
const pledgeInputs = document.querySelectorAll("input[type='number']");
const submitButtons = document.querySelectorAll(".pledge button");
const pledgeWrappers = document.querySelectorAll(".pledge div");
const errorMsgs = document.querySelectorAll(".invalid-pledge");
const successModal = document.getElementById("successModal");
const successButton = document.getElementById("successBtn");


document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
  }
});

/* Start Meter (display fundraising progress) */

const displayMeter = () => statsMeter.classList.add("start");
window.onload = displayMeter;

/* Manage Modal State */

const openModalOverlay = () => {
  modalBackground.classList.add("active");
  selectionModal.classList.add("active");

  selectionModal.scrollTo(0, 0);
  radioButtons.forEach((radio) => {
    radio.addEventListener("change", () => {
      pledgeOptions.forEach((option) => option.classList.remove("active"));
      setTimeout(() => {
        clearOptions();
      }, 100);
      selectOption(radio);
    });
  });
};

const closeModalOverlay = () => {
  modalBackground.classList.remove("active");
  selectionModal.classList.remove("active");
  modalBackground.classList.remove("inactive");
  selectionModal.classList.remove("inactive");

  const currentRadio = document.querySelector(
    ".option.active .option-title input"
  );
  currentRadio.checked = null;

  setTimeout(() => {
    pledgeOptions.forEach((option) => option.classList.remove("active"));
    statsMeter.classList.add("start");
    clearOptions();
  }, 500);
};

modalBackground.addEventListener("click", closeModalOverlay);
closeModal.addEventListener("click", closeModalOverlay);

/* Manage Options State */

const clearOptions = () => {
  // pledgeOptions.forEach((option) => option.classList.remove("active"));
  pledge = null;
  errorMsgs.forEach((msg) => msg.classList.remove("active"));
  pledgeWrappers.forEach((wrapper) => wrapper.classList.remove("error"));
  pledgeInputs.forEach((input) => (input.value = ""));
};

function selectOption(radio) {
  const currentOption = radio.parentNode.parentNode;
  currentOption.classList.add("active");

  setTimeout(() => {
    currentOption.scrollIntoView({
      behavior: "smooth",
    });
  }, 500);
}

/* Select Reward */

selectButtons.forEach((button) => {
  button.addEventListener("click", () => {
    openModalOverlay();
    const forAttr = button.getAttribute("data-id");
    const label = document.querySelector(`label[for=${forAttr}]`);
    label.click();
  });
});

/* Support Project/Bookmark Page */

backProject.addEventListener("click", openModalOverlay);

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

/* Update Stock */

function updateStock(currentName) {
  console.log(`This is currentName: ${currentName}`);
  if (currentName !== "noReward") {
    const currentStock = document.querySelectorAll(`#${currentName}Stock span`);
    currentStock.forEach((el) => {
      el.innerHTML = parseInt(el.innerHTML) - 1;
    });
  }
}

/* Confirm Pledge */

let pledge = null;

pledgeInputs.forEach((input) => {
  // input.addEventListener("keydown", (e) => {
  //   if (e.key === "Enter") {
  //     e.preventDefault();
  //   }
  // });
  input.addEventListener("change", (e) => {
    pledge = parseInt(e.target.value);
    console.log(`Pledge in input: ${pledge}`);
  });
});

submitButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    confirmPledge(button);
  });
});

function confirmPledge(button) {
  const currentId = button.getAttribute("data-id");
  const currentName = button.getAttribute("data-name");
  const currentInput = document.getElementById(currentId);
  const minPledge = parseInt(currentInput.getAttribute("min"));
  const errorMsg = document.querySelector(`div[data-id="${currentId}"]`);

  // console.log(`Pledge in confirmation: ${pledge}`);
  console.log(`This is currentOption: ${currentName}`);

  if (!pledge || pledge < minPledge) {
    errorMsg.classList.add("active");
    currentInput.parentNode.classList.add("error");
    return;
  }

  selectionModal.classList.remove("active");
  selectionModal.classList.add("inactive");
  modalBackground.classList.add("inactive");
  console.log(`This is currentOption2: ${currentName}`);
  updateStock(currentName);

  successModal.classList.add("active");
  successButton.addEventListener("click", () => {
    successModal.classList.remove("active");
    statsMeter.classList.remove("start");
    statsSection.scrollIntoView({ block: "center" });
    closeModalOverlay();
  });
}
