class Turn {
   private turn?: number;

  constructor(turn? : number) {
    this.turn = turn ? turn : 0;
  }

  next() {
    this.turn += 1;
  }
}

export default Turn;