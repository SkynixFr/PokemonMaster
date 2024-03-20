type Pokemon = {
	name: string;
	url?: string;
	id: number;
	height?: number;
	weight?: number;
	abilities?: string[];
	types?: string[];
	stats?: {
		hp: number;
		attack: number;
		defense: number;
		specialAttack: number;
		specialDefense: number;
		speed: number;
	};
	image?: string;
	moves?: string[];
	species?: string;
	base_experience?: number;
	order?: number;
	is_default?: boolean;
	location_area_encounters?: string;
	held_items?: string[];
	game_indices?: string[];
	forms?: string[];
	flavor_text_entries?: string;
	sprites?: string[];
};

export default Pokemon;
