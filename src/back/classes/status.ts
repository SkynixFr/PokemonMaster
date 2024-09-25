class Status {
	readonly name: string;
	readonly description: string;
	readonly counter: number;
	readonly ableToMove: boolean;

	constructor(
		name: string,
		description: string,
		counter: number,
		ableToMove: boolean
	) {
		this.name = name;
		this.description = description;
		this.counter = counter;
		this.ableToMove = ableToMove;
	}
	setAbleToMove(ableToMove: boolean): Status {
		return new Status(this.name, this.description, this.counter, ableToMove);
	}
	setCounter(counter: number): Status {
		return new Status(this.name, this.description, counter, this.ableToMove);
	}
}

export default Status;
