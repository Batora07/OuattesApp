import React from 'react';
import FontAwesome from 'react-fontawesome';
import Moment from 'react-moment';

const MessageText = (props:any):JSX.Element => {
     return (
        <div className="messageContainer">
            <div className={props.msgClass}>
                <p>{props.content}</p>
                <div className="detailsContainer">
                    <span>
                        <Moment format="HH:mm">
                            {props.createdAt}
                        </Moment>
                    </span>
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