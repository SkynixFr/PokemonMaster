import React, { useEffect, useState } from 'react';

// Interfaces
import { AvatarEntity } from '../../../interfaces/avatar/avatarEntity';

// Components
import FormCreateTeam from './formCreateTeam';

// Images
import { Plus, Search } from 'lucide-react';
import { TeamEntity } from '../../../interfaces/team/teamEntity';
import { toast } from 'sonner';

interface FormTeamProps {
	avatars: AvatarEntity[];
	setSelectedTeam: (team: TeamEntity) => void;
	setCurrentTeams: (teams: TeamEntity[]) => void;
	currentTeams: TeamEntity[];
}

const FormTeam = ({
	avatars,
	setSelectedTeam,
	currentTeams,
	setCurrentTeams
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
			return;
		}

		const filteredTeams = defaultTeams.filter(team => {
			return team.name.toLowerCase().includes(searchTerm);
		});

		if (filteredTeams.length === 0) {
			toast.error('No teams found, bad name');
			return;
		}

		setCurrentTeams(filteredTeams);
	};

	return (
		<div className={'form-team-container'}>
			<form className={'search-team'} onSubmit={handleSubmit}>
				<input
					type="search"
					name="search"
					placeholder="Search a team"
					onChange={handleTeamsSearch}
				/>
				<button className={'btn-search-team btn-primary'}>
					<Search width={20} height={20} />
				</button>
			</form>
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
					/>
				</div>
			)}
		</div>
	);
};

export default FormTeam;
