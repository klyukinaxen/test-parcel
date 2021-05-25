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
        isBorderCheck();


        return () => {
            console.log('unmount')
        }
    }, [])

    isBorderCheck = () => {
        for (let i = 0; i < grid.length; i++) {
            let innerLength = grid[i].length;
            if (i == 0 || i == (grid.length - 1)) {
                for (let t = 0; t < innerLength; t++)
                    // console.log(grid[i][t].isBorder);
                    grid[i][t].isBorder = true;
            }
            else
                for (let j = 0; j < innerLength; j++) {
                    if (j == 0 || j == (innerLength - 1)) {
                        // console.log(grid[i][j].isBorder);

                        grid[i][j].isBorder = true;
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

                // начальное состояние игры логика

                gridRow.push(cell)
            }
            newGrid.push(gridRow)
        }
        setGrid(newGrid)
        console.log(grid);
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

    // console.log(grid);

    return (

        <div className="grid">
            {gridItems}
        </div>
    )
}



export default SnakeExample;