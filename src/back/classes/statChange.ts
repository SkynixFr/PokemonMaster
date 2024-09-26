class StatChange {
	readonly stat: string;
	readonly change: number;

	constructor(stat: string, change: number) {
		this.stat = stat;
		this.change = change;
	}
}

export default StatChange;
