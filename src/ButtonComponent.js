import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { ColorContext } from "./store";
import Button from '@material-ui/core/Button';
import { Circle, Stage, Layer, Line } from 'react-konva'

const ButtonComponent = observer(() => {

    const getRandomIntInclusive = (min, max) =>
        Math.floor(Math.random() * (max - min + 1)) + min;

    const getId = () => Math.floor(Math.random() * (store.arrayCircles.length - 1));

    const store = useContext(ColorContext);

    const clickHandler = () => {
        store.addCircle(generateCircle())
        console.log("координаты центра первого круга:", store.arrayCircles[0].x, " ", store.arrayCircles[0].y);
    };

    const clickRemove = () => {
        store.removeCircle(getId())
        const len = store.arrayCircles.length
        console.log("координаты центра всех кружочков:", store.arrayCircles[len - 1].x);
        console.log("координаты центра последнего нарисованного круга:", store.arrayCircles[len - 1].x, " ", store.arrayCircles[len - 1].y);
    };

    const clickChangeColor = () => store.changeColor(getId())

    const generateCircle = () => {
        return {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            radius: getRandomIntInclusive(20, 50),
            color: "blue"
        }
    }

    // const lines = [];
    // const linesDraw = lines.map((line, index) => {
    //     if (index === (lines.length - 1)) {
    //         console.log(lines);
    //         return [line, lines[0]];
    //     }
    //     return [line, lines[index + 1]]
    // // })
    // const clickHandlerLineDraw = () => {
    //     console.log(linesDraw);
    // };

    return (
        <div>
            <button
                className="sunbed"
                id="1"
                onClick={() => store.toggleColor()}
                style={{ backgroundColor: store.newcolor }}
            >
                1
            </button>

            <Button
                variant="contained"
                onClick={clickHandler}
            >
                Add
            </Button>

            <Button
                variant="contained"
                onClick={clickRemove}
            >
                Remove
            </Button>

            <Button
                variant="contained"
                onClick={clickChangeColor}
            >
                Change Color
            </Button>

            <Stage width={window.innerWidth} height={window.innerHeight}>
                <Layer>
                    {store.arrayCircles.map((circle, id) =>
                        <Circle
                            key={id}
                            x={circle.x}
                            y={circle.y}
                            radius={circle.radius}
                            opacity={0.8}
                            fill={circle.color}
                            draggable
                        />

                    )}
                    {/* <Line
                        x={}
                        y={}
                        points={[0, 0, 100, 100]}
                        // closed
                        stroke="black"
                    /> */}
                </Layer>
            </Stage>
        </div>
    )
})

export default ButtonComponent