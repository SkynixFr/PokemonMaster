class Meta {
	readonly ailment: string;
	readonly drain: number;
	readonly healing: number;
	readonly critRate: number;
	readonly priority: number;
	readonly effectChance: number;
	readonly flinchChance: number;
	readonly statChance: number;
	readonly minHits: number;
	readonly maxHits: number;
	readonly minTurns: number;
	readonly maxTurns: number;

	constructor(
		ailment: string,
		drain: number,
		healing: number,
		critRate: number,
		priority: number,
		effectChance: number,
		flinchChance: number,
		statChance: number,
		minHits: number,
		maxHits: number,
		minTurns: number,
		maxTurns: number
	) {
		this.ailment = ailment;
		this.drain = drain;
		this.healing = healing;
		this.critRate = critRate;
		this.priority = priority;
		this.effectChance = effectChance;
		this.flinchChance = flinchChance;
		this.statChance = statChance;
		this.minHits = minHits;
		this.maxHits = maxHits;
		this.minTurns = minTurns;
		this.maxTurns = maxTurns;
	}
}

export default Meta;
