import { createContext } from "react"
import { makeObservable, observable, action, toJS, runInAction, makeAutoObservable } from "mobx"
import { layerDimensions } from "../components/PointsExample"

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export class Timer {
    secondsPassed = 1
    newcolor = "blue"
    arrayCircles = []

    constructor() {
        makeAutoObservable(this)

        const colorFromLocalStorage = localStorage.getItem('color');
        if (colorFromLocalStorage !== null) {
            this.newcolor = colorFromLocalStorage;
        }
    }

    increaseTimer() {
        this.secondsPassed += 1
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

    /**
     * TODO: почитать про async/await
     */
    async changeCircleCoordinates(n = 100) {
        const getInterval = (2 * (window.innerWidth + window.innerHeight)) / this.arrayCircles.length;
        // console.log('getInterval', getInterval);

        let width = layerDimensions.width;
        let height = layerDimensions.height;

        // console.log('width', width, 'height', height);
        let oldCircles = toJS(this.arrayCircles)
        let newCircles = toJS(this.arrayCircles)

        for (let i = 0; i < newCircles.length; i++) {
            // console.log('i', i);
            let d = i * getInterval;
            //при подсчете каждой из координат учитывать радиус
            if (d < width) {
                // console.log('if', 1);
                newCircles[i].x = d;
                newCircles[i].y = 0;
                continue;
            }
            if ((width + height) > d) {
                // console.log('if', 2);
                newCircles[i].x = width;
                newCircles[i].y = d - width;
                continue;
            }
            if ((2 * width + height) > d) {
                // console.log('if', 3);
                newCircles[i].x = 2 * width - d + height;
                newCircles[i].y = height;
                continue;
            }

            // console.log('if', 4);
            newCircles[i].x = 0;
            newCircles[i].y = 2 * height + 2 * width - d;
        }
        // console.log(toJS(this.arrayCircles));

        // this.arrayCircles = newCircles;

        for (let nIndex = 1; nIndex <= n; nIndex++) {
            for (let index = 0; index < newCircles.length; index++) {
                const xDifference = newCircles[index].x - oldCircles[index].x
                const yDifference = newCircles[index].y - oldCircles[index].y

                runInAction(() => {
                    this.arrayCircles[index].x += xDifference / n
                    this.arrayCircles[index].y += yDifference / n
                })
            }

            await sleep(10)
        }
    }
}

export const myTimer = new Timer();
export const TimerContext = createContext(myTimer);

export const newColor = new Timer();
export const ColorContext = createContext(newColor);

