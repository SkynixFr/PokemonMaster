export interface AvatarCreate {
	name: string;
	region:
		| 'Kanto'
		| 'Johto'
		| 'Hoenn'
		| 'Sinnoh'
		| 'Unova'
		| 'Kalos'
		| 'Alola'
		| 'Galar'
		| 'Hisui'
		| 'Other';
	sprite: string;
}
