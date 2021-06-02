import { createContext } from 'react'
import { toJS, makeAutoObservable } from 'mobx'

export class SnakeGame {

    snakePosition = [[]];
    grid = [[]]

    constructor() {
        makeAutoObservable(this)
    }

    gridInitialize(columns, rows) {
        this.grid = [[]]
        let width = 300 / columns;
        let height = 300 / rows;

        for (let i = 0; i < columns; i++) {
            for (let j = 0; j < rows; j++) {
                this.grid.push(
                    {
                        x: i * width,
                        y: j * height,
                    }
                )
            }
        }
        console.log(toJS(this.grid));
    }
}

export const snake = new SnakeGame();
export const SnakeContext = createContext(snake);