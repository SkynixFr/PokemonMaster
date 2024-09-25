import { useState } from 'react';

// Utils
import { firstLetterMaj } from '../../utils/formatString';

// Components
import MovesModal from './movesModal';
import CustomImage from '../customImage';

// Interfaces
import { MoveEntity } from '../../../interfaces/pokemon/move/moveEntity';
import { PokemonTeamEntity } from '../../../interfaces/pokemon/pokemonTeamEntity';
interface PokemonMovesProps {
	movesActive: MoveEntity[];
	setMovesActive: (moves: MoveEntity[]) => void;
	pokemon: PokemonTeamEntity;
}

const PokemonMoves = ({
	movesActive,
	setMovesActive,
	pokemon
}: PokemonMovesProps) => {
	const [openMoveIndex, setOpenMoveIndex] = useState<number | null>(null);

	const handleMoveClick = (index: number) => {
		setOpenMoveIndex(index === openMoveIndex ? null : index);
	};

	return (
		<div className="pokemon-moves">
			<h3>Moves</h3>
			<div className={'list-moves'}>
				{Array.from({ length: 4 }).map((_, index) =>
					movesActive[index] ? (
						<div
							className={'pokemon-move-fullfilled default'}
							onClick={() => handleMoveClick(index)}
						>
							<CustomImage
								src={`/images/types/${movesActive[index].type}.png`}
								alt={movesActive[index].type}
								width={20}
								height={20}
							/>

							<div className={'pokemon-move-fullfilled infos'}>
								<div>{firstLetterMaj(movesActive[index].name)}</div>
								<div>
									{movesActive[index].pp}/{movesActive[index].maxPp}
								</div>
							</div>
						</div>
					) : (
						<button
							key={index}
							className={`pokemon-move`}
							onClick={() => handleMoveClick(index)}
							disabled={
								index > 0 && (!movesActive || !movesActive[index - 1])
							}
						>
							No move
						</button>
					)
				)}
			</div>
			{openMoveIndex !== null && (
				<MovesModal
					movesActive={movesActive}
					setMovesActive={setMovesActive}
					setOpenMoveIndex={setOpenMoveIndex}
					pokemon={pokemon}
				/>
			)}
		</div>
	);
};

export default PokemonMoves;
