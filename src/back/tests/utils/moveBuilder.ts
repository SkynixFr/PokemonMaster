// Classes
import Meta from '../../classes/meta';
import Move from '../../classes/move';
import MetaBuilder from './metaBuilder';
import StatChange from '../../classes/statChange';
import StatChangeBuilder from './statChangeBuilder';

class MoveBuilder {
	id: string = '1';
	name: string = 'Ember';
	power: number = 40;
	accuracy: number = 100;
	pp: number = 25;
	maxPp: number = 25;
	meta: Meta = new MetaBuilder().default();
	type: string = 'fire';
	category: string = 'special';
	description: string = 'description';
	learnedBy: string[] = ['Charizard'];
	statsChange: StatChange[] = [new StatChangeBuilder().default()];
	target: string = 'any';

	default(): Move {
		return new MoveBuilder().build();
	}

	build(): Move {
		return new Move(
			this.id,
			this.name,
			this.power,
			this.accuracy,
			this.pp,
			this.maxPp,
			this.meta,
			this.type,
			this.category,
			this.description,
			this.learnedBy,
			this.statsChange,
			this.target
		);
	}

	withId(id: string): MoveBuilder {
		this.id = id;
		return this;
	}

	withName(name: string): MoveBuilder {
		this.name = name;
		return this;
	}

	withPower(power: number): MoveBuilder {
		this.power = power;
		return this;
	}

	withAccuracy(accuracy: number): MoveBuilder {
		this.accuracy = accuracy;
		return this;
	}

	withPp(pp: number): MoveBuilder {
		this.pp = pp;
		return this;
	}

	withMaxPp(maxPp: number): MoveBuilder {
		this.maxPp = maxPp;
		return this;
	}

	withMeta(meta: Meta): MoveBuilder {
		this.meta = meta;
		return this;
	}

	withType(type: string): MoveBuilder {
		this.type = type;
		return this;
	}

	withCategory(category: string): MoveBuilder {
		this.category = category;
		return this;
	}

	withDescription(description: string): MoveBuilder {
		this.description = description;
		return this;
	}

	withLearnedBy(learnedBy: string[]): MoveBuilder {
		this.learnedBy = learnedBy;
		return this;
	}

	withStatsChange(statsChange: StatChange[]): MoveBuilder {
		this.statsChange = statsChange;
		return this;
	}

	withTarget(target: string): MoveBuilder {
		this.target = target;
		return this;
	}
}

export default MoveBuilder;
