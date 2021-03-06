import { createContext } from 'react'
import {
    makeAutoObservable
} from 'mobx'

export class Rectangles {
    list = [{
        x: 0,
        y: 0,
        width: 300,
        height: 100,
        opacity: 1
    }];

    constructor() {
        makeAutoObservable(this)
    }

    onMouseEnterRectangle(id) {
        this.list[id].opacity = 0;
        console.log('enter');
    }

    onMouseLeaveRectangle() {
        console.log('leave');
    }


    listInitialize(columns, rows, layerDimensions) {
        this.list = []
        let width = layerDimensions.width / columns;
        let height = layerDimensions.height / rows;

        for (let i = 0; i < columns; i++) {
            for (let j = 0; j < rows; j++) {
                this.list.push({
                    x: i * width,
                    y: j * height,
                    width,
                    height,
                    opacity: 1
                })
            }
        }
    }


}

export const rectangles = new Rectangles();
export const RectanglesContext = createContext(rectangles);