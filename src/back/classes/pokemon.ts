// Classes
import Move from './move';
import Stat from './stat';

class Pokemon {
	readonly name: string;
	readonly stats: Stat[];
	readonly moves: Move[];

	constructor(name: string, stat: Stat[], moves: Move[]) {
		this.name = name;
		this.stats = stat;
		this.moves = moves;
	}

	attack(opponentPokemon: Pokemon, move: Move): Pokemon {
		const damage = move.power;
		const opponentHp = opponentPokemon.stats.find(stat => stat.name === 'hp');
		const updatedHp = opponentHp.decrease(damage);
		return new Pokemon(
			opponentPokemon.name,
			[updatedHp],
			opponentPokemon.moves
		);
	}

	heal(): Pokemon {
		const hp = this.stats.find(stat => stat.name === 'hp');
		const updatedHp = hp.increase(20);
		return new Pokemon(this.name, [updatedHp], this.moves);
	}
}

export default Pokemon;
