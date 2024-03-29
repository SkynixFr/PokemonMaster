// Classes
import Move from '../../classes/move';

class MoveBuilder {
	name: string = 'Ember';
	power: number = 10;

	default(): Move {
		return new MoveBuilder().build();
	}

	build(): Move {
		return new Move(this.name, this.power);
	}

	withName(name: string): MoveBuilder {
		this.name = name;
		return this;
	}

	withPower(power: number): MoveBuilder {
		this.power = power;
		return this;
	}
}

export default MoveBuilder;
