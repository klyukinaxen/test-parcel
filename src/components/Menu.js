import React from "react";
import ReactDom from "react-dom";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

const Menu = () => {
    return (
        <div>
            <ul>
                <li>
                    <Link to="/">Menu</Link>
                </li>
                <li>
                    <Link to="/points">PointsExample</Link>
                </li>
                <li>
                    <Link to="/rectangles">RectanglesExample</Link>
                </li>
                <li>
                    <Link to="/snake-game">SnakeGame</Link>
                </li>
            </ul>
        </div>
    );
}

export default Menu;