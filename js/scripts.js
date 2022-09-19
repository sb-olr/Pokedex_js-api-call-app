const neededKeys = ["name", "detailsUrl"];

const pokemonRepository = (() => {
  const pokemonList = [];
  const apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  const add = (pokemon) => validKeys(pokemon) && pokemonList.push(pokemon);

  const getAll = () => pokemonList;

  const showDetails = (pokemon) => {
    loadDetails(pokemon).then(() => {
      // console.log(pokemon);
      showModal(pokemon);
    });
  };
  const addClickListener = (button, pokemon) =>
    button.addEventListener("click", () => showDetails(pokemon));

  const addListItem = (pokemon) => {
    let pokemonList = document.querySelector(".pokemon-list");

    let listItem = document.createElement("li");
    listItem.classList.add("row", "list-group-item", "justify-content-center", "mb20");

    let button = document.createElement("button");

    button.innerText = pokemon.name;
    button.classList.add("btn", "btn-primary", "list-group-item");
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

  // show modal with pokemon details
  // function showModal({ name, height, imageUrl, types }) {
  //   let typeNames = "";
  //   if (types) {
  //     typeNames = types
  //       .map((type) => {
  //         return type.type.name;
  //       })
  //       .join(", ");
  //   }

  //   let modalContainer = document.querySelector("#modal-container");

  //   // Clear preexisting content
  //   modalContainer.innerHTML = "";

  //   let modal = document.createElement("div");
  //   modal.classList.add("modal");

  //   // Add new modal content
  //   let closeButtonElement = document.createElement("button");
  //   closeButtonElement.classList.add("modal-close");
  //   closeButtonElement.innerText = "\u2715";

  //   // Close modal when user clicks on 'Close'
  //   closeButtonElement.addEventListener("click", hideModal);

  //   let modalTitle = document.createElement("h1");
  //   modalTitle.innerText = name;

  //   let modalTextHeight = document.createElement("p");
  //   modalTextHeight.innerText = `height: ${height}`;

  //   let modalTextTypes = document.createElement("p");
  //   modalTextTypes.innerText = `type: ${typeNames}`;

  //   let modalImage = document.createElement("img");
  //   modalImage.src = imageUrl;

  //   modal.appendChild(closeButtonElement);
  //   modal.appendChild(modalTitle);
  //   modal.appendChild(modalTextHeight);
  //   modal.appendChild(modalTextTypes);
  //   modal.appendChild(modalImage);
  //   modalContainer.appendChild(modal);

  //   // make modal visible
  //   modalContainer.classList.add("is-visible");

  //   // Close modal when user clicks on 'Close'
  //   closeButtonElement.addEventListener("click", hideModal);

  //   // Close modal when modal is open and user clicks outside of the modal
  //   modalContainer.addEventListener("click", (e) => {
  //     let target = e.target;
  //     if (target === modalContainer) {
  //       hideModal();
  //     }
  //   });
  // }

  function showModal(pokemon) {
    let typeNames = "";
    if (pokemon.types) {
      typeNames = pokemon.types
        .map((type) => {
          return type.type.name;
        })
        .join(", ");
    }

    // get modal body, title
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
    // // clear existing modal title and body
    // modalTitle.empty();
    modalBody.empty();
    modalTitle.empty();

    //to create elements in modal content
    let nameElement = $('<h1>' + pokemon.name + '</h1>');
    let imageElement = $('<img class="modal-img">');
    imageElement.attr('src', pokemon.imageUrl);
    let heightElement = $('<p>' + 'Height: ' + pokemon.height + '</p>');
    let weightElement = $('<p>' + 'Weight: ' + pokemon.weight + '</p>');
    let typesElement = $('<p>' + 'Types: ' + typeNames + '</p>');

    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
  }

  // function hideModal() {
  //   let modalContainer = document.querySelector("#modal-container");
  //   modalContainer.classList.remove("is-visible");
  // }

  // // Close modal when modal is open and user clicks 'Escape'
  // window.addEventListener("keydown", (e) => {
  //   let modalContainer = document.querySelector("#modal-container");
  //   if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
  //     hideModal();
  //   }
  // });

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
