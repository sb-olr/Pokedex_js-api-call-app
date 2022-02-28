const pokemonList = [];

pokemonList.push({name: 'Bulbasaur', height: 7, type: ['grass', 'poison']});

pokemonList.push({name: 'Ivysaur', height: 1, type: ['grass', 'poison']});

pokemonList.push({name: 'Venusaur', height: 2, type: ['grass', 'poison']});

for (let poke of pokemonList) {
    document.write('<div class="pokemon">' + poke.name + ' (height: ' + poke.height +')</div>')
}