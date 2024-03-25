import Type from "../../classes/Type";
import TypeBuilder from "./TypeBuilder";
import Stats from "../../classes/Stats";
import StatsBuilder from "./StatsBuilder";
import Move from "../../classes/Move";
import MoveBuilder from "./MoveBuilder";
import Ability from "../../classes/Ability";
import AbilityBuilder from "./AbilityBuilder";
import Item from "../../classes/Item";
import ItemBuilder from "./ItemBuilder";
import Sprites from "../../classes/Sprites";
import SpritesBuilder from "./SpritesBuilder";
import Pokemon from "../../classes/Pokemon";

class PokemonBuilder {
    private name: string;
    private id: number;
    private types: Type[];
    private stats: Stats;
    private nature?: string;
    private level?: number;
    private gender?: string;
    private isShiny?: boolean;
    private moves?: Move[];
    private ability?: Ability;
    private item?: Item;
    private sprites?: Sprites;

    default(): Pokemon {
        return new PokemonBuilder().build()
    }

    build(): Pokemon {
        return new Pokemon(
            this.name, 
            this.id, 
            this.types, 
            this.stats, 
            this.nature, 
            this.level, 
            this.gender,
            this.isShiny,
            this.moves,
            this.ability,
            this.item,
            this.sprites
        );
    }

    withName(name: string): PokemonBuilder {
        this.name = name;
        return this;
    }

    withId(id: number): PokemonBuilder {
        this.id = id;
        return this;
    }

    withTypes(types: Type[]): PokemonBuilder {
        this.types = types;
        return this;
    }

    withStats(stats: Stats): PokemonBuilder {
        this.stats = stats;
        return this;
    }

    withNature(nature: string): PokemonBuilder {
        this.nature = nature;
        return this;
    }

    withLevel(level: number): PokemonBuilder {
        this.level = level;
        return this;
    }

    withGender(gender: string): PokemonBuilder {
        this.gender = gender;
        return this;
    }

    withIsShiny(isShiny: boolean): PokemonBuilder {
        this.isShiny = isShiny;
        return this;
    }

    withMoves(moves: Move[]): PokemonBuilder {
        this.moves = moves;
        return this;
    }

    withAbility(ability: Ability): PokemonBuilder {
        this.ability = ability;
        return this;
    }

    withItem(item: Item): PokemonBuilder {
        this.item = item;
        return this;
    }

    withSprites(sprites: Sprites): PokemonBuilder {
        this.sprites = sprites;
        return this;
    }
}