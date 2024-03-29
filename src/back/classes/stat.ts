class Stat {
	readonly name: string;
	readonly value: number;

	constructor(name: string, value: number) {
		this.name = name;
		this.value = value;
	}

	increase(value: number): Stat {
		return new Stat(this.name, this.value + value);
	}

	decrease(value: number): Stat {
		return new Stat(this.name, this.value - value);
	}
}

export default Stat;
