import React from "react";
import "./Game.css";

function Square(props) {
  return (
    <button className={props.className} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    let sqSel =
      this.props.sq === i && this.props.sqSel ? "square selected" : "square";
    setTimeout(() => (sqSel = "square"), 500);
    return (
      <Square
        value={this.props.squares[i]}
        className={sqSel}
        key={i}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    const rows = [];
    let t = 0;
    while (t < 9) {
      for (let j = 1; j <= 3; j++) {
        const sq = [];
        for (let i = 1; i <= 3; i++) {
          sq.push(this.renderSquare(t));
          t++;
        }
        rows.push(
          <div className="board-row" key={j}>
            {sq}
          </div>
        );
      }
    }
    return <div>{rows}</div>;
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          square: null
        }
      ],
      xIsNext: true,
      stepNumber: 0
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([{ squares: squares, square: i }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
    let arrLi = document.querySelectorAll("li");
    arrLi.forEach(item => {
      item.firstElementChild.classList.remove("selected");
    });
  }

  jumpTo(step, e) {
    let arrLi = document.querySelectorAll("li");
    arrLi.forEach(item => {
      item.firstElementChild.classList.remove("selected");
    });
    e.target.classList.toggle("selected");
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
    this.setState({ sqSel: true });
    setTimeout(() => this.setState({ sqSel: false }), 500);
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      let i = step.square;
      if (move) {
        var coords =
          " row: " + (Math.floor(i / 3) + 1) + " col: " + ((i % 3) + 1);
        var desc = "Goto step #" + move;
      } else {
        desc = "Goto Start";
        coords = "";
      }

      return (
        <li key={move}>
          <button onClick={e => this.jumpTo(move, e)}>{desc}</button>
          {coords}
        </li>
      );
    });

    let status;

    if (winner) {
      status = "Winner " + winner;
    } else if (history.length === 10) {
      status = "X === O";
    } else {
      status = "Next step " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <h2>Game X vs O</h2>
        <div className="game-wrapper">
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={i => this.handleClick(i)}
              sqSel={this.state.sqSel}
              sq={current.square}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      let arrSq = document.querySelectorAll(".square");
      arrSq.forEach((item, index) => {
        item.classList.remove("selected");
        lines[i].forEach(line => {
          if (index === line) {
            item.classList.toggle("selected");
            let interval = setInterval(() => {
              item.classList.toggle("selected");
            }, 500);
            setTimeout(() => {
              clearInterval(interval);
              item.classList.remove("selected");
            }, 3000);
          }
        });
      });

      return squares[a];
    }
  }
  return null;
}

export default Game;
