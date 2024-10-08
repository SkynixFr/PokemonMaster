import React, { useEffect, useState } from 'react';

// Interfaces
import { NatureEntity } from '../../../interfaces/pokemon/nature/natureEntity';
interface NaturesModalProps {
	setOpenNature: (openNature: boolean) => void;
	natureActive: NatureEntity;
	setNatureActive: (nature: NatureEntity) => void;
}

// Actions
import { getNatures } from '../../actions/nature.actions';

// Icons
import { ChevronsDown, ChevronsUp, Search, X } from 'lucide-react';

// Utils
import { firstLetterMaj } from '../../utils/formatString';

const NaturesModal = ({
	setOpenNature,
	natureActive,
	setNatureActive
}: NaturesModalProps) => {
	const [natures, setNatures] = useState<NatureEntity[]>([]);
	const [defaultNatures, setDefaultNatures] = useState<NatureEntity[]>([]);
	const statistics = [
		{ name: 'hp' },
		{ name: 'attack' },
		{ name: 'defense' },
		{ name: 'special-attack' },
		{ name: 'special-defense' },
		{ name: 'speed' }
	];
	const [searchTerm, setSearchTerm] = useState<string>('');

	useEffect(() => {
		const fetchNatures = async () => {
			try {
				const fetchedNatures = await getNatures();
				fetchedNatures.sort((a: NatureEntity, b: NatureEntity) =>
					a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
				);
				setNatures(fetchedNatures);
				setDefaultNatures(fetchedNatures);
			} catch (error) {
				console.error(error);
			}
		};
		fetchNatures().then();
	}, []);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				setOpenNature(false);
			}
		};

		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [setOpenNature]);

	useEffect(() => {
		filterNatures();
	}, [searchTerm]);

	const handleNaturesSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const searchValue = e.target.value.toLowerCase();
		setSearchTerm(searchValue);
	};

	const filterNatures = () => {
		if (searchTerm === '') {
			setNatures(defaultNatures);
			return;
		}

		const filteredNatures = defaultNatures.filter(nature =>
			firstLetterMaj(nature.name).toLowerCase().includes(searchTerm)
		);

		if (filteredNatures.length === 0) {
			setNatures([]);
			return;
		}

		setNatures(filteredNatures);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	return (
		<div className={'natures-modal pokemon-infos-modal-container'}>
			<div className={'natures-modal-container'}>
				<div className="natures-modal-header">
					<h2>Natures</h2>
				</div>
				<button
					className={'close-btn'}
					onClick={() => setOpenNature(false)}
				>
					<X width={30} height={30} />
				</button>
				<div className={'natures-searchbar'}>
					<div className={'search-icon'}>
						<button className={'btn-search-natures'}>
							<Search width={20} height={20} />
						</button>
					</div>

					<form onSubmit={handleSubmit}>
						<input
							type="text"
							placeholder="Search for a nature..."
							onChange={handleNaturesSearch}
						/>
					</form>
				</div>
				<div className="natures-modal-body">
					<div className={'natures-table-title'}>
						<div className={'natures-table-title-name'}>Name</div>
						<div className={'natures-table-tile-statistics'}>
							Statistics
						</div>
					</div>
					<div className={'natures-list'}>
						{natures.length > 0 ? (
							natures.map(nature => (
								<div
									key={nature.id}
									className={`natures-list-item ${natureActive ? (natureActive.name === nature.name ? 'active' : '') : ''}`}
									onClick={() => {
										setNatureActive(nature);
									}}
								>
									<div className={'nature-name'}>
										{firstLetterMaj(nature.name)}
									</div>
									<div className={'nature-statistics'}>
										{statistics.map(statistic =>
											nature.increasedStat === statistic.name ? (
												<div
													key={statistic.name}
													className={`nature-statistic nature-increased ${statistic.name}`}
												>
													{statistic.name === 'special-attack'
														? 'Sp. Attack'
														: statistic.name === 'special-defense'
															? 'Sp. Defense'
															: statistic.name === 'hp'
																? 'HP'
																: firstLetterMaj(
																		statistic.name
																	)}
													<ChevronsUp width={15} height={15} />
												</div>
											) : nature.decreasedStat === statistic.name ? (
												<div
													key={statistic.name}
													className={`nature-statistic nature-decreased ${statistic.name}`}
												>
													{statistic.name === 'special-attack'
														? 'Sp. Attack'
														: statistic.name === 'special-defense'
															? 'Sp. Defense'
															: statistic.name === 'hp'
																? 'HP'
																: firstLetterMaj(
																		statistic.name
																	)}
													<ChevronsDown width={15} height={15} />
												</div>
											) : (
												<div
													key={statistic.name}
													className={`nature-statistic ${statistic.name}`}
												>
													{statistic.name === 'special-attack'
														? 'Sp. Attack'
														: statistic.name === 'special-defense'
															? 'Sp. Defense'
															: statistic.name === 'hp'
																? 'HP'
																: firstLetterMaj(
																		statistic.name
																	)}
												</div>
											)
										)}
									</div>
								</div>
							))
						) : (
							<h3>No natures found</h3>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default NaturesModal;
