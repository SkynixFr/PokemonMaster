type Pokemon = {
	id: number;
	name: string;
	moves: Move[];
	nature?: string;
	level?: number;
	gender?: string;
	isShiny?: boolean;
	types?: Type[];
	stats?: Stat;
	ability?: Ability;
	item?: Item;
	sprites?: Sprites;
};

export type Type = {
	name: string;
};

export type Move = {
	name: string;
	type: Type;
	category: string;
	power: number;
	accuracy: number;
	pp: number;
	description: string;
	effect: string;
};

export type Stat = {
	hp: number;
	attack: number;
	defense: number;
	spAttack: number;
	spDefense: number;
	speed: number;
	ev?: number;
	iv?: number;
};

export type Ability = {
	name: string;
	description: string;
};

export type Item = {
	name: string;
	description: string;
	image: string;
};

export type Sprites = {
	back_default: string;
	back_female: string;
	back_shiny: string;
	back_shiny_female: string;
	front_default: string;
	front_female: string;
	front_shiny: string;
	front_shiny_female: string;
	showdown: {
		back_default: string;
		back_female: string;
		back_shiny: string;
		back_shiny_female: string;
		front_default: string;
		front_female: string;
		front_shiny: string;
		front_shiny_female: string;
	};
};

export default Pokemon;
