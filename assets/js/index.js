let currentPage = 1;
let isLoading = false;

const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelector("#btn-header");

const fetchApiAll = async (page = 1, limit = 8) => {
    try {
        const offset = (page - 1) * limit;
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

const mostrarPokemon = async (pokemons) => {
    for (const pokemon of pokemons) {
        const response = await fetch(pokemon.url);
        const data = await response.json();
        renderizarPokemon(data);
    }
}

const renderizarPokemon = (pokemon) => {

    let tipos = pokemon.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join('');


    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
    
    <div class="pokemon">
    <p class="pokemon-id-back">#${pokemon.id}</p>
    <div class="pokemon-imagen">
        <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${pokemon.name}">
    </div>
    <div class="pokemon-info">
        <div class="nombre-contenedor">
            <p class="pokemon-id">#${pokemon.id}</p>
            <h2 class="pokemon-nombre">${pokemon.name}</h2>

        </div>
        <div class="pokemon-tipos">
            ${tipos}
        </div>
        <div class="pokemon-stats">
            <p class="stat">${pokemon.height} mts</p>
            <p class="stat">${pokemon.weight} kg</p>
        </div>
    </div>
</div> 
    
  `;
  listaPokemon.append(div);
}

// botonesHeader.forEach(boton => boton.addEventListener("click" , (event) => { 


//     const botonId = event(currentTarget.id);

//     const mostrarPokemon = async (pokemons) => {
//         for (const pokemon of pokemons) {
//             const response = await fetch(pokemon.url);

//             const tipos = data.types.map((type => type.type.name));

//             if (tipos.some(tipo => tipo.includes(botonId))){

                
//                 const data = await response.json();
//                 renderizarPokemon(data);

//                 const loadMoreCharacters = async () => {
//                     if (isLoading) return;
//                     isLoading = true;
                
//                     currentPage++;
//                     const data = await fetchApiAll(currentPage);
//                     if (data.results.length > 0) {
//                         await mostrarPokemon(data.results);
//                     } else {
//                         // No more characters to load
//                         alert("No hay más personajes disponibles.");
//                     }
                
//                     isLoading = false;
//                 }
                
//                 const loadInitialCharacters = async () => {
//                     const data = await fetchApiAll();
//                     await mostrarPokemon(data.results);
//                 }
                
//                 window.onload = loadInitialCharacters;
                
//                 window.addEventListener('scroll', () => {
//                     const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
                
//                     if (scrollTop + clientHeight >= scrollHeight - 5 && !isLoading) {
//                         loadMoreCharacters();
//                     }
//                 });
//             }
//         }
//     }
// }));

const loadMoreCharacters = async () => {
    if (isLoading) return;
    isLoading = true;

    currentPage++;
    const data = await fetchApiAll(currentPage);
    if (data.results.length > 0) {
        await mostrarPokemon(data.results);
    } else {
        // No more characters to load
        alert("No hay más personajes disponibles.");
    }

    isLoading = false;
}

const loadInitialCharacters = async () => {
    const data = await fetchApiAll();
    await mostrarPokemon(data.results);
}

window.onload = loadInitialCharacters;

window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5 && !isLoading) {
        loadMoreCharacters();
    }
});


