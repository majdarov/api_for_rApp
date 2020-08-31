import React, { useEffect } from 'react';

const Example = ({ count }) => {

    useEffect(() => {
        console.log('render - ' + count)
        return () => {
            console.log('unmount - ' + count);
        }
    }, [count])

    return (
        <div>example: {count}</div>
    );
}

export default Example;