class DamageRelation {
	doubleDamageFrom: string[];
	doubleDamageTo: string[];
	halfDamageFrom: string[];
	halfDamageTo: string[];
	noDamageFrom: string[];
	noDamageTo: string[];

	constructor(
		doubleDamageFrom: string[],
		doubleDamageTo: string[],
		halfDamageFrom: string[],
		halfDamageTo: string[],
		noDamageFrom: string[],
		noDamageTo: string[]
	) {
		this.doubleDamageFrom = doubleDamageFrom;
		this.doubleDamageTo = doubleDamageTo;
		this.halfDamageFrom = halfDamageFrom;
		this.halfDamageTo = halfDamageTo;
		this.noDamageFrom = noDamageFrom;
		this.noDamageTo = noDamageTo;
	}
}

export default DamageRelation;
