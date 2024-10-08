// Builder
import StatBuilder from './statBuilder';
import MoveBuilder from './moveBuilder';

// Classes
import Pokemon from '../../classes/pokemon';
import Stat from '../../classes/stat';
import Move from '../../classes/move';
import Type from '../../classes/typeEffectiveness';
import Ability from '../../classes/ability';
import Nature from '../../classes/nature';
import Status from '../../classes/status';
import DamageRelationBuilder from './damageRelationBuilder';
import AbilityBuilder from './abilityBuilder';
import NatureBuilder from './natureBuilder';

class PokemonBuilder {
	pokedexId: number = 6;
	name: string = 'Charizard';
	types: Type[] = [new Type('fire', new DamageRelationBuilder().default())];
	level: number = 100;
	ability: Ability = new AbilityBuilder().default();
	nature: Nature = new NatureBuilder().default();
	gender: string = 'male';
	isShiny: boolean = false;
	moves: Move[] = [new MoveBuilder().default()];
	item: string = 'Charcoal';
	stats: Stat[] = [new StatBuilder().default()];
	weight: number = 905;
	activeMove: Move = new MoveBuilder().default();
	status: Status = new Status('', '', 0, true);
	volatileStatus: Status = new Status('', '', 0, true);
	index: number = 0;

	default(): Pokemon {
		return new PokemonBuilder().build();
	}

	build(): Pokemon {
		return new Pokemon(
			this.pokedexId,
			this.name,
			this.types,
			this.level,
			this.ability,
			this.nature,
			this.gender,
			this.isShiny,
			this.moves,
			this.item,
			this.stats,
			this.weight,
			this.activeMove,
			this.status,
			this.volatileStatus,
			this.index
		);
	}

	withPokedexId(pokedexId: number): PokemonBuilder {
		this.pokedexId = pokedexId;
		return this;
	}

	withName(name: string): PokemonBuilder {
		this.name = name;
		return this;
	}

	withTypes(types: Type[]): PokemonBuilder {
		this.types = types;
		return this;
	}

	withLevel(level: number): PokemonBuilder {
		this.level = level;
		return this;
	}

	withAbility(ability: Ability): PokemonBuilder {
		this.ability = ability;
		return this;
	}

	withNature(nature: Nature): PokemonBuilder {
		this.nature = nature;
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

	withItem(item: string): PokemonBuilder {
		this.item = item;
		return this;
	}

	withStats(stats: Stat[]): PokemonBuilder {
		this.stats = stats;
		return this;
	}

	withWeight(weight: number): PokemonBuilder {
		this.weight = weight;
		return this;
	}

	withActiveMove(activeMove: Move): PokemonBuilder {
		this.activeMove = activeMove;
		return this;
	}

	withStatus(status: Status): PokemonBuilder {
		this.status = status;
		return this;
	}

	withVolatileStatus(volatileStatus: Status): PokemonBuilder {
		this.volatileStatus = volatileStatus;
		return this;
	}

	withIndex(index: number): PokemonBuilder {
		this.index = index;
		return this;
	}
}

export default PokemonBuilder;
