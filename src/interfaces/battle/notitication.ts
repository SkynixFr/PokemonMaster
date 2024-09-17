export interface Notification {
	pokemonName: string;
	move?: {
		name: string;
		type: string;
	};
	userAvatar: {
		name: string;
		sprite: string;
	};
	isKo?: boolean;
}
