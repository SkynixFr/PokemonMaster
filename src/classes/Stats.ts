import { IStat } from "../types/interfaces/IPokemon";

class Stats {
    private readonly hp: number;
    private readonly attack: number;
    private readonly defense: number;
    private readonly spAttack: number;
    private readonly spDefense: number;
    private readonly speed: number;
    private readonly ev?: number;
    private readonly iv?: number;
    private currentHp?: number;


    constructor(stats: IStat) {
        this.hp = stats.hp;
        this.attack = stats.attack;
        this.defense = stats.defense;
        this.spAttack = stats.spAttack;
        this.spDefense = stats.spDefense;
        this.speed = stats.speed;
        this.ev = stats.ev;
        this.iv = stats.iv;
        this.currentHp = stats.hp;
    }

    decreaseHp(damage: number): void {
        this.currentHp -= damage;
    }

    increaseHp(heal: number): void {
        this.currentHp += heal;
    }
}

export default Stats;