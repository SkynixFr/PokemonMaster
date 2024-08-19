import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

// Interfaces
import { TeamEntity } from '../../../interfaces/team/teamEntity';
interface TeamListItemProps {
	team: TeamEntity;
	selectedTeam: TeamEntity;
	setSelectedTeam: (team: TeamEntity) => void;
	setCurrentTeams: (teams: TeamEntity[]) => void;
	currentTeams: TeamEntity[];
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
	resetSelectedTeam,
	setCurrentTeams,
	currentTeams
}: TeamListItemProps) => {
	const router = useRouter();

	const handleDelete = async (teamId: string) => {
		toast.promise(deleteTeam(teamId), {
			loading: 'Deleting team...',
			success: () => {
				resetSelectedTeam();
				setCurrentTeams(currentTeams.filter(team => team.id !== teamId));
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
				className={`team-infos ${selectedTeam?.id === team.id ? 'selected' : ''}`}
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
							<CustomImage
								src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.pokedexId}.png`}
								alt={pokemon.name}
								width={40}
								height={40}
							/>
						))}
					</div>
				) : (
					<div>No pokemons</div>
				)}
			</div>

			{option && team.id === selectedTeam?.id ? (
				<div className={'team-options'}>
					<button onClick={() => router.push(`pokemonbuilder/${team.id}`)}>
						<PencilLine />
					</button>
					<button onClick={() => handleDelete(team.id)}>
						<Trash2 />
					</button>
					<button disabled style={{ cursor: 'not-allowed' }}>
						<SaveAll />
					</button>
				</div>
			) : null}
		</div>
	);
};

export default Team;
