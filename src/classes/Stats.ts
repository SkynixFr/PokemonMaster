class Stats {
    private hp: number;
    private readonly attack: number;
    private readonly defense: number;
    private readonly spAttack: number;
    private readonly spDefense: number;
    private readonly speed: number;
    private readonly ev?: number;
    private readonly iv?: number;

    constructor(hp: number, attack: number, defense: number, spAttack: number, spDefense: number, speed: number, ev?: number, iv?: number) {
        this.hp = hp;
        this.attack = attack;
        this.defense = defense;
        this.spAttack = spAttack;
        this.spDefense = spDefense;
        this.speed = speed;
        this.ev = ev;
        this.iv = iv;
    }

    decreaseHp(damage: number) {
        this.hp -= damage;
    }

    increaseHp(heal: number) {
        this.hp += heal;
    }
}

export default Stats;