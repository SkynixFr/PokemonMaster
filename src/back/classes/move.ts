import Meta from './meta';

class Move {
	readonly name: string;
	readonly power: number;
	readonly accuracy: number;
	readonly pp: number;
	readonly meta: Meta;
	readonly target: string;

	constructor(
		name: string,
		power: number,
		accuracy: number,
		pp: number,
		meta: Meta,
		target: string
	) {
		this.name = name;
		this.power = power;
		this.accuracy = accuracy;
		this.pp = pp;
		this.meta = meta;
		this.target = target;
	}

	decreasePP(): Move {
		const updatedPP = this.pp - 1;
		return new Move(
			this.name,
			this.power,
			this.accuracy,
			updatedPP,
			this.meta,
			this.target
		);
	}
}

export default Move;
