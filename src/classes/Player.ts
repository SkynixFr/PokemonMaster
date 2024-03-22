import Team from './Team';

class Player {
    readonly name: string;
    readonly team: Team;

    constructor(name: string, team: Team) {
        this.name = name;
        this.team = team;
    }
}

export default Player;