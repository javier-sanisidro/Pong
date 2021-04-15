import Winner from './winner';
import ScoreBoard from './score-board';

export default class GameBoard {
  constructor (name) {
    this.name = name;
  }
  start() {
    console.log("Starting game!");
    return null;
  }
  getName(){
    return this.name;
  }
}
