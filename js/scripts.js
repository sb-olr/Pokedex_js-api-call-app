const neededKeys=['name', 'detailsUrl'];

const pokemonRepository = (() => {
    const pokemonList = [];
    const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    const add = pokemon => validKeys(pokemon) && pokemonList.push(pokemon);

    const getAll = () => pokemonList;
    
    const showDetails = pokemon => loadDetails(pokemon).then(console.log(pokemon));

    const addClickListener = (button, pokemon) => button.addEventListener('click', ()=>showDetails(pokemon));

    const addListItem = pokemon => {
        let pokemonList = document.querySelector('.pokemon-list');

        let listItem = document.createElement('li');
        let button = document.createElement('button');
    
        button.innerText = pokemon.name;
        button.classList.add('pokemon-button');
        addClickListener(button, pokemon);
    
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);
    }
    
    const loadList = () => {
        showLoadingMessage();
        return fetch(apiUrl).then(response => {
            // timeout is for demo only as the message disappears too fast!
            setTimeout(hideLoadingMessage, 2000);
            console.log("fetch done");
          return response.json();
        }).then(json => {
          json.results.forEach(item => {
            let pokemon  = {
              name: item.name,
              detailsUrl: item.url
            }
            add(pokemon);
          });
        }).catch(e => {
            hideLoadingMessage();
            console.error(e)
        });
    }

    const loadDetails = item => {
        let url = item.detailsUrl;
        return fetch(url).then(response => {
          return response.json();
        }).then(details => {
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          item.types = details.types;
        }).catch(e => console.error(e));
    }

    return {
        getAll,
        addListItem,
        loadList,
    }
})();

const validKeys = obj => (typeof(obj)=='object') && (neededKeys.every(key => Object.keys(obj).includes(key)));

// show a helpful message while waiting for results
const showLoadingMessage = () => {
    let loading = document.querySelector('#loading-message');
    loading.classList.add('show');
  }

// hide message after results arrive
const hideLoadingMessage = () => {
    let loading = document.querySelector('#loading-message');
    loading.classList.remove('show');
  }

pokemonRepository.loadList().then(() => {
    pokemonRepository.getAll().forEach(pokemon => pokemonRepository.addListItem(pokemon));
});
