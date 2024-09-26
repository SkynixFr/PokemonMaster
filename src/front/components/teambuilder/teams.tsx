// Components
import Team from './team';

// DND
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

// Interfaces
import { TeamEntity } from '../../../interfaces/team/teamEntity';
import { useEffect, useState } from 'react';
import FormTeam from './formTeam';
import { AvatarEntity } from '../../../interfaces/avatar/avatarEntity';

interface TeamsProps {
	teams: TeamEntity[];
	setSelectedTeam: (team: TeamEntity) => void;
	selectedTeam: TeamEntity;
	avatars: AvatarEntity[];
	setCurrentLength: (length: number) => void;
}

const Teams = ({
	teams,
	selectedTeam,
	setSelectedTeam,
	avatars,
	setCurrentLength
}: TeamsProps) => {
	const [currentTeams, setCurrentTeams] = useState<TeamEntity[]>([]);

	const handleSelectedTeam = (team: TeamEntity) => {
		setSelectedTeam(team);
	};

	const resetSelectedTeam = () => {
		setSelectedTeam(teams.filter(team => team.id !== selectedTeam.id)[0]);
	};

	useEffect(() => {
		if (teams && teams.length > 0) {
			if (localStorage.getItem('teamActive')) {
				teams.map(team => {
					if (team.id === localStorage.getItem('teamActive')) {
						setSelectedTeam(team);
					}
				});
			} else {
				setSelectedTeam(teams[0]);
			}
			setCurrentTeams(teams);
		}
	}, [teams]);

	const reorder = (
		list: TeamEntity[],
		startIndex: number,
		endIndex: number
	) => {
		const result = Array.from(list);
		const [removed] = result.splice(startIndex, 1);
		result.splice(endIndex, 0, removed);
		return result;
	};

	const onDragEnd = (result: any) => {
		if (!result.destination) return;

		const sourceIndex = result.source.index;
		const destinationIndex = result.destination.index;
		const items = reorder(currentTeams, sourceIndex, destinationIndex);

		setCurrentTeams(items);
	};

	return (
		<>
			<FormTeam
				avatars={avatars}
				setSelectedTeam={setSelectedTeam}
				setCurrentTeams={setCurrentTeams}
				currentTeams={teams}
				setCurrentLength={setCurrentLength}
			/>

			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId="vertical-list-teams" direction="vertical">
					{provided => (
						<div
							className="teams-container"
							{...provided.droppableProps}
							ref={provided.innerRef}
						>
							{currentTeams && currentTeams.length > 0 ? (
								<>
									<h3>Your teams</h3>
									<div className="teams-list">
										{currentTeams.map((team, index) => (
											<Draggable
												key={team.id}
												draggableId={team.id}
												index={index}
											>
												{provided => (
													<div
														ref={provided.innerRef}
														{...provided.draggableProps}
														{...provided.dragHandleProps}
														className={'teams-list-draggable'}
													>
														<Team
															team={team}
															selectedTeam={selectedTeam}
															setSelectedTeam={() =>
																handleSelectedTeam(team)
															}
															resetSelectedTeam={
																resetSelectedTeam
															}
															setCurrentTeams={setCurrentTeams}
															currentTeams={currentTeams}
															setCurrentLength={setCurrentLength}
															option={true}
														/>
													</div>
												)}
											</Draggable>
										))}
									</div>
									{provided.placeholder}
								</>
							) : (
								<div>No teams found</div>
							)}
						</div>
					)}
				</Droppable>
			</DragDropContext>
		</>
	);
};

export default Teams;
