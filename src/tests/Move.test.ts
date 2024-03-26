import Move from "../classes/Move";
import Type from "../classes/Type";
import TypeBuilder from "./utils/TypeBuilder";
import MoveBuilder from "./utils/MoveBuilder";

describe('Move', () => {
    let name: string;
    let type: Type;
    let category: string;
    let power: number;
    let accuracy: number;
    let pp: number;
    let description: string;
    let effect: string;

    beforeEach(() => {
        name = 'Thunderbolt';
        type = new TypeBuilder().withName('Electric').build();
        category = 'Special';
        power = 90;
        accuracy = 100;
        pp = 15;
        description = 'A strong electric attack';
        effect = 'May paralyze the target';
    });

    test('should decrease pp correctly', () => {
        const move = new Move(name, type, category, power, accuracy, pp, description, effect);
        move.decreasePp();
        expect(move).toStrictEqual(
            new MoveBuilder()
                .withName('Thunderbolt')
                .withType(new TypeBuilder().withName('Electric').build())
                .withCategory('Special')
                .withPower(90)
                .withAccuracy(100)
                .withPp(14)
                .withDescription('A strong electric attack')
                .withEffect('May paralyze the target')
                .build()
        )});

    test('should increase pp correctly', () => {
        const move = new Move(name, type, category, power, accuracy, pp, description, effect);
        move.increasePp();
        expect(move).toStrictEqual(
            new MoveBuilder()
                .withName('Thunderbolt')
                .withType(new TypeBuilder().withName('Electric').build())
                .withCategory('Special')
                .withPower(90)
                .withAccuracy(100)
                .withPp(16)
                .withDescription('A strong electric attack')
                .withEffect('May paralyze the target')
                .build()
        )}
    );
});