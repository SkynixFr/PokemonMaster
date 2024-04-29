// Interface
import IMetaEntity from '../../interfaces/IMetaEntity';
import IMove from '../../interfaces/IMove';

class Move implements IMove {
	readonly name: string;
	readonly power: number;
	readonly pp: number;
	readonly meta: IMetaEntity;

	constructor(name: string, power: number, pp: number, meta: IMetaEntity) {
		this.name = name;
		this.power = power;
		this.pp = pp;
		this.meta = meta;
	}

	decreasePP(): Move {
		const updatedPP = this.pp - 1;
		return new Move(this.name, this.power, updatedPP, this.meta);
	}
}

export default Move;
