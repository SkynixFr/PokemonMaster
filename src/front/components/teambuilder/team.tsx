import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

// Interfaces
import { TeamEntity } from '../../../interfaces/team/teamEntity';
interface TeamListItemProps {
	team: TeamEntity;
	selectedTeam: TeamEntity;
	setSelectedTeam: (team: TeamEntity) => void;
	resetSelectedTeam?: () => void;
	option?: boolean;
}

// Components
import CustomImage from '../customImage';

// Icons
import { PencilLine, SaveAll, Trash2 } from 'lucide-react';

// Actions
import { deleteTeam } from '../../actions/team.actions';

const Team = ({
	team,
	selectedTeam,
	setSelectedTeam,
	option,
	resetSelectedTeam
}: TeamListItemProps) => {
	const router = useRouter();

	const handleDelete = async (teamId: string) => {
		toast.promise(deleteTeam(teamId), {
			loading: 'Deleting team...',
			success: () => {
				resetSelectedTeam();
				router.refresh();
				return 'Team deleted';
			},
			error: error => {
				return error.message;
			}
		});
	};

	return (
		<div className={'team-container'}>
			<div
				className={`team-infos ${selectedTeam.id === team.id ? 'selected' : ''}`}
				onClick={() => setSelectedTeam(team)}
			>
				<div className={'bg-team'}>
					<CustomImage
						src={team.avatar.sprite}
						alt={team.avatar.name}
						fill={true}
						sizes="(max-width: 768px) 116px, 116px"
					/>
				</div>
				<span>{team.name}</span>
				{team.pokemons && team.pokemons.length > 0 ? (
					<div className={'team-pokemon'}>
						{team.pokemons.map(pokemon => (
							<div key={pokemon.pokedexId}>{pokemon.name}</div>
						))}
					</div>
				) : (
					<div>No pokemons</div>
				)}
			</div>

			{option && team.id === selectedTeam.id ? (
				<div className={'team-options'}>
					<button onClick={() => router.push(`pokemonbuilder/${team.id}`)}>
						<PencilLine />
					</button>
					<button onClick={() => handleDelete(team.id)}>
						<Trash2 />
					</button>
					<button disabled={true}>
						<SaveAll />
					</button>
				</div>
			) : null}
		</div>
	);
};

export default Team;
