import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { SnakeContext } from "../store/snake";
import "./snakeStyle.css"
// const SnakeGame = observer(() => {
//     const store = useContext(SnakeContext);

//     return <div>{store.sayHello}</div>

// })

const SnakeExample = () => {
    return (
        <div className="grid">
            <div className="line">
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
            </div>
            <div className="line">
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
            </div>
            <div className="line">
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
            </div>
            <div className="line">
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
            </div>
            <div className="line">
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
            </div>
            <div className="line">
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
            </div>
            <div className="line">
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
            </div>
            <div className="line">
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
            </div>
            <div className="line">
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
            </div>
            <div className="line">
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
            </div>
        </div>
    );
};

export default SnakeExample;