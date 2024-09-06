class Stat {
	readonly name: string;
	readonly value: number;
	readonly max: number;
	readonly ev: number;
	readonly iv: number;
	readonly total: number;
	readonly base: number;

	constructor(
		name: string,
		value: number,
		max: number,
		ev: number,
		iv: number,
		total: number,
		base: number
	) {
		this.name = name;
		this.value = value;
		this.max = max;
		this.ev = ev;
		this.iv = iv;
		this.total = total;
		this.base = base;
	}

	increase(value: number): Stat {
		if (this.value <= 0) {
			return this;
		}
		const newValue = this.value + value;
		return new Stat(
			this.name,
			newValue > this.max ? this.max : newValue,
			this.max,
			this.ev,
			this.iv,
			this.total,
			this.base
		);
	}

	decrease(value: number): Stat {
		const newValue = this.value - value;
		return new Stat(
			this.name,
			newValue < 0 ? 0 : newValue,
			this.max,
			this.ev,
			this.iv,
			this.total,
			this.base
		);
	}

	getStat(statName: string): Stat {
		return this.name === statName
			? new Stat(
					this.name,
					this.value,
					this.max,
					this.ev,
					this.iv,
					this.total,
					this.base
				)
			: null;
	}
}

export default Stat;
