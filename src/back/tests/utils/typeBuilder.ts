import Type from '../../classes/typeEffectiveness';

class TypeBuilder {
	name: string = 'normal';
	damageRelation: DamageRelation = new DamageRelation();

	default(): Type {
		return new TypeBuilder().build();
	}

	build(): Type {
		return new Type(this.name, this.damageRelation);
	}

	withName(name: string): TypeBuilder {
		this.name = name;
		return this;
	}

	withWeaknesses(weaknesses: Type[]): TypeBuilder {
		this.weaknesses = weaknesses;
		return this;
	}

	withResistances(resistances: Type[]): TypeBuilder {
		this.resistances = resistances;
		return this;
	}

	withImmunities(immunities: Type[]): TypeBuilder {
		this.immunities = immunities;
		return this;
	}
}
