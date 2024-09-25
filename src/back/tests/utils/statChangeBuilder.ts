import StatChange from '../../classes/statChange';
import StatBuilder from './statBuilder';
import Stat from '../../classes/stat';

class StatChangeBuilder {
	stat: Stat = new StatBuilder().default();
	change: number = 0;

	default(): StatChange {
		return new StatChangeBuilder().build();
	}

	build(): StatChange {
		return new StatChange(this.stat, this.change);
	}

	withStat(stat: Stat): StatChangeBuilder {
		this.stat = stat;
		return this;
	}

	withChange(change: number): StatChangeBuilder {
		this.change = change;
		return this;
	}
}

export default StatChangeBuilder;
