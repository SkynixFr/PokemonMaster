import Turn from "../classes/Turn";
import TurnBuilder from "./utils/TurnBuilder";

describe("Turn", () => {
    let turnNumber: number;
    let turn: Turn;

    beforeEach(() => {
        turnNumber = 1;
        turn = new TurnBuilder().withTurn(turnNumber).build();
    });

    it("should create go to next turn", () => {
        turn.next();
        expect(turn).toStrictEqual(new TurnBuilder().withTurn(2).build());
    });
});