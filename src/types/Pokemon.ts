type Pokemon = {
	name: string;
	types: Type[];
	moves: Move[];
	stats: Stat[];
	ability: Ability;
	item: Item;
	nature: string;
	level: number;
	pokedex: number;
	gender: string;
	description: string;
	isShiny: boolean;
};

type Type = {
	name: string;
};

type Move = {
	name: string;
	type: Type;
	category: string;
	power: number;
	accuracy: number;
	pp: number;
	description: string;
	effect: string;
};

type Stat = {
	hp: number;
	attack: number;
	defense: number;
	spAttack: number;
	spDefense: number;
	speed: number;
	ev: number;
	iv: number;
};

type Ability = {
	name: string;
	description: string;
};

type Item = {
	name: string;
	description: string;
	image: string;
};

export default Pokemon;
