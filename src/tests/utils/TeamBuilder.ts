import Team from "../../classes/Team";
import Pokemon from "../../classes/Pokemon";
import Type from "../../classes/Type";
import Stats from "../../classes/Stats";
import Move from "../../classes/Move";
import Ability from "../../classes/Ability";
import Item from "../../classes/Item";
import Sprites from "../../classes/Sprites";
import PokemonBuilder from "./PokemonBuilder";
import TypeBuilder from "./TypeBuilder";
import StatsBuilder from "./StatsBuilder";
import MoveBuilder from "./MoveBuilder";
import AbilityBuilder from "./AbilityBuilder";
import ItemBuilder from "./ItemBuilder";
import SpritesBuilder from "./SpritesBuilder";

class TeamBuilder {
    private pokemons: Pokemon[];
    private activePokemon?: Pokemon;

    default(): Team {
        return new TeamBuilder().build();
    }

    build(): Team {
        return new Team(this.pokemons, this.activePokemon);
    }

    withPokemons(pokemons: Pokemon[]): TeamBuilder {
        this.pokemons = pokemons;
        return this;
    }

    withActivePokemon(activePokemon: Pokemon): TeamBuilder {
        this.activePokemon = activePokemon;
        return this;
    }
}

export default TeamBuilder;