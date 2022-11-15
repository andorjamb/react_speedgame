import React from 'react';
import './Circle.css';

const Circle = (props) => {
    return (
        <div className={`circle ${props.active ? 'active' : ''}`}
            onClick={props.click}
            active={props.active}
        >
        </div>
    );
};

export default Circle;