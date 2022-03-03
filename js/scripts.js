const pokemanRepository = (() => {
    const pokemonList = [];

    const add = (pokeman) => {
        pokemonList.push(pokeman);
    }

    const getAll = () => {
        return pokemonList;
    }

    return {
        add,
        getAll
    };
})();


pokemanRepository.add({name: 'Bulbasaur', height: 7, type: ['grass', 'poison']});
pokemanRepository.add({name: 'Ivysaur', height: 1, type: ['grass', 'poison']});
pokemanRepository.add({name: 'Venusaur', height: 2, type: ['grass', 'poison']});

pokemanRepository.getAll().forEach( pokemon => {
    const {name, height} = pokemon;
    const extra = height>=7 ? '<br>Ginormous!!!' : '';
    const text = `<div class="pokemon"> ${name} (height: ${height})${extra}</div>`;
    console.debug(text);
    document.write(text);
})