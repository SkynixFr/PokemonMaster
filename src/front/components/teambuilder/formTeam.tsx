import React, { useEffect, useState } from 'react';

// Interfaces
import { AvatarEntity } from '../../../interfaces/avatar/avatarEntity';

// Components
import FormCreateTeam from './formCreateTeam';

// Images
import { Plus, Search } from 'lucide-react';
import { TeamEntity } from '../../../interfaces/team/teamEntity';

interface FormTeamProps {
	avatars: AvatarEntity[];
	setSelectedTeam: (team: TeamEntity) => void;
	setCurrentTeams: (teams: TeamEntity[]) => void;
	currentTeams: TeamEntity[];
	setCurrentLength: (length: number) => void;
}

const FormTeam = ({
	avatars,
	setSelectedTeam,
	currentTeams,
	setCurrentTeams,
	setCurrentLength
}: FormTeamProps) => {
	const [openForm, setOpenForm] = useState(false);
	const [defaultTeams, setDefaultTeams] = useState<TeamEntity[]>([]);
	const [searchTerm, setSearchTerm] = useState<string>('');

	useEffect(() => {
		filterTeams();
	}, [searchTerm]);

	useEffect(() => {
		setDefaultTeams(currentTeams);
	}, []);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	const handleTeamsSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const searchValue = e.target.value.toLowerCase();
		setSearchTerm(searchValue);
	};

	const filterTeams = () => {
		if (searchTerm === '') {
			setCurrentTeams(defaultTeams);
			setCurrentLength(defaultTeams.length);
			return;
		}

		const filteredTeams = defaultTeams.filter(team => {
			return team.name.toLowerCase().includes(searchTerm);
		});

		if (filteredTeams.length === 0) {
			setCurrentTeams([]);
			return;
		}

		setCurrentTeams(filteredTeams);
		setCurrentLength(filteredTeams.length);
	};

	return (
		<div className={'form-team-container'}>
			<div className={'teams-searchbar'}>
				<div className={'search-icon'}>
					<button className={'btn-search-team'}>
						<Search width={20} height={20} />
					</button>
				</div>
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						name="text"
						placeholder="Search a team"
						onChange={handleTeamsSearch}
					/>
				</form>
			</div>

			<div className={'btn-create-team-container'}>
				<button
					onClick={() => setOpenForm(!openForm)}
					className={'btn-create-team btn-primary '}
				>
					<Plus />
				</button>
			</div>
			{openForm && (
				<div className={'create-team-modal'}>
					<FormCreateTeam
						avatars={avatars}
						setOpenForm={setOpenForm}
						setSelectedTeam={setSelectedTeam}
						setCurrentTeams={setCurrentTeams}
						currentTeams={currentTeams}
						setCurrentLength={setCurrentLength}
					/>
				</div>
			)}
		</div>
	);
};

export default FormTeam;
