import DamageRelation from '../../classes/damageRelation';

class damageRelationBuilder {
	doubleDamageFrom: string[];
	doubleDamageTo: string[];
	halfDamageFrom: string[];
	halfDamageTo: string[];
	noDamageFrom: string[];
	noDamageTo: string[];

	build(
		doubleDamageFrom: string[],
		doubleDamageTo: string[],
		halfDamageFrom: string[],
		halfDamageTo: string[],
		noDamageFrom: string[],
		noDamageTo: string[]
	): DamageRelation {
		return new DamageRelation(
			doubleDamageFrom,
			doubleDamageTo,
			halfDamageFrom,
			halfDamageTo,
			noDamageFrom,
			noDamageTo
		);
	}
}

export default damageRelationBuilder;
