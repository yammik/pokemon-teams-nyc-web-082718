const BASE_URL = "http://localhost:3000";
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMONS_URL = `${BASE_URL}/pokemons`;

const showTrainers = () => {
  fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(trainersJSON => {
      document.querySelector('main').innerHTML = trainersJSON.map(json => trainerDiv(json)).join('');
    })
};

const addPkmn = (trainerId) => {
  fetch(POKEMONS_URL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      trainer_id: trainerId
    })
  })
    .then(resp => resp.json())
    .then(json => {
      document.querySelector(`[data-id='${json.trainer_id}'] ul`).innerHTML += pokemonDiv(json);
    })
    .catch(error => alert("Y'all ain't got no room fo' mo' pokemanzzzz"))
}

const pokemonDiv = (pkmn) => {
  return `<li>${pkmn.nickname} (${pkmn.species})
            <button class="release" data-pokemon-id="${pkmn.id}" onClick="release(${pkmn.id})">Release</button>
          </li>`;
};

const trainerDiv = (trainer) => {
  const pokemons = trainer.pokemons.map(pkmn => pokemonDiv(pkmn)).join('');
  return `<div class="card" data-id="${trainer.id}"><p>${trainer.name}</p>
            <button data-trainer-id="${trainer.id}" class="addBtn" onClick="addPkmn(${trainer.id})">Add Pokemon</button>
            <ul>
            ${pokemons}
            </ul>
          </div>`;
};

const release = pkmnId => {
  fetch(`${POKEMONS_URL}/${pkmnId}`, {
    method: "DELETE"
  })
    .then(resp => {
      showTrainers();
    })
};

document.addEventListener('DOMContentLoaded', e => {
  showTrainers();

});
