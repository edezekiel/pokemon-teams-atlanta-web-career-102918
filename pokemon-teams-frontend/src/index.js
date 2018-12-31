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
  const card = createTrainer(trainer)

  card.appendChild(createAddPokemonButton(trainer))

  card.appendChild(renderPokemons(trainer))

  document.querySelector('main').appendChild(card)
}

function createTrainer(trainer){
  const div = document.createElement('div')
  div.className = "card"
  div.dataset.id = trainer.id
  const p = document.createElement('p')
  p.innerHTML = trainer.name
  div.appendChild(p)
  return div
}

function createAddPokemonButton(trainer){
  const button = document.createElement('button')
  button.dataset.trainerId = trainer.id
  button.innerHTML = "Add Pokemon"
  return button
}

function renderPokemons(trainer) {
  const ul = document.createElement('ul')
  trainer.pokemons.forEach(function(pokemon){
    ul.appendChild(renderPokemon(trainer, pokemon))
  })
  return ul
}

function renderPokemon(trainer, pokemon) {
  const li = document.createElement('li')
  li.innerHTML = pokemon.nickname

  li.appendChild(createReleaseButton(pokemon))
  return li
}

function createReleaseButton(pokemon) {
  const pokeButton = document.createElement('button')
  pokeButton.className = "release"
  pokeButton.innerHTML = "release"
  pokeButton.dataset.pokemonId = pokemon.id
  return pokeButton
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
