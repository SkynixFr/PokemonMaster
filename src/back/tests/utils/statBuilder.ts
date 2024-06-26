// Classes
import Stat from '../../classes/stat';

class StatBuilder {
	name: string = 'hp';
	value: number = 100;
	max: number = 100;

	default(): Stat {
		return new StatBuilder().build();
	}

	build(): Stat {
		return new Stat(this.name, this.value, this.max);
	}

	withName(name: string): StatBuilder {
		this.name = name;
		return this;
	}

	withValue(value: number): StatBuilder {
		this.value = value;
		return this;
	}

	withMax(max: number): StatBuilder {
		this.max = max;
		return this;
	}
}

export default StatBuilder;
