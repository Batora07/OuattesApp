import React from 'react';
import FontAwesome from 'react-fontawesome';

const MessageText = (props:any):JSX.Element => {
     return (
        <div className="messageContainer">
            <div className={props.msgClass}>
                <p>{props.content}</p>
                <div className="detailsContainer">
                    <span>11:33</span>
                    {
                        props.ownership == "mine" ?
                            <FontAwesome name="check-double" /> : null
                    }
                </div>
            </div>
        </div>
     )
}

export default MessageText;