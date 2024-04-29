import IMetaEntity from './IMetaEntity';

export default interface IMove {
	name: string;
	power?: number;
	accuracy?: number;
	pp?: number;
	meta?: IMetaEntity;
	type?: string;
	category?: string;
	description?: string;
	learnedBy?: string[];
}
