const categories = ['general', 'film', 'music', 'books', 'geography', 'history', 'science', 'sport', 'video', 'random'];

let chosenCategory;

export function getPlayerName() {
    const playerNameInput = document.getElementById("playerName");
    const playerName = playerNameInput.value;
  
    if (playerName) {
      document.getElementById("pName").textContent = playerName;
      const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
      modal.show();
    } else {
      playerNameInput.reportValidity();
    }
  }

function getCategory () {
    chosenCategory = document.getElementById(`category${categories[0]}`).addEventListener("click");
}

getCategory();

console.log(categories)
console.log(`category${categories[0]}`)


export { chosenCategory };

