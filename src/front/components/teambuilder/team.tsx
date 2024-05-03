// Interfaces
import { TeamEntity } from '../../../interfaces/team/teamEntity';
interface TeamListItemProps {
	team: TeamEntity;
	selectedTeam: TeamEntity;
	setSelectedTeam: (team: TeamEntity) => void;
	option?: boolean;
}

// Components
import CustomImage from '../customImage';

// Icons
import { PencilLine, SaveAll, Trash2 } from 'lucide-react';

const Team = ({
	team,
	selectedTeam,
	setSelectedTeam,
	option
}: TeamListItemProps) => {
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
					<button>
						<PencilLine />
					</button>
					<button>
						<Trash2 />
					</button>
					<button>
						<SaveAll />
					</button>
				</div>
			) : null}
		</div>
	);
};

export default Team;
