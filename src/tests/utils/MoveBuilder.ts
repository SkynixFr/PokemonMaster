import Move from '../../classes/Move';
import Type from '../../classes/Type';

class MoveBuilder {
    private name: string;
    private type: Type;
    private category: string;
    private power: number;
    private accuracy: number;
    private pp: number;
    private description: string;
    private effect: string;

    default(): Move {
        return new MoveBuilder().build()
    }

    build(): Move {
        return new Move(this.name, this.type, this.category, this.power, this.accuracy, this.pp, this.description, this.effect);
    }

    withName(name: string): MoveBuilder {
        this.name = name;
        return this;
    }

    withType(type: Type): MoveBuilder {
        this.type = type;
        return this;
    }

    withCategory(category: string): MoveBuilder {
        this.category = category;
        return this;
    }

    withPower(power: number): MoveBuilder {
        this.power = power;
        return this;
    }

    withAccuracy(accuracy: number): MoveBuilder {
        this.accuracy = accuracy;
        return this;
    }

    withPp(pp: number): MoveBuilder {
        this.pp = pp;
        return this;
    }

    withDescription(description: string): MoveBuilder {
        this.description = description;
        return this;
    }

    withEffect(effect: string): MoveBuilder {
        this.effect = effect;
        return this;
    }
}

export default MoveBuilder;