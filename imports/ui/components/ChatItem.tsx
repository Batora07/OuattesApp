import React from 'react';

import StyledChatItem from '../elements/StyledChatItem';
import Avatar from './Avatar';

const ChatItem = (props:any):JSX.Element => {
    const { title, picture, lastMessage } = props;
    const { content, createdAt } = lastMessage;
    console.log('createdAt', createdAt);
    return (
        <StyledChatItem>
            <Avatar large avatar_url={picture} />
            <div className="chat--contentContainer">
                <div className="content--line1">
                    <span className="content--line1__title">
                        {title}
                    </span>
                    <div className="content--line1__date">
                        {/* {createdAt} */}
                    </div>
                </div>
                <div className="content--line1">
                    <span className="content--message">
                        {content}
                    </span>
                    <div className="chat--badge">4</div>
                </div>
            </div>
        </StyledChatItem>
    )
}

export default ChatItem;