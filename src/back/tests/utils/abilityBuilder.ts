import Ability from '../../classes/ability';

class AbilityBuilder {
	id: string = '1';
	name: string = 'blaze';
	description: string = 'description';
	learnedBy: string[] = ['Charizard'];

	default(): Ability {
		return new AbilityBuilder().build();
	}

	build(): Ability {
		return new Ability(this.id, this.name, this.description, this.learnedBy);
	}

	withId(id: string): AbilityBuilder {
		this.id = id;
		return this;
	}

	withName(name: string): AbilityBuilder {
		this.name = name;
		return this;
	}

	withDescription(description: string): AbilityBuilder {
		this.description = description;
		return this;
	}

	withLearnedBy(learnedBy: string[]): AbilityBuilder {
		this.learnedBy = learnedBy;
		return this;
	}
}

export default AbilityBuilder;
