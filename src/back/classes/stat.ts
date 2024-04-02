// Interface
import IStat from '../../interfaces/IStat';

class Stat implements IStat {
	readonly name: string;
	readonly value: number;
	readonly max?: number;

	constructor(name: string, value: number, max?: number) {
		this.name = name;
		this.value = value;
		this.max = max;
	}

	increase(value: number): Stat {
		const newValue = this.value + value;
		return new Stat(
			this.name,
			newValue > this.max ? this.max : newValue,
			this.max
		);
	}

	decrease(value: number): Stat {
		const newValue = this.value - value;
		return new Stat(this.name, newValue < 0 ? 0 : newValue, this.max);
	}
}

export default Stat;
