import { useState } from 'react';

// Interfaces
import { AvatarEntity } from '../../../interfaces/avatar/avatarEntity';

// Components
import FormCreateTeam from './formCreateTeam';

interface FormTeamProps {
	avatars: AvatarEntity[];
}

const FormTeam = ({ avatars }: FormTeamProps) => {
	const [openForm, setOpenForm] = useState(false);
	return (
		<div>
			<form action="">
				<input type="search" name="search" placeholder="Search a team" />
				<button>Search</button>
			</form>
			<button onClick={() => setOpenForm(!openForm)}>Add a team</button>
			{openForm && (
				<FormCreateTeam avatars={avatars} setOpenForm={setOpenForm} />
			)}
		</div>
	);
};

export default FormTeam;
