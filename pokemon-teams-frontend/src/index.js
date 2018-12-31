const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", initPage)

function initPage(event) {
  renderTrainers()
}

function getTrainers() {
  return fetch(TRAINERS_URL)
  .then(res => res.json())
}

function renderTrainers() {
  getTrainers()
  .then(function(trainers){
    trainers.forEach(function(trainer){
      renderTrainer(trainer)
    })
  })
}

function renderTrainer(trainer){
  console.log(trainer.pokemons)
}
