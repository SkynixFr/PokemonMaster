// Classes
import Move from './move';
import Stat from './stat';
import Status from './status';

class Pokemon {
	readonly name: string;
	readonly stats: Stat[];
	readonly moves: Move[];
	readonly activeMove: Move;
	readonly status: Status;
	readonly volatileStatus: Status;

	constructor(
		name: string,
		stat: Stat[],
		moves: Move[],
		activeMove: Move,
		status?: Status,
		volatileStatus?: Status
	) {
		this.name = name;
		this.stats = stat;
		this.moves = moves;
		this.activeMove = activeMove;
		this.status = status ? status : new Status('', '', 0, true);
		this.volatileStatus = volatileStatus
			? volatileStatus
			: new Status('', '', 0, true);
	}

	getStat(statName: string): Stat {
		const searchedStat = this.stats.find(stat => stat.name === statName);
		return new Stat(searchedStat.name, searchedStat.value, searchedStat.max);
	}

	changeActiveMove(move: Move): Pokemon {
		return new Pokemon(
			this.name,
			this.stats,
			this.moves,
			move,
			this.status,
			this.volatileStatus
		);
	}

	attack(target: Pokemon): Pokemon {
		if (!this.status.ableToMove) {
			return target;
		}
		let updatedStatus: Status = target.status;
		let updatedVolatileStatus: Status = target.volatileStatus;
		const statusList = ['PSN', 'SLP', 'FRZ', 'KO', 'BRN', 'PAR'];
		const missChance = Math.random();
		let damage = this.activeMove.power;
		if (missChance > this.activeMove.accuracy / 100) {
			damage = 0;
			console.log('The attack missed!');
		}
		const opponentHp = target.getStat('hp');
		const updatedHp = opponentHp.decrease(damage);
		const hpIndex = target.stats.findIndex(stat => stat.name === 'hp');
		target.stats[hpIndex] = updatedHp;
		if (
			this.activeMove.meta?.ailment === 'sleep' &&
			!statusList.includes(target.status.name)
		) {
			updatedStatus = new Status(
				'SLP',
				`${this.name} is asleep`,
				Math.ceil(Math.random() * 3),
				false
			);
		}
		if (
			this.activeMove.meta?.ailment === 'poison' &&
			!statusList.includes(target.status.name)
		) {
			updatedStatus = new Status('PSN', `${this.name} is poisoned`, 0, true);
		}
		if (
			this.activeMove.meta?.ailment === 'freeze' &&
			!statusList.includes(target.status.name)
		) {
			updatedStatus = new Status('FRZ', `${this.name} is frozen`, 0, false);
		}
		if (
			this.activeMove.meta?.ailment === 'burn' &&
			!statusList.includes(target.status.name)
		) {
			updatedStatus = new Status('BRN', `${this.name} is burned`, 0, true);
		}
		if (
			this.activeMove.meta?.ailment === 'paralysis' &&
			!statusList.includes(target.status.name)
		) {
			updatedStatus = new Status(
				'PAR',
				`${this.name} is paralyzed`,
				0,
				false
			);
		}
		if (this.activeMove.meta?.ailment === 'confusion') {
			updatedVolatileStatus = new Status(
				'CNF',
				`${this.name} is confused`,
				Math.ceil(Math.random() * 4),
				true
			);
		}
		if (updatedHp.value <= 0) {
			updatedStatus = new Status('KO', `${this.name} has fainted`, 0, false);
		}
		target = target.changeStatus(updatedStatus);
		target = target.changeVolatileStatus(updatedVolatileStatus);
		return new Pokemon(
			target.name,
			target.stats,
			target.moves,
			target.activeMove,
			target.status,
			target.volatileStatus
		);
	}

	changeStatus(updatedStatus: Status): Pokemon {
		return new Pokemon(
			this.name,
			this.stats,
			this.moves,
			this.activeMove,
			updatedStatus,
			this.volatileStatus
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
			updatedStatus = new Status('KO', `${this.name} has fainted`, 0, false);
		}

		return new Pokemon(
			this.name,
			this.stats,
			this.moves,
			this.activeMove,
			updatedStatus,
			this.volatileStatus
		);
	}

	changeVolatileStatus(updatedVolatileStatus: Status): Pokemon {
		return new Pokemon(
			this.name,
			this.stats,
			this.moves,
			this.activeMove,
			this.status,
			updatedVolatileStatus
		);
	}
}

export default Pokemon;
