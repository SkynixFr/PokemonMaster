import Meta from './meta';
import StatChange from './statChange';

class Move {
	readonly id: string;
	readonly name: string;
	readonly power: number;
	readonly accuracy: number;
	readonly pp: number;
	readonly meta: Meta;
	readonly type: string;
	readonly category: string;
	readonly description: string;
	readonly learnedBy: string[];
	readonly statsChange: StatChange[];
	readonly target: string;

	constructor(
		id: string,
		name: string,
		power: number,
		accuracy: number,
		pp: number,
		meta: Meta,
		type: string,
		category: string,
		description: string,
		learnedBy: string[],
		statsChange: StatChange[],
		target: string
	) {
		this.id = id;
		this.name = name;
		this.power = power;
		this.accuracy = accuracy;
		this.pp = pp;
		this.meta = meta;
		this.type = type;
		this.category = category;
		this.description = description;
		this.learnedBy = learnedBy;
		this.statsChange = statsChange;
		this.target = target;
	}

	decreasePP(): Move {
		const updatedPP = this.pp - 1;
		return new Move(
			this.id,
			this.name,
			this.power,
			this.accuracy,
			updatedPP,
			this.meta,
			this.type,
			this.category,
			this.description,
			this.learnedBy,
			this.statsChange,
			this.target
		);
	}
}

export default Move;
