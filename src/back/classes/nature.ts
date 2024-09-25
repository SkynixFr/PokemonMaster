class Nature {
	id: string;
	name: string;
	increasedStat: string;
	decreasedStat: string;

	constructor(
		id: string,
		name: string,
		increasedStat: string,
		decreasedStat: string
	) {
		this.id = id;
		this.name = name;
		this.increasedStat = increasedStat;
		this.decreasedStat = decreasedStat;
	}
}

export default Nature;
