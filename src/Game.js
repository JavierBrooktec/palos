import React, {Component} from 'react';
import Board from 'scafolding/Board';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{palos: Array(15).fill(1), isNextX: true, currentRow: null}],
      isNextX: true,
      currentRow: null,
      stepNumber: 0
    };
  }
  pudePasarTurno() {
    return this.state.currentRow === null ? true : false;
  }
  pasarTurno() {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    let palos = current.palos.slice();
    const isNextX = this.state.isNextX;
    this.setState({
      history: history.concat([{palos: palos, isNextX: !isNextX, currentRow: null}]),
      isNextX: !isNextX,
      currentRow: null
    });
  }
  handleClick(i, j) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    let palos = current.palos.slice();
    palos[i] = 0;
    let isLastPalo = this.isLastPalo(i, palos);
    const isNextX = this.state.isNextX;
    if (isLastPalo) {
      this.setState({
        currentRow: null,
        isNextX: !isNextX,
        history: history.concat([{palos: palos, isNextX: !isNextX, currentRow: null}]),
        stepNumber: history.length
      });
    } else {
      this.setState({
        history: history.concat([{palos: palos, isNextX: isNextX, currentRow: j}]),
        currentRow: j,
        stepNumber: history.length
      });
    }
  }
  jumpTo(estado, numero) {
    console.log(estado, numero);

    this.setState({
      stepNumber: numero,
      isNextX: estado.isNextX,
      currentRow: estado.currentRow
    });
  }

  haveWinner() {
    const history = this.state.history;
    const current = history[history.length - 1];
    let palos = current.palos.slice();
    return palos.reduce((a, b) => a + b, 0) === 0;
  }

  isLastPalo(i, palos) {
    if (i < 3) {
      let arr = palos.slice(0, 3);
      return arr.reduce((a, b) => a + b, 0) === 0;
    } else if (i < 8) {
      let arr = palos.slice(4, 8);
      return arr.reduce((a, b) => a + b, 0) === 0;
    } else if (i < 15) {
      let arr = palos.slice(4, 15);
      return arr.reduce((a, b) => a + b, 0) === 0;
    }
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    console.log(history);

    const CurrenRow = this.state.currentRow;
    let isNextÚltimo = this.state.isNextX;
    const moves = this.state.history.map((estado, numero) => {
      if (estado.isNextX !== isNextÚltimo) {
        isNextÚltimo = estado.isNextX;
        console.log(numero);
        console.log(this.state.history.length - 1);

        const desc = numero !== this.state.history.length - 1 ? 'move to step: ' + numero : 'move to last step';
        return (
          <li key={numero}>
            <button onClick={() => this.jumpTo(estado, numero)}>{desc}</button>
          </li>
        );
      }
    });

    return (
      <div>
        <h1>Palos Game</h1>
        <h1>Next turn: {this.state.isNextX ? 'Player1' : 'Player2'}</h1>
        <h1>{this.haveWinner() ? `we have a winner: ${this.state.isNextX ? 'Player1' : 'Player2'}` : null}</h1>
        <Board palos={current.palos} onClick={(i, j) => this.handleClick(i, j)} currentRow={CurrenRow} />
        <button disabled={this.pudePasarTurno()} onClick={() => this.pasarTurno()}>
          Pasar Turno
        </button>
        <button onClick={() => this.handleClickBack}>Back</button>
        {moves}
      </div>
    );
  }
}

export default Game;
