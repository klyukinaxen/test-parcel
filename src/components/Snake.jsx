import classNames from "classnames";
import React, { useContext, useEffect, useState } from "react";

import "./snakeStyle.css"


const SnakeExample = (props) => {

    // state = {
    //     rows: 10,
    //     cols: 10,
    //     grid: []
    // }

    const [rows, setRows] = useState(10)
    const [cols, setCols] = useState(10)
    const [grid, setGrid] = useState([])

    useEffect(() => {
        console.log('mount');
        fillGrid();

        return () => {
            console.log('unmount')
        }
    }, [])

    isBorderCheck = () => {
        for (let i = 0; i < grid.length; i++) {
            if (i == 0 || i == (grid.length - 1)) console.log("border");
            else
                for (let j = 0; j < grid.length; j++) {
                    if (j == 0 || j == (grid.length - 1)) {
                        console.log("border");
                    }
                }
        }
    }

    const fillGrid = () => {
        const newGrid = []
        for (let row = 0; row < rows; row++) {
            const gridRow = []
            for (let col = 0; col < cols; col++) {
                const cell = {
                    isSnake: false,
                    isFood: false,
                    isBorder: false
                }

                isBorderCheck();
                // начальное состояние игры логика

                gridRow.push(cell)
            }

            newGrid.push(gridRow)
        }

        setGrid(newGrid)

    }


    const gridItems = grid.map((row, rowIndex) => {
        return (
            <div className="grid-row" key={rowIndex}>
                {
                    row.map((cell, cellIndex) => {
                        return (
                            <div
                                className={classNames(["grid-item", {
                                    'snake': cell.isSnake,
                                    'food': cell.isFood,
                                    'border': cell.isBorder
                                }])}
                                key={`${rowIndex}-${cellIndex}`}
                            />
                        )
                    })
                }
            </div>
        )
    })

    console.log(gridItems);


    return (
        <div className="grid">
            {gridItems}
        </div>
    )
}



export default SnakeExample;