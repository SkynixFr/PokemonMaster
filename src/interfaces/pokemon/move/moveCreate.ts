import { MetaEntity } from './metaEntity';

export interface MoveCreate {
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
