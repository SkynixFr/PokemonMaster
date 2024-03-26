type BattleEffect = {
	name: string;
	number?: number;
	type?: 'buff' | 'debuff' | 'status';
	turns?: number;
};

export default BattleEffect;
