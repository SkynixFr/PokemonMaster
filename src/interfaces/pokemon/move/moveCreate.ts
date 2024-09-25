import { MetaEntity } from './metaEntity';
import { StatChangeEntity } from '../statChange/statChangeEntity';

export interface MoveCreate {
	name: string;
	power: number;
	accuracy: number;
	pp: number;
	maxPp: number;
	meta: MetaEntity;
	type: string;
	category: string;
	description: string;
	learnedBy: string[];
	statsChange: StatChangeEntity[];
	target: string;
}
