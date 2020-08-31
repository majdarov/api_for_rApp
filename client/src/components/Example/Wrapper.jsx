import React, { useState } from 'react';
import Example from './Example';

const Wrapper = (props) => {

    const [count, setCount] = useState(0);
    const clickButton = () => setCount(count + 1);

    return (
        <>
            <button onClick={clickButton}>{count}</button>
            {count < 5 && <Example count={count} />}
            {count < 5 && <Example count={-1} />}
        </>
    );
}

export default Wrapper;