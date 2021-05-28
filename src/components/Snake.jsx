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
                x: 11,
                y: 10
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
        for (let x = 0; x < cols; x++) {
            const gridRow = []
            for (let y = 0; y < rows; y++) {
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


    const isSnakeEatHerself = !!snake.find((s) => { snake[0].x === s.x && snake[0].y === s.y });

    /**
     * в конце проверка: если новая клетка равна клетке границы + 1, то clearInterval и вывод сообщения о конце игры
     */
    function moveSnake() {
        if (snake[0].y === 0 || snake[0].x === 0 || snake[0].y === rows - 1 || snake[0].x === cols - 1 || isSnakeEatHerself) {
            setDelay(null);
            // <div className="end-game-container">
            //     <div className="game-text">Вы проиграли! Ваши очки: {score}</div>
            //     <div className="new-game-button"
            //         onClick={ }
            //     >Начать заново</div>
            // </div>
            console.log(score);
            alert("You lose " + " Your score is: " + score)
            return;
        }
        else {
            let snakeLastElement;
            if (snakeState === SNAKE_STATE.UP) {
                const snakeCopy = [...snake];
                snakeLastElement = snakeCopy.pop();
                snakeLastElement.x = snakeCopy[0].x - 1;
                snakeLastElement.y = snakeCopy[0].y;
                snakeCopy.unshift(snakeLastElement);
                setSnake(snakeCopy);
            }
            if (snakeState === SNAKE_STATE.DOWN) {
                const snakeCopy = [...snake];
                snakeLastElement = snakeCopy.pop();
                snakeLastElement.x = snakeCopy[0].x + 1;
                snakeLastElement.y = snakeCopy[0].y;
                snakeCopy.unshift(snakeLastElement);
                setSnake(snakeCopy);
            }
            if (snakeState === SNAKE_STATE.RIGHT) {
                const snakeCopy = [...snake];
                snakeLastElement = snakeCopy.pop();
                snakeLastElement.x = snakeCopy[0].x;
                snakeLastElement.y = snakeCopy[0].y + 1;
                snakeCopy.unshift(snakeLastElement);
                setSnake(snakeCopy);
            }
            if (snakeState === SNAKE_STATE.LEFT) {
                const snakeCopy = [...snake];
                snakeLastElement = snakeCopy.pop();
                snakeLastElement.y = snakeCopy[0].y - 1;
                snakeLastElement.x = snakeCopy[0].x;
                snakeCopy.unshift(snakeLastElement);
                setSnake(snakeCopy);
            }
            isFoodPicked();

            // if (isFoodPicked()) {
            //     // setScore(score + 1);
            //     const snakeCopy = [...snake];
            //     let snakeNewFirstElement = {
            //         x: food.x,
            //         y: food.y
            //     };
            //     // snakeNewFirstElement.x = food.x;
            //     // snakeNewFirstElement.y = food.y;
            //     snakeCopy.push(snakeLastElement);
            //     snakeCopy.push(snakeNewFirstElement);
            //     // let snakeNewElement
            //     // snakeCopy.unshift();
            //     setSnake(snakeCopy);
            //     generateFood();
            // }
            // console.log("lastElement", snakeLastElement);
        }
    }
    // console.log("snake", snake);
    // console.log(food);
    // console.log("grid", grid);

    const getRandomIntInclusive = (min, max) =>
        Math.floor(Math.random() * (max - min + 1)) + min;

    const isFoodPicked = () => {
        let tempFood = { ...food };
        let tempSnake = [...snake];
        if (tempFood.x === tempSnake[(tempSnake.length - 1)].x && tempFood.y === tempSnake[(tempSnake.length - 1)].y) {
            tempSnake.unshift(tempFood);
            setSnake(tempSnake);
            console.log(snake);
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