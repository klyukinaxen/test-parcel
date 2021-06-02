import React from 'react';
import ReactDom from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
// import Component from "./components/Component.js";
// import Component1 from "./Component1.js";
import PointsExample from './components/PointsExample.jsx'
import RectanglesExample from './components/RectanglesExample.jsx';
import Menu from './components/Menu.js';
// import AnimatedNumber from './components/AnimatedNumber.jsx'
// import "./style.css"
import { myTimer, TimerContext } from './store/points.js';
import { snake, SnakeContext } from './store/snake.js';
import { rectangles, RectanglesContext } from './store/rectangles.js';
import SnakeExample from './components/Snake.jsx';




const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Menu />
        </Route>
        <Route path="/points">
          <TimerContext.Provider value={myTimer}>
            {/* <Component /> */}
            {/* <Component1 /> */}
            <PointsExample />
            {/* <AnimatedNumber /> */}
          </TimerContext.Provider>
        </Route>
        <Route path="/rectangles">
          <RectanglesContext.Provider value={rectangles}>
            <RectanglesExample />
          </RectanglesContext.Provider>
        </Route>
        <Route path="/snake-game">
          <SnakeContext.Provider value={snake}>
            <SnakeExample />
          </SnakeContext.Provider>
        </Route>
      </Switch>

    </Router>
  )
};

ReactDom.render(<App />, document.getElementById('app'));
