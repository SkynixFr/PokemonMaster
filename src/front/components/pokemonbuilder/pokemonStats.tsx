import React, { FocusEvent, FormEvent, useEffect, useState } from 'react';
import { toast } from 'sonner';

// Utils
import { firstLetterMaj } from '../../utils/formatString';

// Interfaces
import { StatEntity } from '../../../interfaces/pokemon/stat/statEntity';
import { PokemonEntity } from '../../../interfaces/pokemon/pokemonEntity';
import { NatureEntity } from '../../../interfaces/pokemon/nature/natureEntity';
import { ChevronsDown, ChevronsUp } from 'lucide-react';

interface PokemonStatsProps {
	statsActive: StatEntity[];
	setStatsActive: (stats: StatEntity[]) => void;
	levelActive: number;
	pokemon: PokemonEntity;
	natureActive: NatureEntity;
	isFromTeam: boolean;
	getNatureMultipliers: (nature: NatureEntity) => any;
}

const PokemonStats = ({
	statsActive,
	setStatsActive,
	levelActive,
	pokemon,
	natureActive,
	isFromTeam,
	getNatureMultipliers
}: PokemonStatsProps) => {
	const [localStats, setLocalStats] = useState<StatEntity[]>(statsActive);
	const [totalEvs, setTotalEvs] = useState<number>(
		statsActive.reduce((acc, stat) => acc + stat.ev, 0)
	);
	const [numberEvs, setNumberEvs] = useState<number>(510 - totalEvs);
	const [prevEv, setPrevEv] = useState<number>(0);
	const [prevIv, setPrevIv] = useState<number>(0);
	const maxEvsPerStat = 255;
	const maxIvsPerStat = 31;

	useEffect(() => {
		setLocalStats(pokemon.stats);
		const totalEvs = pokemon.stats.reduce((acc, stat) => acc + stat.ev, 0);
		setTotalEvs(totalEvs);
		setNumberEvs(510 - totalEvs);
	}, [pokemon]);

	useEffect(() => {
		if (!isFromTeam) {
			const computedBaseStats = computeBaseStats(
				statsActive,
				levelActive,
				natureActive
			);
			const newStatsActive = computedBaseStats.map((stat, index) => ({
				...statsActive[index],
				value: stat
			}));
			setStatsActive(newStatsActive);
		}
	}, []);

	useEffect(() => {
		if (isFromTeam) {
			const computedBaseStats = computeBaseStatsWithoutLevel(
				statsActive,
				levelActive,
				natureActive
			);
			const newStatsActive = computedBaseStats.map((stat, index) => ({
				...statsActive[index],
				value: stat
			}));
			setStatsActive(newStatsActive);
		}
	}, [natureActive]);

	const computeStatWidth = (stat: StatEntity) => {
		let modifiedStat: number;
		if (!isFromTeam) {
			modifiedStat = computeBaseStats([stat], levelActive, natureActive)[0];
		} else {
			modifiedStat = stat.value;
		}

		switch (stat.name) {
			case 'hp':
				return modifiedStat / 620;
			case 'attack':
				return modifiedStat / 385;
			case 'defense':
				return modifiedStat / 465;
			case 'special-attack':
				return modifiedStat / 393;
			case 'special-defense':
				return modifiedStat / 465;
			case 'speed':
				return modifiedStat / 365;
			default:
				return 0;
		}
	};

	const computeBaseStats = (
		stats: StatEntity[],
		level: number,
		nature: NatureEntity
	) => {
		const natureMultipliers = getNatureMultipliers(nature);
		return stats.map(stat => {
			const baseStat = Math.floor((2 * stat.value * level) / 100);
			const adjustedStat = Math.floor(
				baseStat * natureMultipliers[stat.name]
			);
			return stat.name === 'hp' ? baseStat + level + 10 : adjustedStat + 5;
		});
	};

	const computeBaseStatsWithoutLevel = (
		stats: StatEntity[],
		level: number,
		nature: NatureEntity
	) => {
		const natureMultipliers = getNatureMultipliers(nature);
		return stats.map(stat => {
			const baseStat = Math.floor(2 * stat.base);
			const adjustedStat = Math.floor(
				baseStat * natureMultipliers[stat.name]
			);
			return stat.name === 'hp' ? baseStat + level + 10 : adjustedStat + 5;
		});
	};

	const computeBaseStatsWithEvIv = (
		stats: StatEntity[],
		level: number,
		nature: NatureEntity
	) => {
		const natureMultipliers = getNatureMultipliers(nature);
		return stats.map(stat => {
			const baseStat = Math.floor(
				((2 * stat.value + stat.iv + Math.floor(stat.ev / 4)) * level) / 100
			);
			const adjustedStat = Math.floor(
				baseStat * natureMultipliers[stat.name]
			);
			return stat.name === 'hp' ? baseStat + level + 10 : adjustedStat + 5;
		});
	};

	const handleChangeEv = (e: FormEvent<HTMLInputElement>) => {
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

	const handleFocusEv = (
		e: FocusEvent<HTMLInputElement>,
		stat: StatEntity
	) => {
		e.preventDefault();
		setPrevEv(stat.ev);
		e.currentTarget.value = '';
	};

	const handleBlurEv = (e: FocusEvent<HTMLInputElement>, stat: StatEntity) => {
		e.preventDefault();
		if (e.currentTarget.value === '') {
			e.currentTarget.value = prevEv.toString();
		}
		let ev = e.currentTarget.valueAsNumber;
		const totalEvs = statsActive.reduce((acc, stat) => acc + stat.ev, 0);
		const diffStatEv = ev - statsActive.find(s => s.name === stat.name)?.ev;
		if (totalEvs + diffStatEv > 510) {
			toast.warning('You can not have more than 510 Evs');
			e.currentTarget.value = prevEv.toString();
			return;
		}
		const newStats = statsActive.map(s =>
			s.name === stat.name ? { ...s, ev, total: s.value + s.ev } : s
		);
		const newTotalEvs = newStats.reduce((acc, stat) => acc + stat.ev, 0);
		setTotalEvs(newTotalEvs);
		setStatsActive(newStats);
		setNumberEvs(510 - newTotalEvs);
	};

	const handleChangeIv = (e: FormEvent<HTMLInputElement>) => {
		e.preventDefault();
		const iv = e.currentTarget.valueAsNumber;
		if (iv > maxIvsPerStat) {
			toast.warning('You can not have more than 31 Ivs per stat');
			e.currentTarget.value = maxIvsPerStat.toString();
			return;
		}
		if (iv < 0) {
			toast.warning('You can not have less than 0 Ivs per stat');
			e.currentTarget.value = '0';
		}
	};

	const handleBlurIv = (e: FocusEvent<HTMLInputElement>, stat: StatEntity) => {
		e.preventDefault();
		if (e.currentTarget.value === '') {
			e.currentTarget.value = prevIv.toString();
		}
		const iv = e.currentTarget.valueAsNumber;
		const newStats = statsActive.map(s =>
			s.name === stat.name
				? {
						...s,
						iv
					}
				: s
		);
		setStatsActive(newStats);
	};

	const handleFocusIv = (
		e: FocusEvent<HTMLInputElement>,
		stat: StatEntity
	) => {
		e.preventDefault();
		setPrevIv(stat.iv);
		e.currentTarget.value = '';
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
					{localStats.map((stat, index) => (
						<div key={index} className={'stat-details'}>
							<div className={'stat-infos'}>
								<div
									className={`stat-name ${
										natureActive &&
										natureActive.increasedStat === stat.name
											? 'nature-increased'
											: natureActive &&
												  natureActive.decreasedStat === stat.name
												? 'nature-decreased'
												: ''
									}`}
								>
									{firstLetterMaj(stat.name) === 'Special Defense'
										? 'Sp.Defense'
										: firstLetterMaj(stat.name) === 'Special Attack'
											? 'Sp.Attack'
											: firstLetterMaj(stat.name) === 'Hp'
												? 'HP'
												: firstLetterMaj(stat.name)}
									{natureActive &&
									natureActive.increasedStat === stat.name ? (
										<ChevronsUp width={15} height={15} />
									) : natureActive &&
									  natureActive.decreasedStat === stat.name ? (
										<ChevronsDown width={15} height={15} />
									) : (
										''
									)}
								</div>
								<div className={'stat-value'}>
									{isFromTeam
										? statsActive[index].value
										: computeBaseStats(
												statsActive,
												levelActive,
												natureActive
											)[index]}
								</div>
								<div className={'stat-progress'}>
									<div
										className={'stat-progress-value'}
										style={{
											width: `${computeStatWidth(statsActive[index]) * 100}%`,
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
								<form onSubmit={e => e.preventDefault()}>
									<input
										key={`${pokemon.pokedexId}-${stat.name}-ev`}
										type="number"
										name="ev"
										id="ev"
										min={0}
										defaultValue={stat.ev}
										max={maxEvsPerStat}
										onFocus={e => {
											handleFocusEv(e, stat);
										}}
										onChange={e => {
											handleChangeEv(e);
										}}
										onBlur={e => {
											handleBlurEv(e, stat);
										}}
									/>
								</form>
							</div>
							<div className={'stat-ivs'}>
								<form onSubmit={e => e.preventDefault()}>
									<input
										key={`${pokemon.pokedexId}-${stat.name}-iv`}
										type="number"
										name="iv"
										id="iv"
										min={0}
										defaultValue={stat.iv}
										max={maxIvsPerStat}
										onFocus={e => {
											handleFocusIv(e, stat);
										}}
										onBlur={e => {
											handleBlurIv(e, stat);
										}}
										onChange={e => {
											handleChangeIv(e);
										}}
									/>
								</form>
							</div>
							<div className={'stat-tot'}>
								{isFromTeam
									? stat.total
									: computeBaseStatsWithEvIv(
											statsActive,
											levelActive,
											natureActive
										)[index]}
							</div>
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
