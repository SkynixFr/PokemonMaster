import Pokemon from "./Pokemon";

class Team {
    private pokemons: Pokemon[];
    private activePokemon?: Pokemon;

    constructor(pokemons: Pokemon[], activePokemon?: Pokemon) {
        this.pokemons = pokemons;
        this.activePokemon = activePokemon ? activePokemon : this.pokemons[0];
    }

    changeActivePokemon(index: number) {
        this.activePokemon = this.pokemons[index];
    }

    getActivePokemon() {
        return this.activePokemon;
    }
}

export default Team;