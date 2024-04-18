'use client';
import { useState } from 'react';
import { toast } from 'sonner';

// Actions
import { updatePokemons } from '../../front/actions/dashboard.actions';

const DasboardPage = () => {
	const [isLoading, setIsLoading] = useState(false);

	const handleUpdatePokemons = async () => {
		setIsLoading(true);

		const response = await updatePokemons();
		if (response.status === 404) {
			toast.error('Failed to update pokemons');
		} else {
			toast.success('Pokemons updated');
		}

		setIsLoading(false);
	};

	return (
		<div>
			<h1>Admin dasboard</h1>
			<ul>
				<li>
					<button onClick={handleUpdatePokemons}>
						{isLoading ? 'Loading...' : 'Update Pokemons'}
					</button>
				</li>
				<li>
					<button disabled={true}>Update Items</button>
				</li>
				<li>
					<button>Update Moves</button>
				</li>
				<li>
					<button>Update Abilities</button>
				</li>
				<li>
					<button>Update Natures</button>
				</li>
			</ul>
		</div>
	);
};

export default DasboardPage;
