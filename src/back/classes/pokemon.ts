// Interfaces
import IPokemon from '../../interfaces/IPokemon';

// Classes
import Move from './move';
import Stat from './stat';

class Pokemon implements IPokemon {
	readonly name: string;
	readonly stats: Stat[];
	readonly moves: Move[];
	readonly status?: Status;

	constructor(name: string, stat: Stat[], moves: Move[], status?: Status) {
		this.name = name;
		this.stats = stat;
		this.moves = moves;
		this.status = status;
	}

	attack(opponentPokemon: Pokemon, move: Move): Pokemon {
		const damage = move.power;
		const opponentHp = opponentPokemon.stats.find(stat => stat.name === 'hp');
		const updatedHp = opponentHp.decrease(damage);
		const index = opponentPokemon.stats.findIndex(stat => stat.name === 'hp');
		opponentPokemon.stats[index] = updatedHp;
		return new Pokemon(
			opponentPokemon.name,
			opponentPokemon.stats,
			opponentPokemon.moves
		);
	}

	heal(): Pokemon {
		const hp = this.stats.find(stat => stat.name === 'hp');
		const updatedHp = hp.increase(30);
		const index = this.stats.findIndex(stat => stat.name === 'hp');
		this.stats[index] = updatedHp;
		console.log(this);
		return new Pokemon(this.name, this.stats, this.moves);
	}

	changeStatus(status: Status): Pokemon {
		return new Pokemon(this.name, this.stats, this.moves, status);
	}
}

export default Pokemon;
