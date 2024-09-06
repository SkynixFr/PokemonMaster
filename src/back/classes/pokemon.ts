import Move from './move';
import Type from './typeEffectiveness';
import Ability from './ability';
import Nature from './nature';
import Stat from './stat';
import Status from './status';

class Pokemon {
	readonly pokedexId: number;
	readonly name: string;
	readonly types: Type[];
	readonly level: number;
	readonly ability: Ability;
	readonly nature: Nature;
	readonly gender: string = 'neutral' || 'female' || 'male';
	readonly isShiny: boolean = false;
	readonly moves: Move[];
	readonly item = '';
	readonly stats: Stat[];
	readonly weight: number;
	readonly activeMove: Move;
	readonly status: Status;
	readonly volatileStatus: Status;

	constructor(
		pokedexId: number,
		name: string,
		types: Type[],
		level: number,
		ability: Ability,
		nature: Nature,
		gender: string,
		isShiny: boolean,
		moves: Move[],
		item: '',
		stats: Stat[],
		weight: number,
		activeMove: Move,
		status: Status,
		volatileStatus: Status
	) {
		this.pokedexId = pokedexId;
		this.name = name;
		this.types = types;
		this.level = level;
		this.ability = ability;
		this.nature = nature;
		this.gender = gender;
		this.isShiny = isShiny;
		this.moves = moves;
		this.item = item;
		this.stats = stats;
		this.weight = weight;
		this.activeMove = activeMove;
		this.status = status ? status : new Status('', '', 0, true);
		this.volatileStatus = volatileStatus
			? volatileStatus
			: new Status('', '', 0, true);
	}

	getStat(statName: string): Stat {
		const searchedStat = this.stats.find(stat => stat.name === statName);
		return new Stat(
			searchedStat.name,
			searchedStat.value,
			searchedStat.max,
			searchedStat.ev,
			searchedStat.iv,
			searchedStat.total,
			searchedStat.base
		);
	}

	changeActiveMove(move: Move): Pokemon {
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
			move,
			this.status,
			this.volatileStatus
		);
	}

	updateMoves(updatedMoves: Move[]): Pokemon {
		return new Pokemon(
			this.pokedexId,
			this.name,
			this.types,
			this.level,
			this.ability,
			this.nature,
			this.gender,
			this.isShiny,
			updatedMoves,
			this.item,
			this.stats,
			this.weight,
			this.activeMove,
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
		// const effectiveness = TypeEffectiveness.calculateEffectiveness(
		// 	this.activeMove.type,
		// 	target.types
		// );
		// let damage = this.activeMove.power * effectiveness;
		let damage = this.activeMove.power;
		if (missChance > this.activeMove.accuracy / 100) {
			damage = 0;
			console.log('The attack missed!');
		}
		const opponentHp = target.getStat('hp');
		const updatedHp = opponentHp.decrease(damage);
		const hpIndex = target.stats.findIndex(stat => stat.name === 'hp');
		target.stats[hpIndex] = updatedHp;
		console.log(this.activeMove);
		if (
			this.activeMove.meta?.ailment === 'sleep' &&
			!statusList.includes(target.status.name)
		) {
			console.log('The target fell asleep');
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
			target.pokedexId,
			target.name,
			target.types,
			target.level,
			target.ability,
			target.nature,
			target.gender,
			target.isShiny,
			target.moves,
			target.item,
			target.stats,
			target.weight,
			target.activeMove,
			target.status,
			target.volatileStatus
		);
	}

	changeStatus(updatedStatus: Status): Pokemon {
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
			updatedStatus,
			this.volatileStatus
		);
	}

	changeVolatileStatus(updatedVolatileStatus: Status): Pokemon {
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
			updatedVolatileStatus
		);
	}
}

export default Pokemon;
