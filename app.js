const backProject = document.getElementById("supportProject");
const bookmarkButton = document.getElementById("bookmarkButton");
const bookmarkText = document.querySelector("#bookmarkButton p");
const statsSection = document.getElementById("stats");
const statsText = document.querySelector(".stats-text-content");
const totalAmount = document.querySelector("#totalBacked span");
const totalPledges = document.getElementById("totalPledges");
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

let pledge = null;

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

  const currentRadio = document.querySelector(".option.active .option-title input");
  currentRadio.checked = false;

  setTimeout(() => {
    pledgeOptions.forEach((option) => option.classList.remove("active"));
    clearOptions();
  }, 500);
};

modalBackground.addEventListener("click", closeModalOverlay);
closeModal.addEventListener("click", closeModalOverlay);


/* Manage Options State */

const clearOptions = () => {
  errorMsgs.forEach((msg) => msg.classList.remove("active"));
  pledgeWrappers.forEach((wrapper) => wrapper.classList.remove("error"));
  pledgeInputs.forEach((input) => (input.value = ""));
  pledge = null;
};

const selectOption = (radio) => {
  const currentOption = radio.parentNode.parentNode;
  currentOption.classList.add("active");

  setTimeout(() => currentOption.scrollIntoView({ behavior: "smooth" }), 500);
};


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


/* Validate Pledge, Update Stock, Confirm Pledge and Update Stats */

pledgeInputs.forEach((input) => {
  input.addEventListener("change", (e) => {
    pledge = parseInt(e.target.value);
  });
});

submitButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    validatePledge(button);
  });
});

/* Update Stock */

function updateStock(stockName, currentReward, currentOption, rewardButton) {
  if (stockName !== "noReward") {
    const stockDesktop = document.querySelectorAll(`#${stockName}Stock span`);
    const stockMobile = document.querySelectorAll(`#${stockName}StockMobile span`);

    stockMobile.forEach((el) => {
      el.innerHTML = parseInt(el.innerHTML) - 1;
    });

    stockDesktop.forEach((el) => {
      el.innerHTML = parseInt(el.innerHTML) - 1;

      if (el.innerHTML === "0") {
        currentReward.classList.add("inactive");
        currentOption.classList.add("inactive");
        rewardButton.innerHTML = "Out of Stock";
      }
    });
  }
}

/* Validate Pledge */

function validatePledge(button) {
  const currentInputId = button.getAttribute("data-id");
  const currentInput = document.getElementById(currentInputId);
  const minPledge = parseInt(currentInput.getAttribute("min"));
  const errorMsg = document.querySelector(`div[data-id="${currentInputId}"]`);
  const stockName = button.getAttribute("data-name");
  const currentReward = document.getElementById(stockName);
  const rewardButton = document.querySelector(`[data-id="${stockName}Reward"]`);
  const currentOption = document.querySelector(".option.active");

  if (!pledge || pledge < minPledge) {
    errorMsg.classList.add("active");
    currentInput.parentNode.classList.add("error");
    return;
  }

  setTimeout(() => {
    selectionModal.classList.remove("active");
    selectionModal.classList.add("inactive");
    modalBackground.classList.add("inactive");

    setTimeout(() => {
      successModal.classList.add("active");
      updateStock(stockName, currentReward, currentOption, rewardButton);
    }, 500);
  }, 500);
}

/* Update Stats */

function updateStats(pledge) {
  let amountStr = totalAmount.innerHTML.replace(",", "");
  let amountNum = parseInt(amountStr);

  let newTotal = (amountNum + pledge).toString();
  let endChars = newTotal.slice(-3);
  let startChars = newTotal.slice(0, -3);
  totalAmount.innerHTML = startChars.concat(",", endChars);

  let pledgesStr = totalPledges.innerHTML.replace(",", "");
  let pledgesNum = parseInt(pledgesStr);

  let newPledgesTotal = (pledgesNum + 1).toString();
  let endPlgChars = newPledgesTotal.slice(-3);
  let startPlgChars = newPledgesTotal.slice(0, -3);
  totalPledges.innerHTML = startPlgChars.concat(",", endPlgChars);

  let meterWidth = parseInt(newTotal) / 1000;
  console.log(meterWidth);

  setTimeout(() => {
    statsText.classList.remove("inactive");
    statsMeter.classList.add("start");

    if (meterWidth < 100) {
      statsMeter.style.width = `${meterWidth}%`;
    } else {
      statsMeter.style.width = "100%";
    }
  }, 500);
}

/* Confirm Pledge */

successButton.addEventListener("click", () => {
  successModal.classList.remove("active");
  modalBackground.classList.remove("active");
  statsText.classList.add("inactive");
  statsMeter.style.width = 0;
  statsMeter.classList.remove("start");

  setTimeout(() => {
    statsSection.scrollIntoView({ block: "center", behavior: "smooth" });
    closeModalOverlay();
    updateStats(pledge);
  }, 500);
});
