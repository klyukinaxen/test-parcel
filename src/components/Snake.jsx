import classNames from "classnames";
import React, { useContext, useEffect, useState } from "react";

import { useEvent, useInterval } from "../hooks";

import "./snakeStyle.css"

const SNAKE_STATE = {
    UP: "UP",
    DOWN: "DOWN",
    LEFT: "LEFT",
    RIGHT: "RIGHT"
}

const SnakeExample = (props) => {

    const [rows, setRows] = useState(30)
    const [cols, setCols] = useState(45)
    const [grid, setGrid] = useState([])

    /**
     * Направление движения змейки
     */
    const [snakeState, setSnakeState] = useState(SNAKE_STATE.UP)
    const [snake, setSnake] = useState([])

    useEffect(() => {
        console.log('mount');
        fillGrid();
        snakeInit();

        console.log('snake 3', snake);

        return () => {
            console.log('snake 6', snake);
            console.log('unmount');
        }
    }, [])

    useEvent('keyup', (ev) => {
        switch (ev.code) {
            case 'ArrowUp':
                if ((snakeState !== SNAKE_STATE.UP && snakeState !== SNAKE_STATE.DOWN)) {
                    setSnakeState(SNAKE_STATE.UP)
                }
                break;
            case 'ArrowDown':
                if (snakeState !== SNAKE_STATE.UP && snakeState !== SNAKE_STATE.DOWN) {
                    setSnakeState(SNAKE_STATE.DOWN)
                }
                break;
            case 'ArrowRight':
                if (snakeState !== SNAKE_STATE.RIGHT && snakeState !== SNAKE_STATE.LEFT) {
                    setSnakeState(SNAKE_STATE.RIGHT)
                }
                break;
            case 'ArrowLeft':
                if (snakeState !== SNAKE_STATE.RIGHT && snakeState !== SNAKE_STATE.LEFT) {
                    setSnakeState(SNAKE_STATE.LEFT)
                }
                break;
        }
    })

    /**
     * запускается движение змейки
     */

    const handle = useInterval(() => {
        moveSnake()
    }, 500);

    const snakeInit = () => {
        const startSnake = [
            {
                row: 14,
                column: 22
            }, {
                row: 15,
                column: 22
            }, {
                row: 16,
                column: 22
            }
        ]

        setSnake(startSnake)
    }

    const fillGrid = () => {
        const newGrid = []
        for (let row = 0; row < rows; row++) {
            const gridRow = []
            for (let col = 0; col < cols; col++) {
                const cell = {
                    isBorder: false
                }
                if (row === 0 || row === (rows - 1) || col === 0 || col === (cols - 1)) {
                    cell.isBorder = true;
                }
                gridRow.push(cell)
            }
            newGrid.push(gridRow)
        }
        setGrid(newGrid)
    }

    /**
     * в конце проверка: если новая клетка равна клетке границы + 1, то clearInterval и вывод сообщения о конце игры
     */
    function moveSnake() {
        if (snake[0].column === 0 || snake[0].row === 0) {
            // clearInterval(handle);
            // alert("You lose");
            // handle = 0;
        }
        else {
            if (snakeState === SNAKE_STATE.UP) { //(то берем значение следующей клетки вверху змейки и последний элемент перемещаем туда)
                const snakeCopy = [...snake];
                const snakeLastElement = snakeCopy.pop();
                snakeLastElement.row = snakeCopy[0].row - 1;
                snakeLastElement.column = snakeCopy[0].column;
                snakeCopy.unshift(snakeLastElement);
                console.log('snakeCopy', snakeCopy);
                setSnake(snakeCopy);
            }
            if (snakeState === SNAKE_STATE.DOWN) {
                const snakeCopy = [...snake];
                const snakeLastElement = snakeCopy.pop();
                snakeLastElement.row = snakeCopy[0].row + 1;
                snakeLastElement.column = snakeCopy[0].column;
                snakeCopy.unshift(snakeLastElement);
                console.log('snakeCopy', snakeCopy);
                setSnake(snakeCopy);
            }
            if (snakeState === SNAKE_STATE.RIGHT) {
                const snakeCopy = [...snake];
                const snakeLastElement = snakeCopy.pop();
                snakeLastElement.row = snakeCopy[0].row;
                snakeLastElement.column = snakeCopy[0].column + 1;
                snakeCopy.unshift(snakeLastElement);
                console.log('snakeCopy', snakeCopy);
                setSnake(snakeCopy);
            }
            if (snakeState === SNAKE_STATE.LEFT) {
                const snakeCopy = [...snake];
                const snakeLastElement = snakeCopy.pop();
                snakeLastElement.column = snakeCopy[0].column - 1;
                snakeLastElement.row = snakeCopy[0].row;
                snakeCopy.unshift(snakeLastElement);
                console.log('snakeCopy', snakeCopy);
                setSnake(snakeCopy);
            }
        }
    }

    // console.log('snake render', snake);

    const gridItems = grid.map((row, rowIndex) => {
        return (
            <div className="grid-row" key={rowIndex}>
                {
                    row.map((cell, cellIndex) => {
                        const isSnake = !!snake.find((s) => s.row === rowIndex && s.column === cellIndex);

                        return (
                            <div
                                className={classNames(["grid-item", {
                                    'border': cell.isBorder,
                                    'snake': isSnake
                                }])}
                                key={`${rowIndex}-${cellIndex}`}
                            />
                        )
                    })
                }
            </div>
        )
    })

    return (
        <div className="grid">
            {gridItems}
        </div>
    )
}

export default SnakeExample;