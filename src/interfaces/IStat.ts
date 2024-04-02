export default interface IStat {
	name: string;
	value: number;
	max?: number;
	increase?(value: number): IStat;
	decrease?(value: number): IStat;
}
