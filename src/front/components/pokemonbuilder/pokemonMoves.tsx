// Interfaces
import { MoveEntity } from '../../../interfaces/pokemon/move/moveEntity';
interface PokemonMovesProps {
	movesActive: MoveEntity[];
}

const PokemonMoves = ({ movesActive }: PokemonMovesProps) => {
	return (
		<div className="pokemon-moves">
			<h3>Moves</h3>
			<div className={'list-moves'}>
				{movesActive
					? Array.from({ length: 4 }).map((_, index) => (
							<button className={'pokemon-move'} key={index}>
								{movesActive[index]
									? movesActive[index].name
									: 'No move'}
							</button>
						))
					: Array.from({ length: 4 }).map((_, index) => (
							<button key={index} className={'pokemon-move'}>
								No move
							</button>
						))}
			</div>
		</div>
	);
};

export default PokemonMoves;
