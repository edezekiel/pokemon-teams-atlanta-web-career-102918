const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", initPage)

function initPage(event) {
  renderCards()
}

function getTrainers() {
  return fetch(TRAINERS_URL)
  .then(res => res.json())
}

function renderCards() {
  getTrainers()
  .then(function(trainers){
    trainers.forEach(function(trainer){
      renderCard(trainer)
    })
  })
}

function renderCard(trainer){
  const div = document.createElement('div')
  div.className = "card"
  div.dataset.id = trainer.id

  const p = document.createElement('p')
  p.innerHTML = trainer.name
  div.appendChild(p)

  const button = document.createElement('button')
  button.dataset.id = trainer.id
  button.innerHTML = "Add Pokemon"
  div.appendChild(button)

  const ul = document.createElement('ul')
  

  document.querySelector('main').appendChild(div)

  renderPokemon(trainer)
}

function renderPokemon(trainer) {
  console.log(trainer)
}
//
// <div class="card" data-id="1">
//   <p>Prince</p>
//   <button data-trainer-id="1">Add Pokemon</button>
//   <ul>
//     <li>Jacey (Kakuna) <button class="release" data-pokemon-id="140">Release</button></li>
//     <li>Zachariah (Ditto) <button class="release" data-pokemon-id="141">Release</button></li>
//     <li>Mittie (Farfetch'd) <button class="release" data-pokemon-id="149">Release</button></li>
//     <li>Rosetta (Eevee) <button class="release" data-pokemon-id="150">Release</button></li>
//     <li>Rod (Beedrill) <button class="release" data-pokemon-id="151">Release</button></li>
//   </ul>
// </div>
