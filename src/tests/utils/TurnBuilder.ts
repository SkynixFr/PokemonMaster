import Turn from "../../classes/Turn";

class TurnBuilder {
    private turn: number;

    default() {
        return new TurnBuilder().build();
    }

    build() {
        return new Turn(this.turn);
    }

    withTurn(turn: number) {
        this.turn = turn;
        return this;
    }
}

export default TurnBuilder;