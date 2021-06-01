import React, { useState, useEffect } from "react";
import Button from '@material-ui/core/Button';

const AnimatedNumber = () => {

    const [count, setCount] = useState(0);

    const clickHandlerNumbers = () => {
        let localCount = count;
        const countInterval = setInterval(function () {
            localCount += 1
            setCount(localCount);

            if (localCount === 10) {
                clearInterval(countInterval);
            }

        }, 1000);
    }

    return (
        <div>
            <span> {count} </span>
            <Button
                variant="contained"
                onClick={clickHandlerNumbers}
            >
                Numbers
            </Button>
        </div>

    )
}

export default AnimatedNumber