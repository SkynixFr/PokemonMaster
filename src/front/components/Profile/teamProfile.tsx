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
	setCurrentLength?: (length: number) => void;
}

// Components
import CustomImage from '../customImage';

// Icons
import { Copy, PencilLine, Trash2 } from 'lucide-react';

// Actions
import { copyTeam, deleteTeam } from '../../actions/team.actions';

const TeamProfile = ({
	team,
	selectedTeam,
	setSelectedTeam,
	option,
	resetSelectedTeam,
	setCurrentTeams,
	currentTeams,
	setCurrentLength
}: TeamListItemProps) => {
	const router = useRouter();

	const handleDelete = async (teamId: string) => {
		toast.promise(deleteTeam(teamId), {
			loading: 'Deleting team...',
			success: () => {
				resetSelectedTeam();
				setCurrentTeams(currentTeams.filter(team => team.id !== teamId));
				setCurrentLength(currentTeams.length - 1);
				router.refresh();
				return 'Team deleted';
			},
			error: error => {
				return error.message;
			}
		});
	};

	const handleCopy = (team: TeamEntity) => {
		const getNextCopyName = (name: string) => {
			let copyNumber = 1;
			let newName = `${name} (${copyNumber})`;

			while (currentTeams.some(team => team.name === newName)) {
				copyNumber++;
				newName = `${name} (${copyNumber})`;
			}
			return newName;
		};

		const newTeam = { ...team };
		newTeam.id = `${team.id}-${Date.now()}`;
		newTeam.name = getNextCopyName(team.name);

		if (currentTeams.length >= 15) {
			return toast.error('You have reached the limit of 15 teams');
		}

		setCurrentTeams([...currentTeams, newTeam]);

		toast.promise(copyTeam(newTeam), {
			loading: 'Creating team...',
			success: response => {
				if (response.status) {
					throw new Error(response.message);
				}
				setSelectedTeam(response);
				setCurrentTeams([...currentTeams, response]);
				setCurrentLength(currentTeams.length + 1);
				router.refresh();
				return `${response.name} copied successfully!`;
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
						width={500}
						height={500}
						sizes={'100vw'}
					/>
				</div>
				<span>{team.name}</span>
				{team.pokemons && team.pokemons.length > 0 ? (
					<div className={'user-team-pokemon'}>
						{team.pokemons.map((pokemon, index) => (
							<CustomImage
								src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.pokedexId}.png`}
								alt={pokemon.name}
								width={40}
								height={40}
								key={index}
							/>
						))}
					</div>
				) : (
					<div>No pokemons</div>
				)}
			</div>

			{option && team.id === selectedTeam?.id ? (
				<div className={'user-team-options'}>
					<button onClick={() => router.push('teambuilder')}>
						<PencilLine />
					</button>
				</div>
			) : null}
		</div>
	);
};

export default TeamProfile;
