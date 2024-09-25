import Move from '../../../back/classes/move';

export const THAW_CHANCE = 0.2;
export const PARALYSIS_CHANCE = 0.75;
export const CONFUSED_MOVE = new Move(
	'confused',
	40,
	100,
	10,
	{
		ailment: '',
		drain: 0,
		healing: 0,
		critRate: 0,
		priority: 0,
		effectChance: 0,
		flinchChance: 0,
		statChance: 0,
		minHits: 0,
		maxHits: 0,
		minTurns: 0,
		maxTurns: 0
	},
	'user'
);
