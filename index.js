const apiPromise = fetch('https://pokeapi.co/api/v2/pokemon');

function renderPokemonList(pokemonList) {
  document.querySelector('#pokemon-count').textContent = `Total Pokemon: ${pokemonList.count}`;
  const ulContainer = document.createElement('ul');
  pokemonList.results.forEach(pokemon => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.textContent = pokemon.name;
    a.addEventListener('click', getPokemonName)
    ulContainer.appendChild(li);
    li.appendChild(a);

  });
  document.querySelector('#container').appendChild(ulContainer);
}
apiPromise
  .then(function (response) {
    return response.json()
  })
  .then(function (pokemonList) {
    console.log(pokemonList);
    renderPokemonList(pokemonList);
  })

let pokemonName;

const getPokemonName = (e) => {
  pokemonName = e.target.childNodes[0].data
  return getPokemonDetails(pokemonName);
  console.log(pokemonName)

}

function getPokemonDetails(name) {
  const pokemonData = fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`);

  pokemonData
    .then(function (response) {
      return response.json()
    })
    .then(function (pokemon) {
      console.log(pokemon);
      renderPokemonDetails(pokemon);
    })
}

function renderPokemonDetails(pokemon) {
  const pokemonContainer = document.querySelector('#pokemon-container')

  pokemonContainer.innerHTML = `
  <img src="${pokemon.sprites.front_default}">
  <h1 class="title">${pokemon.name}</h1>
  <p class="">Height: ${pokemon.height}</p>
  <p class="">Weight: ${pokemon.weight}</p>
  <p class="">XP: ${pokemon.base_experience}</p>
  <p class="">Abilities: ${pokemon.abilities[0].ability.name}</p>
  `
}
