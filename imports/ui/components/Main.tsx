import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

import Left from './Left';
import Right from './Right';
import StyledMain from '../elements/StyledMain';
import { ChatsCollection } from '../../api/chats';
import { findChats } from '../../api/helpers';
import { Chat } from '../../api/models';
import _ from 'lodash';

const Main = (props:any):JSX.Element => {

    Tracker.autorun(() =>{
        Meteor.subscribe('chats.mine');
        Meteor.subscribe("messages.all");
        //console.log('chats', findChats());
    })

    const [messageVisible, setMessageVisible] = React.useState<boolean>(false);
    const [selectedChat, setSelectedChat] = React.useState<Chat>({});

    const handleChatClick = (_id:string):void => {
        console.log('selected chat before', selectedChat);
        if(!messageVisible){
            setMessageVisible(true);
        }
        const newChat:Chat = _.find(findChats(), {_id});
        console.log('selected chat after', newChat);
        setSelectedChat(newChat);
    }

    return (
        <StyledMain>
            <Left 
                chats={findChats()} 
                onChatClick={handleChatClick}
                selectedChat={selectedChat}
            />
            <Right 
                right 
                messageVisible={messageVisible}
                selectedChat={selectedChat} 
            />
        </StyledMain>
    )
};

export default Main;
