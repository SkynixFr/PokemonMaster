// Interfaces
import IPokemon from '../../interfaces/IPokemon';

// Classes
import Move from './move';
import Stat from './stat';
import Status from './status';

class Pokemon implements IPokemon {
	readonly name: string;
	readonly stats: Stat[];
	readonly moves: Move[];
	readonly status?: Status;

	constructor(name: string, stat: Stat[], moves: Move[], status?: Status) {
		this.name = name;
		this.stats = stat;
		this.moves = moves;
		this.status = status ? status : new Status('', '');
	}

	getStat(statName: string): Stat {
		const searchedStat = this.stats.find(stat => stat.name === statName);
		return new Stat(searchedStat.name, searchedStat.value, searchedStat.max);
	}

	attack(opponentPokemon: Pokemon, move: Move): Pokemon {
		const damage = move.power;
		const opponentHp = opponentPokemon.getStat('hp');
		const updatedHp = opponentHp.decrease(damage);
		const index = opponentPokemon.stats.findIndex(stat => stat.name === 'hp');
		opponentPokemon.stats[index] = updatedHp;
		if (updatedHp.value <= 0) {
			const updatedStatus = new Status('KO', 'The Pokémon has fainted');
			opponentPokemon = opponentPokemon.changeStatus(updatedStatus);
		}
		return new Pokemon(
			opponentPokemon.name,
			opponentPokemon.stats,
			opponentPokemon.moves,
			opponentPokemon.status
		);
	}

	heal(): Pokemon {
		if (this.status.name === 'KO') {
			return this;
		}
		const hp = this.getStat('hp');
		const updatedHp = hp.increase(30);
		const index = this.stats.findIndex(stat => stat.name === 'hp');
		this.stats[index] = updatedHp;
		return new Pokemon(this.name, this.stats, this.moves);
	}

	changeStatus(status: Status): Pokemon {
		return new Pokemon(this.name, this.stats, this.moves, status);
	}
}

export default Pokemon;
