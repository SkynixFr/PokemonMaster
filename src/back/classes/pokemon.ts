// Classes
import Move from './move';
import Stat from './stat';
import Status from './status';

class Pokemon {
	readonly name: string;
	readonly stats: Stat[];
	readonly moves: Move[];
	readonly status: Status;
	readonly statusCounter: number;

	constructor(
		name: string,
		stat: Stat[],
		moves: Move[],
		status?: Status,
		statusCounter?: number
	) {
		this.name = name;
		this.stats = stat;
		this.moves = moves;
		this.status = status ? status : new Status('', '');
		this.statusCounter = statusCounter ? statusCounter : 0;
	}

	getStat(statName: string): Stat {
		const searchedStat = this.stats.find(stat => stat.name === statName);
		return new Stat(searchedStat.name, searchedStat.value, searchedStat.max);
	}

	attack(target: Pokemon, move: Move): Pokemon {
		let updatedStatus = target.status;
		let updatedStatusCounter = target.statusCounter;
		let statusList = ['PSN', 'SLP', 'FRZ', 'KO', 'BRN', 'PAR'];
		if (
			this.status.name === 'KO' ||
			this.status.name === 'SLP' ||
			this.status.name === 'FRZ'
		) {
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
			updatedStatus = new Status('SLP', `${this.name} is asleep`);
			updatedStatusCounter = Math.ceil(Math.random() * 7);
		}
		if (
			move.meta?.ailment === 'poison' &&
			!statusList.includes(target.status.name)
		) {
			updatedStatus = new Status('PSN', `${this.name} is poisoned`);
		}
		if (
			move.meta?.ailment === 'freeze' &&
			!statusList.includes(target.status.name)
		) {
			updatedStatus = new Status('FRZ', `${this.name} is frozen`);
		}
		if (
			move.meta?.ailment === 'burn' &&
			!statusList.includes(target.status.name)
		) {
			updatedStatus = new Status('BRN', `${this.name} is burned`);
		}
		if (
			move.meta?.ailment === 'paralysis' &&
			!statusList.includes(target.status.name)
		) {
			updatedStatus = new Status('PAR', `${this.name} is paralyzed`);
		}
		if (updatedHp.value <= 0) {
			updatedStatus = new Status('KO', `${this.name} has fainted`);
		}
		target = target.changeStatus(updatedStatus);
		target = target.updateStatusCounter(updatedStatusCounter);
		return new Pokemon(
			target.name,
			target.stats,
			target.moves,
			target.status,
			target.statusCounter
		);
	}

	changeStatus(updatedStatus: Status): Pokemon {
		return new Pokemon(
			this.name,
			this.stats,
			this.moves,
			updatedStatus,
			this.statusCounter
		);
	}

	updateStatusCounter(updatedStatusCounter: number): Pokemon {
		return new Pokemon(
			this.name,
			this.stats,
			this.moves,
			this.status,
			updatedStatusCounter
		);
	}

	sufferFromStatus(): Pokemon {
		let updatedStatus = this.status;
		let damage = 0;
		if (this.status.name === 'PSN') {
			damage = Math.ceil(this.getStat('hp').max / 8);
		}
		if (this.status.name === 'BRN') {
			damage = Math.ceil(this.getStat('hp').max / 16);
		}
		const updatedHp = this.getStat('hp').decrease(damage);
		const index = this.stats.findIndex(stat => stat.name === 'hp');
		this.stats[index] = updatedHp;
		if (updatedHp.value <= 0) {
			updatedStatus = new Status('KO', `${this.name} has fainted`);
		}

		return new Pokemon(
			this.name,
			this.stats,
			this.moves,
			updatedStatus,
			this.statusCounter
		);
	}
}

export default Pokemon;
