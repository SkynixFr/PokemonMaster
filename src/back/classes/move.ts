// Interface
import IMove from '../../interfaces/IMove';

class Move implements IMove {
	readonly name: string;
	readonly power: number;
	readonly pp: number;

	constructor(name: string, power: number, pp: number) {
		this.name = name;
		this.power = power;
		this.pp = pp;
	}

	decreasePP(): Move {
		const updatedPP = this.pp - 1;
		return new Move(this.name, this.power, updatedPP);
	}
}

export default Move;
