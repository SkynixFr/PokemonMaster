import { useState } from 'react';

// Interfaces
import { AvatarEntity } from '../../../interfaces/avatar/avatarEntity';

// Components
import FormCreateTeam from './formCreateTeam';

// Images
import { Plus, Search } from 'lucide-react';

interface FormTeamProps {
	avatars: AvatarEntity[];
}

const FormTeam = ({ avatars }: FormTeamProps) => {
	const [openForm, setOpenForm] = useState(false);
	return (
		<div className={'form-team-container'}>
			<form action="" className={'search-team'}>
				<input type="search" name="search" placeholder="Search a team" />
				<button className={'btn-search-team btn-primary'}>
					<Search width={20} height={20} />
				</button>
			</form>
			<button
				onClick={() => setOpenForm(!openForm)}
				className={'btn-add-team btn-primary '}
			>
				<Plus />
			</button>
			{openForm && (
				<div className={'create-team-modal'}>
					<FormCreateTeam avatars={avatars} setOpenForm={setOpenForm} />
				</div>
			)}
		</div>
	);
};

export default FormTeam;
