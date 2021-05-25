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
        console.log(grid);

        return () => {
            console.log('unmount')
        }
    }, [])

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
                                    'snake': cell.isSnake
                                }])}
                                key={`${rowIndex}-${cellIndex}`}
                            />
                        )
                    })
                }
            </div>
            // <div
            //     key={grid.row.toString() + '-' + grid.col.toString()}
            // >
            //     <div className="grid-item"></div>
            // </div>
        )
    })
    return (
        <div className="grid">
            {gridItems}
        </div>
    )
}



export default SnakeExample;