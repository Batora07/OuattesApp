import React from 'react';
import Moment from 'react-moment';
import moment from 'moment';
import FontAwesome from 'react-fontawesome';

import StyledChatItem from '../elements/StyledChatItem';
import { getBadges, updateBadges } from '../../api/helpers';
import Avatar from './Avatar';

const ChatItem = (props:any):JSX.Element => {
    const { title, picture, lastMessage, onChatClick, _id, active, participants } = props;
    const { content, createdAt, type } = lastMessage;

    const now:string = moment().format("D/MM/YYYY");
    const today:boolean = now === moment(createdAt).format("D/MM/YYYY");
    let badge:number = getBadges(_id);

    React.useEffect(() => {
        if(active) {
            updateBadges(participants, _id);
            badge = getBadges(_id);
        }
    }, [lastMessage]);

    return (
        <StyledChatItem active={active} onClick={() => onChatClick(_id)}>
            <Avatar large avatar_url={picture} />
            <div className="chat--contentContainer">
                <div className="content--line1">
                    <span className="content--line1__title">
                        {title}
                    </span>
                    <div className="content--line1__date">
                        {today ? (
                            <Moment format="HH:mm">
                                {createdAt}
                            </Moment>
                        ) : (
                            <Moment format="D/MM/YYYY">
                                {createdAt}
                            </Moment>
                        )}
                      
                    </div>
                </div>
                <div className="content--line1">
                    {type === "text" ? (
                        <span className="content--message">
                            {content}
                        </span>
                    ): (
                        <span className="content--message">
                            <FontAwesome 
                                name="camera"
                                style={{"marginRight": "0.4rem"}}
                            />
                        </span>
                    )}            
                    {badge > 0 ? (
                        <div className="chat--badge">{badge}</div>
                    ) : null}        
                </div>
            </div>
        </StyledChatItem>
    )
}

export default ChatItem;