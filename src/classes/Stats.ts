import { IStat } from "../types/interfaces/IPokemon";

class Stats {
    hp: number;
    attack: number;
    defense: number;
    spAttack: number;
    spDefense: number;
    speed: number;
    ev?: number;
    iv?: number;
    currentHp?: number;;


    constructor(stats: IStat) {
        this.hp = stats.hp;
        this.attack = stats.attack;
        this.defense = stats.defense;
        this.spAttack = stats.spAttack;
        this.spDefense = stats.spDefense;
        this.speed = stats.speed;
        this.ev = stats.ev;
        this.iv = stats.iv;
        this.currentHp = stats.currentHp;
    }

    decreaseHp(damage: number): void {
        this.currentHp -= damage;
    }

    increaseHp(heal: number): void {
        this.currentHp += heal;
    }
}

export default Stats;