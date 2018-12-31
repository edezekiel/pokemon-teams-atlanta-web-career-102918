const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", renderCards())

// page initialization

function renderCards() {
  getTrainers()
  .then(trainers => trainers.forEach(trainer => renderCard(trainer)))
}


// SERVER REQUESTS

function getTrainers() {
  return fetch(TRAINERS_URL)
  .then(res => res.json())
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


// DOM RENDERING

function renderCard(trainer){
  const card = renderTrainer(trainer)
  card.append(renderAddButton(trainer), renderPokemons(trainer))
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

function renderPokemons(trainer) {
  const ul = document.createElement('ul')
  trainer.pokemons.forEach(pokemon => ul.appendChild(renderPokemon(pokemon)))
  return ul
}

function renderPokemon(pokemon) {
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


// CRUD ACTIONS

function addPokemon(event) {
  const ul = event.target.nextElementSibling
  // make server request to create pokemon
  postPokemon(event)
  .then(
    function(data){
      // throw error message if party is full
      if (data["error"]) {
        alert(data["error"])
      // else, render new pokemon to the page, i.e., update DOM
      } else {
          ul.appendChild(renderPokemon(data))
      }
    }
  )
}

function releasePokemon(event) {
  const released = event.target.parentNode
  // update DOM by removing the selected pokemon
  released.parentNode.removeChild(released)
  // fetch request to delete pokemon from server
  deletePokemon(event)
}
