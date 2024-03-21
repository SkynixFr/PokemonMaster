class Team {
    id?: string;
    name: string;
    avatar?: string;
    pokemons?: string[];

    constructor(name: string, avatar?: string, pokemons?: string[]) {
        this.name = name;
        this.avatar = avatar;
        this.pokemons = pokemons;
    }

    static fromJson(json: any): Team {
        return new Team(json.name, json.avatar, json.pokemons);
    }

    toJson(): any {
        return {
            name: this.name,
            avatar: this.avatar,
            pokemons: this.pokemons
        };
    }
}

export default Team;