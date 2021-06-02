import { useEffect, useRef } from 'react'

/**
 * https://atomizedobjects.com/blog/react/add-event-listener-react-hooks/
 */
export function useEvent(event, handler, passive = false) {
    useEffect(() => {
        // initiate the event handler
        window.addEventListener(event, handler, passive)

        // this will clean up the event every time the component is re-rendered
        return function cleanup() {
            window.removeEventListener(event, handler)
        }
    })
}

/**
 * https://github.com/YaroslavW/react-short-notes/blob/master/texts/Hooks-setInterval/hooks-setInterval.md
 */
export function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}