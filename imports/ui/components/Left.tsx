import React from 'react';
import { Meteor } from 'meteor/meteor';

import StyledLeft from '../elements/StyledLeft';
import Avatar from './Avatar';
import Header from './Header';
import Status from './Status';
import Searchbar from './Searchbar';
import ChatList from './ChatList';

const icons:any[] = [
    {
        name: "circle-notch",
        func: () => {}
    }, 
    { 
        name: "comment-alt",
        func: () => {}
    },
    {
        name: "ellipsis-v",
        func: () => {}
    }
];

const Left = (props:any):JSX.Element => {
    const { chats, onChatClick, selectedChat, OPVisible } = props;

    return (
        <StyledLeft OPVisible={OPVisible}>
            <Header icons={icons} iconClass="greyIcon">
                <Avatar avatar_url={Meteor.user().profile.picture}/>
            </Header>
            <Status />
            <Searchbar />
            <ChatList 
                chats={chats} 
                onChatClick={onChatClick} 
                selectedChat={selectedChat}
            />
        </StyledLeft>
    )
}

export default Left;