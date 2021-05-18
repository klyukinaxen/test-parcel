import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { ColorContext } from "../store/points";
import Button from '@material-ui/core/Button';
import { Circle, Stage, Layer, Line } from 'react-konva'

export const layerDimensions={
    width:1400,
    height:400
}  ;
               
const ButtonComponent = observer(() => {

    const store = useContext(ColorContext);

    const getRandomIntInclusive = (min, max) =>
        Math.floor(Math.random() * (max - min + 1)) + min;

    const getId = () => Math.floor(Math.random() * (store.arrayCircles.length - 1));

    const generateCircle = () => {
        const radius = getRandomIntInclusive(20, 50)
        return {
            x: getRandomIntInclusive(radius, layerDimensions.width - radius),
            y: getRandomIntInclusive(radius, layerDimensions.height - radius),
            radius: radius,
            color: "blue"
        }
    }

    const points = store.arrayCircles;
    const lines = points.length > 1 && (
        <Line
            points={points.map((point) => [point.x, point.y]).flat()}
            stroke="black"
        >
        </Line>
    )

    const clickChangeColor = () => store.changeColor(getId())

    const clickHandler = () => {
        store.addCircle(generateCircle())
        // console.log("координаты центра первого круга:", store.arrayCircles[0].x, " ", store.arrayCircles[0].y);
    };

    const clickHandlerLineDraw = () => {
        for (let i = 0; i < lines.length; i++) {
            console.log(lines[i].x);
        }
    };

    const clickRemove = () => {
        store.removeCircle(getId())
        const len = store.arrayCircles.length
        // store.arrayCircles.map((point) => { console.log("координаты кружочка", " х: ", point.x, "y: ", point.y); })
        // console.log("координаты центра последнего нарисованного круга:", store.arrayCircles[len - 1].x, " ", store.arrayCircles[len - 1].y);
    };

    const clickHandlerArrangeCircles = () => {
        store.changeCircleCoordinates(25);
    }

    return (
        <div>
            {/* <button
                className="sunbed"
                id="1"
                onClick={() => store.toggleColor()}
                style={{ backgroundColor: store.newcolor }}
            >
                1
            </button> */}

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

            {/* <Button
                variant="contained"
                onClick={clickHandlerLineDraw}
            >
                Draw Lines
            </Button> */}

            <Button
                variant="contained"
                onClick={clickHandlerArrangeCircles}
            >
                Arrange Circles
                
            </Button>

            <Stage     width={layerDimensions.width} height={layerDimensions.height}>
                <Layer>
                    <>       
                        {store.arrayCircles.map((circle, id) =>
                            <Circle
                                key={id}
                                x={circle.x}
                                y={circle.y}
                                radius={circle.radius}
                                opacity={0.8}
                                fill={circle.color}
                            />
                        )}
                    </>

                    {/* {lines} */}

                </Layer>
            </Stage>

        </div>
    )
})

export default ButtonComponent