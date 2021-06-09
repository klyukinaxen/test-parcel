import { useInterval, useMount, useUnmount } from 'ahooks';
import classNames from 'classnames';
import React, { useState } from 'react';

import { useEvent } from '../hooks';
import Modal from './Modal';

import './snakeStyle.css'

const SNAKE_STATE = {
    UP: 'UP',
    DOWN: 'DOWN',
    LEFT: 'LEFT',
    RIGHT: 'RIGHT'
}

const SnakeExample = () => {
    const cols = 20;
    const rows = 20;
    const test = 132;

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
    const [modalIsOpen, setModalIsOpen] = useState(false)

    useMount(() => {
        console.log('mount');
        fillGrid();
        snakeInit();
        generateFood();
    })

    useUnmount(() => {
        console.log('unmount');
    })

    useEvent('keyup', (ev) => { //проверка нажатой клавиши на клавиатуре
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

    //начальная инициализация змейки
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

    //генерация еды
    const generateFood = () => {
        const startFood = {
            x: getRandomIntInclusive(2, cols - 2),
            y: getRandomIntInclusive(2, rows - 2)
        }
        console.log('snake', snake);
        console.log('startFood', startFood);

        //проверка на принадлежность клетки еды к змейке, чтобы еда не сгенерировалась на змейку
        if (snake.find(ch => ch.x === startFood.x && ch.y === startFood.y)) {
            return generateFood();
        }
        setFood(startFood);
    }

    //инициализация сетки для игры
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

    //проверка на столкновение змейки с самой собой
    const isSnakeEatHerself = () => {
        for (let index = 1; index < snake.length; index++) {
            if (snake[index].x === snake[0].x && snake[index].y === snake[0].y) {
                return true;
            }
        }
        return false;
    }

    //функция движения змейки
    function moveSnake() {
        if (snake[0].y === 0 || snake[0].x === 0 || snake[0].y === rows - 1 || snake[0].x === cols - 1 || isSnakeEatHerself()) {
            setDelay(null);
            setGame(false);
            setModalIsOpen(true)
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

    //генерация рандомного числа
    const getRandomIntInclusive = (min, max) =>
        Math.floor(Math.random() * (max - min + 1)) + min;

    //проверка собрана ли еда
    const isFoodPicked = (tempSnake, snakeLastElement) => {
        let tempFood = { ...food };
        if (tempFood.x === tempSnake[0].x && tempFood.y === tempSnake[0].y) {
            console.log('eat');
            tempSnake.push(snakeLastElement)
            setSnake(tempSnake);
            setScore(score + 1);
            generateFood();

            return true;
        }
    }

    //присваивание особых свойств ячейке игровой сетки (свойства границы, еды и змейки)
    const gridItems = grid.map((row, rowIndex) => {
        return (
            <div className="grid-row" key={rowIndex}>
                {
                    row.map((cell, cellIndex) => {
                        const isFood = (food.y === rowIndex && food.x === cellIndex);
                        const isSnake = !!snake.find((s) => s.y === rowIndex && s.x === cellIndex);

                        return (
                            <div
                                className={classNames(['grid-item', {
                                    'border': cell.isBorder,
                                    'snake': isSnake,
                                    'food': isFood
                                }])}
                                y={rowIndex}
                                x={cellIndex}
                                key={`${rowIndex}-${cellIndex}`}
                            />
                        )
                    })
                }
            </div>
        )
    })

    //перезапуск игры, обнуление всех интервалов и счетчиков
    const gameRestart = () => {
        setGame(true);
        setSnake([{ x: 10, y: 10 }, { x: 10, y: 11 }]);
        setSnakeState(SNAKE_STATE.UP);
        setFood(0);
        generateFood();
        setDelay(300);
        setScore(0);

        modalOnClose()
    }

    //закрытие модального окна
    const modalOnClose = () => {
        setModalIsOpen(false)
    }

    return (
        <>
            <p className="score">Your Score is: {score} (snake lenght: {snake.length})</p>

            <div className="grid">
                {gridItems}
            </div>

            <Modal
                isOpen={modalIsOpen}
                onClose={modalOnClose}
            >
                <div className="modal">
                    <div className="image" />

                    <p>game over</p>
                    <div
                        className="new-game-button"
                        onClick={gameRestart}
                    >
                        <p className="button-text">Restart</p>
                    </div>

                    <div className="modal-form"></div>
                </div>
            </Modal>
        </>
    )
}

export default SnakeExample;