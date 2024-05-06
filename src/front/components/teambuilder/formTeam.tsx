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
				<input
					type="search"
					name="search"
					placeholder="Search a team"
					disabled={true}
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
					<FormCreateTeam avatars={avatars} setOpenForm={setOpenForm} />
				</div>
			)}
		</div>
	);
};

export default FormTeam;
