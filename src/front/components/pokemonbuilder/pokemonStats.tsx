import React, { FormEvent, FocusEvent, useState } from 'react';
import { toast } from 'sonner';

// Interfaces
import { StatEntity } from '../../../interfaces/pokemon/stat/statEntity';
import { firstLetterMaj } from '../../utils/formatString';
interface PokemonStatsProps {
	statsActive: StatEntity[];
	setStatsActive: (stats: StatEntity[]) => void;
}

const PokemonStats = ({ statsActive, setStatsActive }: PokemonStatsProps) => {
	const [totalEvs, setTotalEvs] = useState<number>(
		statsActive.reduce((acc, stat) => acc + stat.ev, 0)
	);
	const [numberEvs, setNumberEvs] = useState<number>(510 - totalEvs);
	const [prevEv, setPrevEv] = useState<number>(0);
	const maxEvsPerStat = 252;
	const maxIvsPerStat = 31;

	const computeStatWidth = (stat: StatEntity) => {
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

	const handleChange = (e: FormEvent<HTMLInputElement>) => {
		e.preventDefault();
		const ev = e.currentTarget.valueAsNumber;
		if (ev > maxEvsPerStat) {
			toast.warning('You can not have more than 252 Evs per stat');
			e.currentTarget.value = maxEvsPerStat.toString();
			return;
		}
		if (ev < 0) {
			toast.warning('You can not have less than 0 Evs per stat');
			e.currentTarget.value = '0';
		}
	};

	const handleFocus = (e: FocusEvent<HTMLInputElement>, stat: StatEntity) => {
		e.preventDefault();
		setPrevEv(stat.ev);
		e.currentTarget.value = '';
	};

	const handleBlur = (e: FocusEvent<HTMLInputElement>, stat: StatEntity) => {
		e.preventDefault();
		if (e.currentTarget.value === '') {
			e.currentTarget.value = prevEv.toString();
		}
		const ev = e.currentTarget.valueAsNumber;
		const totalEvs = statsActive.reduce((acc, stat) => acc + stat.ev, 0);
		const diffStatEv = ev - statsActive.find(s => s.name === stat.name)?.ev;
		if (totalEvs + diffStatEv > 510) {
			toast.warning('You can not have more than 510 Evs');
			e.currentTarget.value = prevEv.toString();
			return;
		}
		const newStats = statsActive.map(s =>
			s.name === stat.name ? { ...s, ev } : s
		);
		const newTotalEvs = newStats.reduce((acc, stat) => acc + stat.ev, 0);
		setTotalEvs(newTotalEvs);
		setStatsActive(newStats);
		setNumberEvs(numberEvs + prevEv - ev);
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
								<form>
									<input
										type="number"
										name="ev"
										id="ev"
										min={0}
										defaultValue={stat.ev}
										max={maxEvsPerStat}
										onFocus={e => {
											handleFocus(e, stat);
										}}
										onChange={e => {
											handleChange(e);
										}}
										onBlur={e => {
											handleBlur(e, stat);
										}}
									/>
								</form>
							</div>
							<div className={'stat-ivs'}>
								<form>
									<input
										type="number"
										name="iv"
										id="iv"
										min={0}
										defaultValue={stat.iv}
										max={maxIvsPerStat}
									/>
								</form>
							</div>
							<div className={'stat-tot'}>{stat.total}</div>
						</div>
					))}
				</div>
				<div className={'remaining-evs'}>
					{numberEvs === 0
						? 'No remaining Evs'
						: `Remaining Evs: ${numberEvs}`}
				</div>
			</div>
		</div>
	);
};

export default PokemonStats;
