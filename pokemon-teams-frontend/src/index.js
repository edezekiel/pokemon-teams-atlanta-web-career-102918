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
  const card = renderTrainer(trainer)
  card.appendChild(renderAddButton(trainer))
  card.appendChild(renderPokemons(trainer))
  document.querySelector('main').appendChild(card)
}

function renderTrainer(trainer){
  const div = document.createElement('div')
  div.className = "card"
  div.dataset.id = trainer.id
  const p = document.createElement('p')
  p.innerHTML = trainer.name
  div.appendChild(p)
  return div
}

function renderAddButton(trainer){
  const button = document.createElement('button')
  button.dataset.trainerId = trainer.id
  button.innerHTML = "Add Pokemon"
  button.addEventListener('click', addPokemon)
  return button
}

function addPokemon(event) {
  postPokemon(event)
  .then(console.log)
}

function postPokemon(event) {
  const id = parseInt(event.target.dataset.trainerId)
  const options = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({trainer_id: id})
  }
  return fetch(POKEMONS_URL, options)
  .then(res => res.json())
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
  li.innerHTML = `${pokemon.nickname} (${pokemon.species})`

  li.appendChild(renderReleaseButton(pokemon))
  return li
}

function renderReleaseButton(pokemon) {
  const releaseButton = document.createElement('button')
  releaseButton.className = "release"
  releaseButton.innerHTML = "release"
  releaseButton.dataset.pokemonId = pokemon.id
  releaseButton.addEventListener('click', releasePokemon)
  return releaseButton
}

function releasePokemon(event) {
    const released = event.target.parentNode
    released.parentNode.removeChild(released)
    deletePokemon(event)
}


function deletePokemon(event) {
  const id = parseInt(event.target.dataset.pokemonId)
  const options = {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({pokemon_id: id})
  }
  fetch(`${POKEMONS_URL}/${id}`, options)
}
