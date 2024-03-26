import Pokemon from "../classes/Pokemon";
import Team from "../classes/Team";
import TeamBuilder from "./utils/TeamBuilder";
import PokemonBuilder from "./utils/PokemonBuilder";
import TypeBuilder from "./utils/TypeBuilder";
import StatsBuilder from "./utils/StatsBuilder";

describe('Team', () => {
    let pikachu: Pokemon;
    let charmander: Pokemon;
    let pokemons: Pokemon[];
    let activePokemon: Pokemon;
    let team: Team;

    beforeEach(() => {
        pikachu = new PokemonBuilder()
            .withName('Pikachu')
            .withId(25)
            .withTypes([new TypeBuilder().withName('Electric').build()])
            .withStats(new StatsBuilder().build())
            .build();
        charmander = new PokemonBuilder()
            .withName('Charmander')
            .withId(4)
            .withTypes([new TypeBuilder().withName('Fire').build()])
            .withStats(new StatsBuilder().build())
            .build();
        team = new TeamBuilder()
            .withPokemons([pikachu, charmander])
            .withActivePokemon(pikachu)
            .build();
    });

    it('should change active pokemon correctly', () => {
        team.changeActivePokemon(1);
        expect(team.getActivePokemon()).toStrictEqual(charmander);
    });

    it('should get active pokemon correctly', () => {
        expect(team.getActivePokemon()).toStrictEqual(pikachu);
    });
});
