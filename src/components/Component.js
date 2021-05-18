import React, { useContext } from "react"
import { observer } from 'mobx-react-lite'
import { TimerContext } from "../store/points"

const Component = observer(() => {
  const store = useContext(TimerContext);
  return <h1>{store.secondsPassed}</h1>
});

export default Component;