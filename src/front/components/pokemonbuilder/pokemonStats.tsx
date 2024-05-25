// Interfaces
import { StatEntity } from '../../../interfaces/pokemon/stat/statEntity';
import { firstLetterMaj } from '../../utils/formatString';
interface PokemonStatsProps {
	statsActive: StatEntity[];
}

const PokemonStats = ({ statsActive }: PokemonStatsProps) => {
	let numberEvs = 510;
	const maxEvsPerStat = 252;
	const maxIvsPerStat = 31;

	const computeStatWidth = (stat: StatEntity) => {
		console.log(stat.name, stat.value);
		switch (stat.name) {
			case 'hp':
				return stat.value / (507 - 252);
			case 'attack':
				return stat.value / (432 - 252);
			case 'defense':
				return stat.value / (452 - 252);
			case 'special-attack':
				return stat.value / (432 - 252);
			case 'special-defense':
				return stat.value / (452 - 252);
			case 'speed':
				return stat.value / (452 - 252);
			default:
				return 0;
		}
	};

	return (
		<div className="pokemon-stats">
			<h3>Stats</h3>
			<div className={'stats'}>
				<div className={'stats-title'}>
					<span className={'title-base'}>Base</span>
					<span className={'title-ev'}>EVs</span>
					<span className={'title-iv'}>IVs</span>
					<span className={'title-stats'}>Total</span>
				</div>
				<div className={'stats-details'}>
					{statsActive.map((stat, index) => (
						<div key={index} className={'stat-details'}>
							<div className={'stat-infos'}>
								<div className={'stat-name'}>
									{firstLetterMaj(stat.name) === 'Special Defense'
										? 'Sp.Defense'
										: firstLetterMaj(stat.name) === 'Special Attack'
											? 'Sp.Attack'
											: firstLetterMaj(stat.name) === 'Hp'
												? 'HP'
												: firstLetterMaj(stat.name)}
								</div>
								<div className={'stat-value'}>{stat.value}</div>
								<div className={'stat-progress'}>
									<div
										className={'stat-progress-value'}
										style={{
											width: `${computeStatWidth(stat) * 100}%`,
											backgroundColor:
												computeStatWidth(stat) * 100 > 75
													? 'var(--grass)'
													: computeStatWidth(stat) * 100 > 50
														? 'var(--electric)'
														: computeStatWidth(stat) * 100 > 25
															? 'var(--fire)'
															: 'var(--fighting)'
										}}
									></div>
								</div>
							</div>
							<div className={'stat-evs'}>
								<input
									type="number"
									min={0}
									defaultValue={0}
									max={maxEvsPerStat}
									onChange={e => {
										numberEvs = numberEvs - Number(e.target.value);
									}}
								/>
							</div>
							<div className={'stat-ivs'}>
								<input
									type="number"
									min={0}
									defaultValue={0}
									max={maxIvsPerStat}
								/>
							</div>
							<div className={'stat-tot'}>{stat.value}</div>
						</div>
					))}
				</div>
				<div>Remaining Evs: {numberEvs}</div>
			</div>
		</div>
	);
};

export default PokemonStats;
