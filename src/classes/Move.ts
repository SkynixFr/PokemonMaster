import Type from './Type';

class Move {

    private readonly name: string;
    private readonly type: Type;
    private readonly category: string;
    private readonly power: number;
    private readonly accuracy: number;
    private pp: number;
    private readonly description: string;
    private readonly effect: string;

    constructor(name: string, type: Type, category: string, power: number, accuracy: number, pp: number, description: string, effect: string) {
        this.name = name;
        this.type = type;
        this.category = category;
        this.power = power;
        this.accuracy = accuracy;
        this.pp = pp;
        this.description = description;
        this.effect = effect;
    }

    decreasePp(): void {
        this.pp -= 1;
    }

    increasePp(): void {
        this.pp += 1;
    }
}

export default Move;