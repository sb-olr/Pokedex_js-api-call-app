const neededKeys=['name', 'height', 'type'];

const pokemanRepository = (() => {
    const pokemonList = [];

    const add = pokeman => {
        if (validKeys(pokeman)){
            pokemonList.push(pokeman);
        }
    }

    const get = name => pokemonList.filter(pokeman => pokeman.name === name);

    const getAll = () => pokemonList;
    
    const showDetails = pokemon => console.log(pokemon);

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
    
    return {
        add,
        get,
        getAll,
        addListItem
    };
})();

const validKeys = obj => (typeof(obj)=='object') && (neededKeys.every(key => Object.keys(obj).includes(key)))

pokemanRepository.add({name: 'Bulbasaur', height: 7, type: ['grass', 'poison']});
pokemanRepository.add({name: 'Ivysaur', height: 1, type: ['grass', 'poison']});
pokemanRepository.add({name: 'Venusaur', height: 2, type: ['grass', 'poison']});
pokemanRepository.add({test: 'test', name: 'Testasaur', height: 2, type: ['grass', 'poison']});
pokemanRepository.add({test: 'test', name: 'Testasaur2', type: ['grass', 'poison']});
pokemanRepository.add(1);
pokemanRepository.add(true);
pokemanRepository.add(false);
pokemanRepository.add('test');


pokemanRepository.getAll().forEach( pokemon => pokemanRepository.addListItem(pokemon))

console.debug(pokemanRepository.get('Testasaur'))