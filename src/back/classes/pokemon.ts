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

	attack(target: Pokemon, move: Move): Pokemon {
		let updatedStatus = target.status;
		let statusList = ['PSN', 'SLP', 'KO'];
		if (this.status.name === 'KO' || this.status.name === 'SLP') {
			return target;
		}
		const damage = move.power;
		const opponentHp = target.getStat('hp');
		const updatedHp = opponentHp.decrease(damage);
		const index = target.stats.findIndex(stat => stat.name === 'hp');
		target.stats[index] = updatedHp;
		if (
			move.meta?.ailment === 'sleep' &&
			!statusList.includes(target.status.name)
		) {
			updatedStatus = new Status('SLP', 'The Pokémon has fallen asleep');
		}
		if (
			move.meta?.ailment === 'poison' &&
			!statusList.includes(target.status.name)
		) {
			updatedStatus = new Status('PSN', 'The Pokémon has been poisoned');
		}
		if (
			move.meta?.ailment === 'freeze' &&
			!statusList.includes(target.status.name)
		) {
			updatedStatus = new Status('FRZ', 'The Pokémon has been frozen');
		}
		if (updatedHp.value <= 0) {
			updatedStatus = new Status('KO', 'The Pokémon has fainted');
		}
		target = target.changeStatus(updatedStatus);
		return new Pokemon(
			target.name,
			target.stats,
			target.moves,
			target.status
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
