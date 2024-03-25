import Stats from '../classes/Stats';
import StatsBuilder from './utils/StatsBuilder';

describe('Stats', () => {
    let hp: number;
    let attack: number;
    let defense: number;
    let specialAttack: number;
    let specialDefense: number;
    let speed: number;
    let evs: number;
    let ivs: number;

    beforeEach(() => {
        hp = 100;
        attack = 100;
        defense = 100;
        specialAttack = 100;
        specialDefense = 100;
        speed = 100;
        evs = 100;
        ivs = 100;
    });

    test('should decrease hp correctly', () => {
        const stats = new Stats(hp, attack, defense, specialAttack, specialDefense, speed, evs, ivs);
        stats.decreaseHp(10);
        expect(stats).toStrictEqual(
            new StatsBuilder()
                .withHp(90)
                .withAttack(100)
                .withDefense(100)
                .withSpecialAttack(100)
                .withSpecialDefense(100)
                .withSpeed(100)
                .withEvs(100)
                .withIvs(100)
                .build()
        );
    });

    test('should increase hp correctly', () => {
        const stats = new Stats(hp, attack, defense, specialAttack, specialDefense, speed, evs, ivs);
        stats.increaseHp(10);
        expect(stats).toStrictEqual(
            new StatsBuilder()
                .withHp(110)
                .withAttack(100)
                .withDefense(100)
                .withSpecialAttack(100)
                .withSpecialDefense(100)
                .withSpeed(100)
                .withEvs(100)
                .withIvs(100)
                .build()
        );
    });
});