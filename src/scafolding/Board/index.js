import React, {Component} from 'react';
import './index.css';
import Palo from 'components/Palo';

class Board extends Component {
  constructor(props) {
    super(props);
  }

  isDisable(i, j) {
    let palos = this.props.palos.slice();
    const currentRow = this.props.currentRow;
    if (palos[i] === 0) return true;
    if (currentRow === null) {
      return false;
    }
    return j === currentRow ? false : true;
  }

  renderPalo(i, j) {
    return (
      <Palo
        row={j}
        value={this.props.palos[i]}
        onClick={() => this.props.onClick(i, j)}
        disabled={this.isDisable(i, j)}
      />
    );
  }

  render() {
    return (
      <div className="board">
        <div className="fila">
          {this.renderPalo(0, 1)}
          {this.renderPalo(1, 1)}
          {this.renderPalo(2, 1)}
        </div>
        <div className="fila">
          {this.renderPalo(3, 2)}
          {this.renderPalo(4, 2)}
          {this.renderPalo(5, 2)}
          {this.renderPalo(6, 2)}
          {this.renderPalo(7, 2)}
        </div>
        <div className="fila">
          {this.renderPalo(8, 3)}
          {this.renderPalo(9, 3)}
          {this.renderPalo(10, 3)}
          {this.renderPalo(11, 3)}
          {this.renderPalo(12, 3)}
          {this.renderPalo(13, 3)}
          {this.renderPalo(14, 3)}
        </div>
      </div>
    );
  }
}

export default Board;
