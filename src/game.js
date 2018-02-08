import React from 'react';
import { Board } from './board';

export class Game extends React.Component {

    constructor(props) {
        super(props);

        const size = 4;
        const squares = [];
        for(let i=0; i<size; i++) {
            const row = new Array(size).fill('');
            squares.push(row);
        }

        this.players = ['X', 'O'];
        this.state = {
            squares: squares,
            steps: 0,
            next: this.players[0],
            gameOver: false,
            winner: null,
        };
    }

    render() {
        let status = 'Next Player: ' + this.state.next

        if (this.state.gameOver === true) {
            if (this.state.winner !== null)
                status = 'Winner: ' + this.state.winner;
            else
                status = 'Game over.';
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={this.state.squares} onClick={ (x,y) => this.handleClick(x,y)} />
                </div>
                <div className="game-info">
                    <div>{ status }</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }

    handleClick(x, y) {

        if (this.state.gameOver === true) return;
        if (this.state.squares[x][y]) return;

        const squares = this.state.squares.slice();
        const size = squares.length;

        squares[x][y] = this.state.next;

        const steps = this.state.steps + 1;
        const next = this.players[steps % 2];

        let gameOver = this.state.gameOver;
        const winner = this.calculateWinner(squares);
        if (winner && winner !== '') gameOver = true;
        else if (steps >= size * size) gameOver = true;

        const state = { squares: squares, next: next, steps: steps, winner: winner, gameOver: gameOver };
        this.setState(state);
    }

    calculateWinner(squares) {
        const size = squares.length;

        // check the rows
        let value = null;
        let x = 0, y = 0;

        for (let y = 0; y < size; y++) {
            value = squares[x][y];
            if (!value || value === '') continue;

            let won = true;
            // check the row (to right)
            for (let i = 0; i < size; i++)
                if (squares[i][y] !== value) {
                    won = false;
                    break;
                }

            if (won === true) return value;
        }

        // check the colomns
        y = 0;
        value = null;

        for (let x = 0; x < size; x++) {
            value = squares[x][y];
            if (!value || value === '') continue;

            let won = true;
            // check the row (to right)
            for (let i = 0; i < size; i++)
                if (squares[x][i] !== value) {
                    won = false;
                    break;
                }

            if (won === true) return value;
        }

        // check cross from left top  to right bottom
        value = squares[0][0];
        if (value && value !== '') {
            let won = true;

            for (let i = 0; i < size; i++) {
                if (squares[i][i] !== value) {
                    won = false;
                    break;
                }
            }
            if (won === true) return value;
        }

        // check cross from left bottom  to right top
        y = size - 1;
        value = squares[0][y];
        if (value && value !== '') {
            let won = true;

            for (let i = 0; i < size; i++) {
                if (squares[i][y - i] !== value) {
                    won = false;
                    break;
                }
            }
            if (won === true) return value;
        }

        return null;
    }
}