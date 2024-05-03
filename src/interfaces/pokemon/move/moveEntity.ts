import { MetaEntity } from './metaEntity';

export interface MoveEntity {
	id: string;
	name: string;
	power: number;
	accuracy: number;
	pp: number;
	meta: MetaEntity;
	type: string;
	category: string;
	description: string;
	learnedBy: string[];
}
