import React from 'react';
import { Meteor } from 'meteor/meteor';
// import { Tracker } from 'meteor/tracker';
import { withTracker } from 'meteor/react-meteor-data';

import Left from './Left';
import Right from './Right';
import StyledMain from '../elements/StyledMain';
import { ChatsCollection } from '../../api/chats';
import { findChats } from '../../api/helpers';
import { Chat } from '../../api/models';
import _ from 'lodash';
import OtherProfile from './OtherProfile';

const Main = (props:any):JSX.Element => {

    //const [loading, setLoading] = React.useState<boolean>(true);

    // Tracker.autorun(() =>{
    //     const chatsReady:boolean = Meteor.subscribe('chats.mine').ready();
    //     const messagesReady:boolean = Meteor.subscribe("messages.all").ready();
    //     //console.log('chats', findChats());
    //     if(chatsReady && messagesReady){
    //         setLoading(false);
    //     }
    // });

    const [messageVisible, setMessageVisible] = React.useState<boolean>(false);
    const [selectedChat, setSelectedChat] = React.useState<Chat>({});
    // OP = Other Profile
    const [OP, setOP] = React.useState<any>({});

    const handleChatClick = (_id:string):void => {
        // console.log('selected chat before', selectedChat);
        if(!messageVisible){
            setMessageVisible(true);
        }
        const newChat:Chat = _.find(props.chats, {_id});
        // console.log('selected chat after', newChat);
        setSelectedChat(newChat);
    }

    const handleClose = ():void => {
        setOP({
            visible: false,
            otherId : ""
        });
    }

    const handleAvatarClick = (otherId:string):void => {
        setOP({
            visible: true,
            otherId
        });
    }

    return (
        <StyledMain>
            {!props.loading ? (
                <React.Fragment>
                    <Left 
                        OPVisible={OP.visible}
                        chats={props.chats} 
                        onChatClick={handleChatClick}
                        selectedChat={selectedChat}
                    />
                    <Right 
                        OPVisible={OP.visible}
                        right 
                        messageVisible={messageVisible}
                        selectedChat={selectedChat}
                        onAvatarClick={handleAvatarClick} 
                    />
                    {
                        OP.visible ? (
                            <OtherProfile
                                otherUserId={OP.otherId}
                                onClose={handleClose}
                            />
                        ) : 
                        null
                    }
                </React.Fragment>
            ) :
                null
            }
            
        </StyledMain>
    )
};

export default withTracker(() => {
    const chatsReady:boolean = Meteor.subscribe('chats.mine').ready();
    const messagesReady:boolean = Meteor.subscribe("messages.all").ready();

    return {
        loading: chatsReady && messagesReady ? false : true,
        chats: findChats()
    }
})(Main);
