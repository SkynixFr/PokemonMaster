import Nature from '../../classes/nature';

class NatureBuilder {
	id: string = '1';
	name: string = 'Hardy';
	increasedStat: string = 'none';
	decreasedStat: string = 'none';

	default(): Nature {
		return new NatureBuilder().build();
	}

	build(): Nature {
		return new Nature(
			this.id,
			this.name,
			this.increasedStat,
			this.decreasedStat
		);
	}

	withId(id: string): NatureBuilder {
		this.id = id;
		return this;
	}

	withName(name: string): NatureBuilder {
		this.name = name;
		return this;
	}

	withIncreasedStat(increasedStat: string): NatureBuilder {
		this.increasedStat = increasedStat;
		return this;
	}

	withDecreasedStat(decreasedStat: string): NatureBuilder {
		this.decreasedStat = decreasedStat;
		return this;
	}
}

export default NatureBuilder;
