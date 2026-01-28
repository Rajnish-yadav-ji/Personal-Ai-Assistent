
const nameModal = document.getElementById("nameModal");
const botSection = document.getElementById("botSection");
const usernameInput = document.getElementById("usernameInput");
const continueBtn = document.getElementById("continueBtn");
const botCards = document.querySelectorAll(".bot-card");

const savedName = localStorage.getItem("username");

if (savedName) {
  nameModal.classList.add("hidden");
  botSection.classList.remove("hidden");
}


continueBtn.addEventListener("click", () => {
  const name = usernameInput.value.trim();

  if (!name) {
    alert("Please enter your name");
    return;
  }

  localStorage.setItem("username", name);

  nameModal.classList.add("hidden");
  botSection.classList.remove("hidden");
});

botCards.forEach(card => {
  card.addEventListener("click", () => {
    const selectedBot = card.dataset.bot;

    localStorage.setItem("selectedBot", selectedBot);

    if (selectedBot === "rajni") {
      window.location.href = "rajni.html";
    }
    else if (selectedBot === "chitti") {
      window.location.href = "chitti.html";
    }
  });
});
