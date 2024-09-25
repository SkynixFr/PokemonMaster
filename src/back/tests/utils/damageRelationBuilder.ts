import DamageRelation from '../../classes/damageRelation';

class damageRelationBuilder {
	doubleDamageFrom: string[] = [];
	doubleDamageTo: string[] = [];
	halfDamageFrom: string[] = [];
	halfDamageTo: string[] = [];
	noDamageFrom: string[] = [];
	noDamageTo: string[] = [];

	default(): DamageRelation {
		return new damageRelationBuilder().build();
	}

	build(): DamageRelation {
		return new DamageRelation(
			this.doubleDamageFrom,
			this.doubleDamageTo,
			this.halfDamageFrom,
			this.halfDamageTo,
			this.noDamageFrom,
			this.noDamageTo
		);
	}
}

export default damageRelationBuilder;
