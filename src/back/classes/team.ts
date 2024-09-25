import Pokemon from './pokemon';

class Team {
	readonly id: string;
	readonly name: string;
	readonly avatar: {
		id: string;
		name: string;
		region: string;
		sprite: string;
	};
	readonly pokemons: Pokemon[];

	constructor(
		id: string,
		name: string,
		avatar: { id: string; name: string; region: string; sprite: string },
		pokemons: Pokemon[]
	) {
		this.id = id;
		this.name = name;
		this.avatar = avatar;
		this.pokemons = pokemons;
	}
}

export default Team;
