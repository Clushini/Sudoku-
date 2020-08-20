import React, { Component } from 'react';
import './App.scss';
import Block from './components/block';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      block1: {row1: [1, 0, 0], row2: [2, 0, 0], row3: [0, 4, 0], rowcount: 3},
      block2: {row1: [0, 0, 0], row2: [0, 0, 0], row3: [0, 0, 0], rowcount: 3},
      block3: {row1: [0, 0, 0], row2: [0, 0, 0], row3: [0, 0, 0], rowcount: 3},
      block4: {row1: [0, 0, 0], row2: [0, 0, 0], row3: [0, 0, 0], rowcount: 3},
      block5: {row1: [3, 0, 0], row2: [0, 0, 0], row3: [0, 0, 0], rowcount: 3},
      block6: {row1: [0, 0, 0], row2: [0, 0, 0], row3: [0, 0, 0], rowcount: 3},
      block7: {row1: [0, 0, 0], row2: [0, 0, 0], row3: [0, 0, 0], rowcount: 3},
      block8: {row1: [0, 0, 0], row2: [0, 0, 0], row3: [0, 0, 0], rowcount: 3},
      block9: {row1: [0, 0, 0], row2: [0, 0, 0], row3: [0, 0, 0], rowcount: 3},
      blockcount: 9
    }

    this.updateSquare = this.updateSquare.bind(this);
    this.isInRow = this.isInRow.bind(this);
  }

  isInRow(row, block, value) {
    let blocksinrow = [];

    const pushblocks = (start, end) => {
      for (let i = start; i < end + 1; i++) {
        blocksinrow.push(this.state[`block${i}`])
      }
    }

    if (block < 4 && block > 0) { pushblocks(1, 3) }
    if (block > 3 && block < 7) { pushblocks(4, 6) }
    if (block > 6 && block < 10) { pushblocks(7, 9) }
    
    let exists = false;

    blocksinrow.map(block => {
      block[`row${row}`].map(square => {
        if (square == value) exists = true;
      })
    })

    return exists;
  }

  isInColumn(column, block, value) {
    let blocksincolumn = [];

    let col1 = [1, 4, 7];
    let col2 = [2, 5, 8];
    let col3 = [3, 6, 9];

    [col1, col2, col3].map((col, index) => {
      if (col.includes(block)) {
        col.map(num =>  blocksincolumn.push(this.state[`block${num}`]) )
      }
    })

    let exists = false;

    blocksincolumn.map((block, index) => {
      [...Array(block.rowcount)].map((x, num) => {
        let fixed = num + 1;
        if (blocksincolumn[index][`row${fixed}`][column] == value) exists = true;
      })
    })

    return exists;
  }

  updateSquare(block, row, column, value) {
    const rowcheck = this.isInRow(row, block, value);
    const colcheck = this.isInColumn(column, block, value);

    if (rowcheck) alert("check ur rows bro")
    if (colcheck) alert("check ur colums bro")
    
    if (!rowcheck && !colcheck) {
      let copystate = Object.assign({}, this.state);
      copystate[`block${block}`][`row${row}`][column] = value;
      this.setState(copystate);
    }
  }

  render() {
    return(
      <div>
      <h1>Seppuku! </h1>
        <div className="sudokuwrap">
          {
            [...Array(this.state.blockcount)].map((num, index) => {
              const blocknum = index + 1;
              return <Block updateSquare={this.updateSquare} blockdata={this.state[`block${blocknum}`]} blocknum={blocknum}/>
            })
          }
        </div>
      </div>
    );
  }
}

export default App;
