import Meta from '../../classes/meta';

class MetaBuilder {
	ailment: string = '';
	drain: number = 0;
	healing: number = 0;
	critRate: number = 0;
	priority: number = 0;
	effectChance: number = 0;
	flinchChance: number = 0;
	statChance: number = 0;
	minHits: number = 0;
	maxHits: number = 0;
	minTurns: number = 0;
	maxTurns: number = 0;

	default(): Meta {
		return new MetaBuilder().build();
	}

	build(): Meta {
		return new Meta(
			this.ailment,
			this.drain,
			this.healing,
			this.critRate,
			this.priority,
			this.effectChance,
			this.flinchChance,
			this.statChance,
			this.minHits,
			this.maxHits,
			this.minTurns,
			this.maxTurns
		);
	}

	withAilment(ailment: string): MetaBuilder {
		this.ailment = ailment;
		return this;
	}

	withDrain(drain: number): MetaBuilder {
		this.drain = drain;
		return this;
	}

	withHealing(healing: number): MetaBuilder {
		this.healing = healing;
		return this;
	}

	withCritRate(critRate: number): MetaBuilder {
		this.critRate = critRate;
		return this;
	}

	withPriority(priority: number): MetaBuilder {
		this.priority = priority;
		return this;
	}

	withEffectChance(effectChance: number): MetaBuilder {
		this.effectChance = effectChance;
		return this;
	}

	withFlinchChance(flinchChance: number): MetaBuilder {
		this.flinchChance = flinchChance;
		return this;
	}

	withStatChance(statChance: number): MetaBuilder {
		this.statChance = statChance;
		return this;
	}

	withMinHits(minHits: number): MetaBuilder {
		this.minHits = minHits;
		return this;
	}

	withMaxHits(maxHits: number): MetaBuilder {
		this.maxHits = maxHits;
		return this;
	}

	withMinTurns(minTurns: number): MetaBuilder {
		this.minTurns = minTurns;
		return this;
	}

	withMaxTurns(maxTurns: number): MetaBuilder {
		this.maxTurns = maxTurns;
		return this;
	}
}

export default MetaBuilder;
