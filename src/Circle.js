import React from 'react';
import './Circle.css';

const Circle = (props) => {
    return (
        <div className="circle" key={props.key}
        onClick={props.click} 
        >

        </div>
    );
};

export default Circle;