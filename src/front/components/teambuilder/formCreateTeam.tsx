// Components
import Avatar from './avatar';

// Interfaces
import { AvatarEntity } from '../../../interfaces/avatar/avatarEntity';
interface FormCreateTeamProps {
	avatars: AvatarEntity[];
	setOpenForm: (openForm: boolean) => void;
}

const formCreateTeam = ({ avatars, setOpenForm }: FormCreateTeamProps) => {
	return (
		<div>
			<form>
				<input type="text" name="name" placeholder="Team name" />
				<button>Create</button>
				{avatars && avatars.length > 0 ? (
					avatars.map(avatar => <Avatar avatar={avatar} key={avatar.id} />)
				) : (
					<div>No avatars found</div>
				)}
			</form>

			<button onClick={() => setOpenForm(false)}>Close</button>
		</div>
	);
};

export default formCreateTeam;
