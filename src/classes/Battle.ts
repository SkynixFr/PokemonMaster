import Player from './Player';
import Team from './Team';

class Battle {
    private host: Player;
    private guest: Player;
    private hostTeam: Team;
    private guestTeam: Team;
    private turn?: number;

    constructor(host: Player, guest: Player, turn?: number) {
        this.host = host;
        this.guest = guest;
        this.hostTeam = host.team;
        this.guestTeam = guest.team;
        this.turn = turn ? turn : 0;
    }
}

export default Battle;