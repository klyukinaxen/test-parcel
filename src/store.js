import { createContext } from "react"
import { makeObservable, observable, action } from "mobx"

export class Timer {
    secondsPassed = 1
    newcolor = "blue"
    arrayCircles = []

    constructor() {
        const colorFromLocalStorage = localStorage.getItem('color');
        if (colorFromLocalStorage !== null) {
            this.newcolor = colorFromLocalStorage;
        }

        makeObservable(this, {
            secondsPassed: observable,
            newcolor: observable,
            arrayCircles: observable,
            // arrayLines: observable,
            increaseTimer: action,
            changeColor: action,
            toggleColor: action,
            removeCircle: action,
            addCircle: action
        })
    }

    increaseTimer() {
        this.secondsPassed += 1
        console.log(this.secondsPassed);
    }

    randomColor() {
        const colorArray = ["yellow", "gray", "black", "blue", "red", "green", "orange"]
        return colorArray[Math.floor(Math.random() * (colorArray.length - 1))]
    }
    changeColor(cl) {
        this.arrayCircles[cl].color = this.randomColor();
    }
    toggleColor() {
        this.newcolor = this.newcolor == "green" ? "blue" : "green"
        localStorage.setItem('color', this.newcolor);
    }

    removeCircle(id) {
        this.arrayCircles.pop(id);
    }
    addCircle(newCircle) {
        this.arrayCircles.push(newCircle);
    }

    drawLine() {

    }

}

export const myTimer = new Timer();
export const TimerContext = createContext(myTimer);

export const newColor = new Timer();
export const ColorContext = createContext(newColor);

