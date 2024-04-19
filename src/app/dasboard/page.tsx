'use client';
import { useState } from 'react';
import { toast } from 'sonner';

// Actions
import {
	updateMoves,
	updatePokemons
} from '../../front/actions/dashboard.actions';

const DasboardPage = () => {
	const [isLoading, setIsLoading] = useState(false);

	const handleUpdatePokemons = async () => {
		setIsLoading(true);
		toast.promise(updatePokemons(), {
			loading: 'Updating pokemons...',
			success: response => {
				setIsLoading(false);
				return `${response.length} pokemons updated`;
			},
			error: error => {
				setIsLoading(false);
				return error.message;
			},
			duration: null
		});
	};

	const handleUpdateMoves = async () => {
		setIsLoading(true);
		toast.promise(updateMoves(), {
			loading: 'Updating moves...',
			success: response => {
				setIsLoading(false);
				return `${response.length} moves updated`;
			},
			error: error => {
				setIsLoading(false);
				return error.message;
			},
			duration: null
		});
	};

	return (
		<div>
			<h1>Admin dasboard</h1>
			<ul>
				<li>
					<button onClick={handleUpdatePokemons} disabled={isLoading}>
						Update Pokemons
					</button>
				</li>
				<li>
					<button disabled={true}>Update Items</button>
				</li>
				<li>
					<button onClick={handleUpdateMoves} disabled={isLoading}>
						Update Moves
					</button>
				</li>
				<li>
					<button disabled={isLoading}>Update Abilities</button>
				</li>
				<li>
					<button disabled={isLoading}>Update Natures</button>
				</li>
			</ul>
		</div>
	);
};

export default DasboardPage;
