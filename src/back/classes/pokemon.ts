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

	attack(opponentPokemon: Pokemon, move: Move): void {
		const damage = move.power;
		const opponentHp = opponentPokemon.stats.find(stat => stat.name === 'hp');
		opponentHp.decrease(damage);
	}

	heal(): void {}
}

export default Pokemon;
