import { useInterval } from "ahooks";
import classNames from "classnames";
import React, { useEffect, useState } from "react";

import { useEvent } from "../hooks";

import "./snakeStyle.css"

const SNAKE_STATE = {
    UP: "UP",
    DOWN: "DOWN",
    LEFT: "LEFT",
    RIGHT: "RIGHT"
}

const SnakeExample = () => {
    const cols = 20;
    const rows = 20;
    // const [rows, setRows] = useState(20)
    // const [cols, setCols] = useState(20)
    const [grid, setGrid] = useState([])

    const [food, setFood] = useState({});
    const [score, setScore] = useState(0);
    const [game, setGame] = useState(true);

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
<<<<<<< HEAD
=======

<<<<<<< HEAD
>>>>>>> parent of 5c9ed40 (after eslint fixes)
=======
        let test = 123;
        console.log(test)

>>>>>>> 5c9ed40311b55bcf0f2bac1c46699a0faa289e80
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
        if (snake.length > 1) {
            for (let i = 1; i < snake.length; i++) {
                if (snake[i].x !== startFood.x && snake[i].y !== startFood.y) {
                    setFood(startFood);
                    return;
                }
            }
        }
        else setFood(startFood);
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
            setGame(false);
            alert("You lose " + " Your score is: " + score)
            return;
        }
        else {
            if (game) {
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

    const gameRestart = () => {
        setGame(true);
        setSnake([{ x: 10, y: 11 }, { x: 11, y: 11 }]);
        setSnakeState(SNAKE_STATE.UP);
        setFood(0);
        generateFood();
        setDelay(300);
        setScore(0);
    }

    return (
        <>
            <div className="grid">
                {gridItems}
                <div
                    className="new-game-button"
                    onClick={gameRestart}
                >
                    <p className="button-text">Restart</p>
                </div>
            </div>
        </>
    )
}

export default SnakeExample;