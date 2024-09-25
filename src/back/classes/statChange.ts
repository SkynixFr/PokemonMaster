import Stat from './stat';

class StatChange {
	readonly stat: Stat;
	readonly change: number;

	constructor(stat: Stat, change: number) {
		this.stat = stat;
		this.change = change;
	}
}

export default StatChange;
