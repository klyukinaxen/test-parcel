import { createContext } from "react"
import { makeObservable, observable, action, toJS, runInAction, makeAutoObservable } from "mobx"

export class SnakeGame {

    snakePosition = [[]]

    constructor() {
        makeAutoObservable(this)
    }

    sayHello() {
        console.log("Hello");
    }
}

export const snake = new SnakeGame();
export const SnakeContext = createContext(snake);