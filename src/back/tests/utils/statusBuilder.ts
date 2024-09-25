import Status from '../../classes/status';

class StatusBuilder {
	name: string = '';
	description: string = '';
	counter: number = 0;
	ableToMove: boolean = true;

	default(): Status {
		return new StatusBuilder().build();
	}

	build(): Status {
		return new Status(
			this.name,
			this.description,
			this.counter,
			this.ableToMove
		);
	}

	withName(name: string): StatusBuilder {
		this.name = name;
		return this;
	}

	withDescription(description: string): StatusBuilder {
		this.description = description;
		return this;
	}

	withCounter(counter: number): StatusBuilder {
		this.counter = counter;
		return this;
	}

	withAbleToMove(ableToMove: boolean): StatusBuilder {
		this.ableToMove = ableToMove;
		return this;
	}
}

export default StatusBuilder;
