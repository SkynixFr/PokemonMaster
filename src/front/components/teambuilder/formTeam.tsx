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
	teams: TeamEntity[];
	setcurrentTeams: (teams: TeamEntity[]) => void;
}

const FormTeam = ({
	avatars,
	setSelectedTeam,
	teams,
	setcurrentTeams
}: FormTeamProps) => {
	const [openForm, setOpenForm] = useState(false);
	const [defaultTeams, setDefaultTeams] = useState<TeamEntity[]>(teams);
	const [searchTerm, setSearchTerm] = useState<string>('');

	useEffect(() => {
		filterTeams();
	}, [searchTerm]);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	const handleTeamsSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const searchValue = e.target.value.toLowerCase();
		setSearchTerm(searchValue);
	};

	const filterTeams = () => {
		if (searchTerm === '') {
			setcurrentTeams(defaultTeams);
			return;
		}

		const filteredTeams = defaultTeams.filter(team =>
			team.name.toLowerCase().includes(searchTerm)
		);

		if (filteredTeams.length === 0) {
			toast.error('No teams found, bad name');
			return;
		}

		setcurrentTeams(filteredTeams);
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
				<div className={'hover-info'}>
					<span>Create a team</span>
				</div>
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
						setCurrentTeams={setcurrentTeams}
					/>
				</div>
			)}
		</div>
	);
};

export default FormTeam;
