const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", initPage)

function initPage(event) {
  getTrainers()
}
function getTrainers(event) {
  fetch(TRAINERS_URL)
  .then(res => res.json())
  .then(console.log)
}
