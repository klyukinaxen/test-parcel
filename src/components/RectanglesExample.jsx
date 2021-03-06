import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { RectanglesContext } from '../store/rectangles';
import { Stage, Layer, Rect } from 'react-konva'

export const layerDimensions = {
    width: window.innerWidth,
    height: window.innerHeight
};

const RectanglesExample = observer(() => {
    const store = useContext(RectanglesContext)

    useEffect(() => {
        console.log('mount');
        store.listInitialize(30, 10, layerDimensions);

        return () => {
            console.log('unmount')
        }
    }, [])

    return (
        <div>
            <Stage width={layerDimensions.width} height={layerDimensions.height}>
                <Layer>
                    {store.list.map((rectangle, id) =>
                        <Rect
                            key={id}
                            x={rectangle.x}
                            y={rectangle.y}
                            width={rectangle.width}
                            height={rectangle.height}
                            opacity={rectangle.opacity}
                            fill="black"
                            onMouseEnter={() => store.onMouseEnterRectangle(id)}
                            onMouseLeave={() => store.onMouseLeaveRectangle(id)}
                        />
                    )}
                </Layer>
            </Stage>
        </div>
    );
})

export default RectanglesExample;
