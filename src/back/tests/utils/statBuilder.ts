// Classes
import Stat from '../../classes/stat';

class StatBuilder {
	name: string = 'hp';
	value: number = 100;
	max: number = 100;
	ev: number = 0;
	iv: number = 0;
	total: number = 0;
	base: number = 0;

	default(): Stat {
		return new StatBuilder().build();
	}

	build(): Stat {
		return new Stat(
			this.name,
			this.value,
			this.max,
			this.ev,
			this.iv,
			this.total,
			this.base
		);
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

	withEv(ev: number): StatBuilder {
		this.ev = ev;
		return this;
	}

	withIv(iv: number): StatBuilder {
		this.iv = iv;
		return this;
	}

	withTotal(total: number): StatBuilder {
		this.total = total;
		return this;
	}

	withBase(base: number): StatBuilder {
		this.base = base;
		return this;
	}
}

export default StatBuilder;
