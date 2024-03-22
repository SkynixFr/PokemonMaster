import Stats from '../../classes/Stats';

class StatsBuilder {
    private hp: number;
    private attack: number;
    private defense: number;
    private specialAttack: number;
    private specialDefense: number;
    private speed: number;
    private evs: number;
    private ivs: number;

    default(): Stats {
        return new StatsBuilder().build()
    }

    build(): Stats {
        return new Stats(this.hp, this.attack, this.defense, this.specialAttack, this.specialDefense, this.speed, this.evs, this.ivs);
    }

    withHp(hp: number): StatsBuilder {
        this.hp = hp;
        return this;
    }

    withAttack(attack: number): StatsBuilder {
        this.attack = attack;
        return this;
    }

    withDefense(defense: number): StatsBuilder {
        this.defense = defense;
        return this;
    }

    withSpecialAttack(specialAttack: number): StatsBuilder {
        this.specialAttack = specialAttack;
        return this;
    }

    withSpecialDefense(specialDefense: number): StatsBuilder {
        this.specialDefense = specialDefense;
        return this;
    }

    withSpeed(speed: number): StatsBuilder {
        this.speed = speed;
        return this;
    }

    withEvs(evs: number): StatsBuilder {
        this.evs = evs;
        return this;
    }

    withIvs(ivs: number): StatsBuilder {
        this.ivs = ivs;
        return this;
    }
}

export default StatsBuilder;