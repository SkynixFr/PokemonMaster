// Interface
import IMove from '../../interfaces/IMove';

class Move implements IMove {
	readonly name: string;
	readonly power: number;

	constructor(name: string, power: number) {
		this.name = name;
		this.power = power;
	}
}

export default Move;
