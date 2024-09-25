import Type from '../../classes/typeEffectiveness';
import DamageRelation from '../../classes/damageRelation';

class TypeBuilder {
	name: string;
	damageRelations: DamageRelation;

	default(): Type {
		return new TypeBuilder().build();
	}

	build(): Type {
		return new Type(this.name, this.damageRelations);
	}

	withName(name: string): TypeBuilder {
		this.name = name;
		return this;
	}

	withDamageRelations(damageRelations: DamageRelation): TypeBuilder {
		this.damageRelations = damageRelations;
		return this;
	}
}

export default TypeBuilder;
