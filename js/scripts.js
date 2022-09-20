const neededKeys = ["name", "detailsUrl"];

const pokemonRepository = (() => {
  const pokemonList = [];
  const apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  const add = (pokemon) => validKeys(pokemon) && pokemonList.push(pokemon);

  const getAll = () => pokemonList;

  const showDetails = (pokemon) => {
    loadDetails(pokemon).then(() => {
      console.log(pokemon);
      showModal(pokemon);
    });
  };
  const addClickListener = (button, pokemon) =>
    button.addEventListener("click", () => showDetails(pokemon));

  const addListItem = (pokemon) => {
    let pokemonList = document.querySelector(".pokemon-list");

    let listItem = document.createElement("li");
    listItem.classList.add("group-list-item");

    let button = document.createElement("button");
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#pokemonModal" + pokemon.name);
    button.innerText = pokemon.name;
    button.classList.add("btn-outline-success", "btn-lg", "group-list-item");

    addClickListener(button, pokemon);

    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
  };

  const loadList = () => {
    showLoadingMessage();
    return fetch(apiUrl)
      .then((response) => {
        hideLoadingMessage();
        return response.json();
      })
      .then((json) => {
        json.results.forEach((item) => {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch((e) => {
        hideLoadingMessage();
        console.error(e);
      });
  };

  const loadDetails = (item) => {
    let url = item.detailsUrl;
    return fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((details) => {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      })
      .catch((e) => console.error(e));
  };

  function showModal(pokemon) {
    let modalTitle = $(".modal-title");
    let modalBody = $(".modal-body");

    modalTitle.empty();
    modalBody.empty();

    modalTitle.append(
      pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
    );
    let pokemonDetails = $('<p class="modal-title"></p>');

    pokemonDetails.append(`${
      pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
    }, and its height is: ${pokemon.height} with weight
    of: ${pokemon.weight}. Lets GO!!`);
    modalBody.append(pokemonDetails);
    let pokemonImage = $('<img class="modal-img">').attr(
      "src",
      pokemon.imageUrl
    );
    modalBody.append(pokemonImage);
    let pokemonBackImage = $('<img class="modal-img">').attr(
      "src",
      pokemon.imageBackUrl
    );
    modalBody.append(pokemonBackImage);
  }

  return {
    getAll,
    addListItem,
    loadList,
  };
})();

const validKeys = (obj) =>
  typeof obj == "object" &&
  neededKeys.every((key) => Object.keys(obj).includes(key));

// show a helpful message while waiting for results
const showLoadingMessage = () => {
  const loading = document.querySelector("#loading-message");
  loading.classList.add("show");
};

// hide message after results arrive
const hideLoadingMessage = () => {
  const loading = document.querySelector("#loading-message");
  loading.classList.remove("show");
};

pokemonRepository.loadList().then(() => {
  pokemonRepository
    .getAll()
    .forEach((pokemon) => pokemonRepository.addListItem(pokemon));
});
