import IPokemon from "../types/interfaces/IPokemon";

class Pokemon {
    pokemon: IPokemon;
    attack(){
        console.log(this.pokemon.pokemon.moves[0].power);
    }

    constructor(pokemon: IPokemon){
        this.pokemon = pokemon;
    }
}

export default Pokemon;