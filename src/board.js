import React from 'react';
import { Square } from './square';

export class Board extends React.Component {

    renderSquare(x, y) {
        return <Square value={this.props.squares[x][y]} onClick={() => this.props.onClick(x, y)} />;
    }

    render() {
        let self = this;
        if(! Array.isArray(self.props.squares)) return <div></div>;

        let board = this.props.squares.map(function(rows, x) {
            let cells = rows.map(function(cols, y) {
                return <Square key={x*10 + y} value={self.props.squares[x][y]} onClick={() => self.props.onClick(x, y)} />;
            })
            return <div key={x} className="board-row">{cells}</div>;
        });

        return <div>{board}</div>;
    }
}