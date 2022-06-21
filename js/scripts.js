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
          hideLoadingMessage();
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

    // function to show modal with pokemon details
   function showModal(title, text) {
    let modalContainer = document.querySelector('#modal-container');

    // Clear preexisting content
    modalContainer.innerHTML = '';

    let modal = document.createElement('div');
    modal.classList.add('modal');

    // Add new modal content
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';

    // Close modal when user clicks on 'Close'
    closeButtonElement.addEventListener('click', hideModal);

    let modalTitle = document.createElement('h1');
    modalTitle.innerText = title;

    let modalText = document.createElement('p');
    modalText.innerText = text;

    modal.appendChild(closeButtonElement);
    modal.appendChild(modalTitle);
    modal.appendChild(modalText);
    modalContainer.appendChild(modal);

    // make modal visible
    modalContainer.classList.add('is-visible');

    // Close modal when user clicks on 'Close'
    closeButtonElement.addEventListener('click', hideModal);

    // Close modal when modal is open and user clicks outside of the modal
    modalContainer.addEventListener('click', (e) => {
      let target = e.target;
      if (target === modalContainer){
        hideModal();
      }
    });
  }

  document.querySelector('#show-modal').addEventListener('click', function () {
    showModal('Modal title', 'This is the modal content!');
  });

  function hideModal(){
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');
  }

  // Close modal when modal is open and user clicks 'Escape'
  window.addEventListener('keydown', (e) => {
    let modalContainer = document.querySelector('#modal-container');
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')){
      hideModal();
    }
  });
  
    return {
        getAll,
        addListItem,
        loadList,
    }
})();

const validKeys = obj => (typeof(obj)=='object') && (neededKeys.every(key => Object.keys(obj).includes(key)));

// show a helpful message while waiting for results
const showLoadingMessage = () => {
    const loading = document.querySelector('#loading-message');
    loading.classList.add('show');
  }

// hide message after results arrive
const hideLoadingMessage = () => {
    const loading = document.querySelector('#loading-message');
    loading.classList.remove('show');
  }

pokemonRepository.loadList().then(() => {
    pokemonRepository.getAll().forEach(pokemon => pokemonRepository.addListItem(pokemon));
});
