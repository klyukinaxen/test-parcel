import { useInterval } from "ahooks";
import classNames from "classnames";
import React, { useContext, useEffect, useState } from "react";

import { useEvent } from "../hooks";

import "./snakeStyle.css"

const SNAKE_STATE = {
    UP: "UP",
    DOWN: "DOWN",
    LEFT: "LEFT",
    RIGHT: "RIGHT"
}

const SnakeExample = (props) => {

    const [rows, setRows] = useState(20)
    const [cols, setCols] = useState(20)
    const [grid, setGrid] = useState([])

    const [food, setFood] = useState({});
    const [score, setScore] = useState(0);

    /**
     * Направление движения змейки
     */
    const [snakeState, setSnakeState] = useState(SNAKE_STATE.UP)
    const [snake, setSnake] = useState([])
    const [delay, setDelay] = useState(300)

    useEffect(() => {
        console.log('mount');
        fillGrid();
        snakeInit();
        generateFood();

        return () => {
            console.log('unmount');
        }
    }, [])

    useEvent('keyup', (ev) => {
        console.log(ev.code);
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

    useInterval(() => {
        moveSnake();
    }, delay);

    const snakeInit = () => {
        const startSnake = [
            {
                x: 10,
                y: 10
            }, {
                x: 10,
                y: 11
            }
        ]

        setSnake(startSnake)
    }

    const generateFood = () => {
        const startFood = {
            x: getRandomIntInclusive(2, cols - 2),
            y: getRandomIntInclusive(2, rows - 2)
        }
        setFood(startFood);
    }

    const fillGrid = () => {
        const newGrid = []
        for (let y = 0; y < rows; y++) {
            const gridRow = []
            for (let x = 0; x < cols; x++) {
                const cell = {
                    isBorder: false
                }
                if (x === 0 || x === (cols - 1) || y === 0 || y === (rows - 1)) {
                    cell.isBorder = true;
                }
                gridRow.push(cell)
            }
            newGrid.push(gridRow)
        }
        setGrid(newGrid)
    }

    const isSnakeEatHerself = () => {
        console.log(snake);
        console.log(snake[0]);
        for (let index = 1; index < snake.length; index++) {
            if (snake[index].x === snake[0].x && snake[index].y === snake[0].y) {
                return true;
            }
        }
        return false;
    }

    /**
     * в конце проверка: если новая клетка равна клетке границы + 1, то clearInterval и вывод сообщения о конце игры
     */
    function moveSnake() {
        if (snake[0].y === 0 || snake[0].x === 0 || snake[0].y === rows - 1 || snake[0].x === cols - 1 || isSnakeEatHerself()) {
            setDelay(null);
            // <div className="end-game-container">
            //     <div className="game-text">Вы проиграли! Ваши очки: {score}</div>
            //     <div className="new-game-button"
            //         onClick={ }
            //     >Начать заново</div>
            // </div>
            alert("You lose " + " Your score is: " + score)
            return;
        }
        else {
            const snakeCopy = [...snake];
            const snakeLastElement = snakeCopy.pop();
            const snakeNewElement = { ...snakeLastElement };

            if (snakeState === SNAKE_STATE.UP) {
                snakeNewElement.y = snakeCopy[0].y - 1;
                snakeNewElement.x = snakeCopy[0].x;
            }
            if (snakeState === SNAKE_STATE.DOWN) {
                snakeNewElement.y = snakeCopy[0].y + 1;
                snakeNewElement.x = snakeCopy[0].x;
            }
            if (snakeState === SNAKE_STATE.RIGHT) {
                snakeNewElement.y = snakeCopy[0].y;
                snakeNewElement.x = snakeCopy[0].x + 1;
            }
            if (snakeState === SNAKE_STATE.LEFT) {
                snakeNewElement.x = snakeCopy[0].x - 1;
                snakeNewElement.y = snakeCopy[0].y;
            }
            snakeCopy.unshift(snakeNewElement);
            setSnake(snakeCopy);

            isFoodPicked(snakeCopy, snakeLastElement);
        }
    }

    const getRandomIntInclusive = (min, max) =>
        Math.floor(Math.random() * (max - min + 1)) + min;

    const isFoodPicked = (tempSnake, snakeLastElement) => {
        let tempFood = { ...food };
        if (tempFood.x === tempSnake[0].x && tempFood.y === tempSnake[0].y) {
            tempSnake.push(snakeLastElement)
            setSnake(tempSnake);
            setScore(score + 1)
            generateFood();
            return true;
        }
    }

    const gridItems = grid.map((row, rowIndex) => {
        return (
            <div className="grid-row" key={rowIndex}>
                {
                    row.map((cell, cellIndex) => {
                        const isFood = (food.y === rowIndex && food.x === cellIndex);
                        const isSnake = !!snake.find((s) => s.y === rowIndex && s.x === cellIndex);

                        return (
                            <div
                                className={classNames(["grid-item", {
                                    'border': cell.isBorder,
                                    'snake': isSnake,
                                    'food': isFood
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