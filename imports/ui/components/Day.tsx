import React from 'react';

const Day = (props:any):JSX.Element => {
    return (
        <div className="day--container">
            <div className="day--wrapper">
                <span className="day--span">
                    {props.date}
                </span>
            </div>
        </div>
    )
}

export default Day;