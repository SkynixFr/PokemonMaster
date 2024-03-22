class Turn {
   readonly turn: number;

  constructor(turn? : number) {
    this.turn = turn ? turn : 0;
  }

  next() {
    return new Turn(this.turn + 1);
  }

}

export default Turn;