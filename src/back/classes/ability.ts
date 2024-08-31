class Ability {
	id: string;
	name: string;
	description: string;
	learnedBy: string[];

	constructor(
		id: string,
		name: string,
		description: string,
		learnedBy: string[]
	) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.learnedBy = learnedBy;
	}
}

export default Ability;
