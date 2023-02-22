function createPokemonCard(pokemon) {
    const card = document.createElement("div");
    card.classList.add("col");
    card.innerHTML = `
            <div class="card h-100">
                <img src="${pokemon.img}" class="card-img-top card-img" alt="${pokemon.name}">
                <div class="card-body">
                    <h5 class="card-title">${pokemon.name}</h5>
                    <p class="card-text">DEX no:${pokemon.pokedex_number}</p>
                </div>
                <div class="card-footer">
                    <small class="text-muted">Type: ${pokemon.type1}</small>
                </div>
            </div>
        `;
        return card;

}

export { createPokemonCard };