import React, { useContext } from "react";
import { observer } from 'mobx-react-lite'
import { TimerContext } from "./store";

const Component1 = observer(() => {
    const store = useContext(TimerContext);
    return <button onClick={() => store.increaseTimer()}>__</button>;
});

export default Component1;