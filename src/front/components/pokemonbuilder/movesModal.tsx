import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

// Icons
import { Search, X } from 'lucide-react';

// Utils
import { firstLetterMaj } from '../../utils/formatString';
import { attackTypeGradients } from '../../utils/type/attackTypeGradients';

// Actions
import { getMoves } from '../../actions/move.actions';

// Components
import CustomImage from '../customImage';

// Interfaces
import { MoveEntity } from '../../../interfaces/pokemon/move/moveEntity';
import { PokemonTeamEntity } from '../../../interfaces/pokemon/pokemonTeamEntity';
interface MovesModalProps {
	movesActive: MoveEntity[];
	setMovesActive: (moves: MoveEntity[]) => void;
	setOpenMoveIndex: (index: number | null) => void;
	pokemon: PokemonTeamEntity;
}

const MovesModal = ({
	movesActive,
	setMovesActive,
	setOpenMoveIndex,
	pokemon
}: MovesModalProps) => {
	const [moves, setMoves] = useState<MoveEntity[]>([]);
	const [defaultMoves, setDefaultMoves] = useState<MoveEntity[]>([]);
	const [searchTerm, setSearchTerm] = useState<string>('');

	useEffect(() => {
		const fetchMoves = async () => {
			try {
				const fetchedMoves = await getMoves();
				const filteredMoves = fetchedMoves.filter((move: MoveEntity) =>
					move.learnedBy.includes(pokemon.name)
				);
				filteredMoves.sort((a: MoveEntity, b: MoveEntity) =>
					a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
				);
				setMoves(filteredMoves);
				setDefaultMoves(filteredMoves);
			} catch (error) {
				console.error(error);
			}
		};
		fetchMoves().then();
	}, [pokemon]);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				setOpenMoveIndex(null);
			}
		};

		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [setOpenMoveIndex]);

	useEffect(() => {
		filterMoves();
	}, [searchTerm]);

	const handleMoves = (move: MoveEntity) => {
		if (movesActive.find(m => m.name === move.name)) {
			const newMoves = movesActive.filter(m => m.name !== move.name);
			setMovesActive(newMoves);
		} else {
			if (movesActive.length === 4) {
				toast.error('You can only have 4 moves on a Pokemon');
				return;
			}
			const newMoves = [...movesActive, move];
			setMovesActive(newMoves);
		}
	};

	const handleMovesSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const searchValue = e.target.value.toLowerCase();
		setSearchTerm(searchValue);
	};

	const filterMoves = () => {
		if (searchTerm === '') {
			setMoves(defaultMoves);
			return;
		}

		const filteredMoves = defaultMoves.filter(move =>
			firstLetterMaj(move.name).toLowerCase().includes(searchTerm)
		);

		if (filteredMoves.length === 0) {
			setMoves([]);
			return;
		}

		setMoves(filteredMoves);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	return (
		<div className={'moves-modal pokemon-infos-modal-container'}>
			<div className={'moves-modal-container'}>
				<div className="moves-modal-header">
					<h2>Moves</h2>
				</div>
				<button
					className={'close-btn'}
					onClick={() => setOpenMoveIndex(null)}
				>
					<X width={30} height={30} />
				</button>
				<div className={'moves-searchbar'}>
					<div className={'search-icon'}>
						<button className={'btn-search-natures'}>
							<Search width={20} height={20} />
						</button>
					</div>

					<form onSubmit={handleSubmit}>
						<input
							type="text"
							placeholder="Search for a move..."
							onChange={handleMovesSearch}
						/>
					</form>
				</div>

				<div
					className={`moves-selected ${movesActive.length > 0 ? 'displayed' : ''}`}
				>
					{movesActive.map((move: MoveEntity) => (
						<div
							key={move.name}
							className={`moves-selected-move`}
							onClick={() => {
								handleMoves(move);
							}}
							style={{ background: attackTypeGradients[move.type] }}
						>
							<div className={'display-moves-selected-move-name'}>
								{firstLetterMaj(move.name)}
							</div>
							{pokemon.types.map(type =>
								type.name === move.type ? (
									<span className={'badge-stab'}>Stab</span>
								) : null
							)}
						</div>
					))}
				</div>

				<div className="moves-modal-body">
					<div className={'moves-table-title'}>
						<div className={'moves-table-title-name'}>Name</div>
						<div className={'moves-table-title-type'}>Type</div>
						<div className={'moves-table-title-category'}>Category</div>
						<div className={'moves-table-title-power'}>Power</div>
						<div className={'moves-table-title-accuracy'}>Accuracy</div>
						<div className={'moves-table-title-pp'}>PP</div>
						<div className={'moves-table-title-description'}>
							Description
						</div>
					</div>
					<div className={'moves-list'}>
						{moves.length > 0 ? (
							moves.map((move: MoveEntity) => (
								<div
									key={move.name}
									className={`moves-list-item ${
										movesActive.find(m => m.name === move.name)
											? 'active'
											: ''
									}`}
									onClick={() => {
										handleMoves(move);
									}}
								>
									<div className={'move-name'}>
										{firstLetterMaj(move.name)}
									</div>
									<div className={'move-type'}>
										<CustomImage
											src={`/images/compressed/types/${move.type}.png`}
											alt={move.type}
											width={25}
											height={25}
										/>
									</div>
									<div className={'move-category'}>
										{move.category === 'physical' ? (
											<CustomImage
												src={`/images/compressed/types/physique.png`}
												alt={move.type}
												width={40}
												height={20}
											/>
										) : move.category === 'special' ? (
											<CustomImage
												src={`/images/compressed/types/special.png`}
												alt={move.type}
												width={40}
												height={20}
											/>
										) : (
											<CustomImage
												src={`/images/compressed/types/alteration.png`}
												alt={move.type}
												width={40}
												height={20}
											/>
										)}
									</div>
									<div className={'move-power'}>
										{move.power ? move.power : '-'}
									</div>
									<div className={'move-accuracy'}>
										{move.accuracy ? move.accuracy : '-'}
									</div>
									<div className={'move-pp'}>{move.pp}</div>
									<div className={'move-description'}>
										{move.description}
									</div>
									{pokemon.types.map(type =>
										type.name === move.type ? (
											<span className={'badge-stab item'}>Stab</span>
										) : null
									)}
								</div>
							))
						) : (
							<h3>No moves found</h3>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default MovesModal;
