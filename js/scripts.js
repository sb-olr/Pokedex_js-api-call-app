const pokemonList = [];

pokemonList.push({name: 'Bulbasaur', height: 7, type: ['grass', 'poison']});

pokemonList.push({name: 'Ivysaur', height: 1, type: ['grass', 'poison']});

pokemonList.push({name: 'Venusaur', height: 2, type: ['grass', 'poison']});

for (let poke of pokemonList) {
    const {name, height} = poke;
    const extra = height>=7 ? '<br>Ginormous!!!' : '';
    document.write(`<div class="pokemon"> ${name} (height: ${height})${extra}</div>`);
}