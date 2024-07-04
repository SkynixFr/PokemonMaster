import MetaEntity from './meta';

class Move {
	readonly name: string;
	readonly power: number;
	readonly pp: number;
	readonly meta: MetaEntity;
	readonly target: string;

	constructor(
		name: string,
		power: number,
		pp: number,
		meta: MetaEntity,
		target: string
	) {
		this.name = name;
		this.power = power;
		this.pp = pp;
		this.meta = meta;
		this.target = target;
	}

	decreasePP(): Move {
		const updatedPP = this.pp - 1;
		return new Move(this.name, this.power, updatedPP, this.meta, this.target);
	}
}

export default Move;
