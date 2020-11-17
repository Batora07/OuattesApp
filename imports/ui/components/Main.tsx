import React from 'react';
import { Meteor } from 'meteor/meteor';
// import { Tracker } from 'meteor/tracker';
import { withTracker } from 'meteor/react-meteor-data';
import moment from 'moment';
import { Session } from 'meteor/session';

import Left from './Left';
import Right from './Right';
import BigOverlay from './BigOverlay';
import ImageViewer from './ImageViewer';
import StyledMain from '../elements/StyledMain';
import { ChatsCollection } from '../../api/chats';
import { findChats } from '../../api/helpers';
import { Chat, MessageType } from '../../api/models';
import _ from 'lodash';
import OtherProfile from './OtherProfile';
import Popup from './Popup';

const initialBigOverlay:any = {
    image: {
        visible: false,
        url: ""
    },
    popup: {
        visible: false,
        title: ""
    }
}

const Main = (props:any):JSX.Element => {

    const [messageVisible, setMessageVisible] = React.useState<boolean>(false);
    const [selectedChat, setSelectedChat] = React.useState<Chat>({});
    // OP = Other Profile
    const [OP, setOP] = React.useState<any>({});
    const [BOVisible, setBOVisible] = React.useState<any>(initialBigOverlay);

    const handleChatClick = (_id:string):void => {
        // console.log('selected chat before', selectedChat);
        if(!messageVisible){
            setMessageVisible(true);
        }
        const newChat:Chat = _.find(props.chats, {_id});
        // console.log('selected chat after', newChat);

        if(newChat) {
            setSelectedChat(newChat);
        } 
        else {
            const newChat:Chat = ChatsCollection.findOne(_id);
            setSelectedChat(newChat);
        }
    }

    const handleClose = ():void => {
        setOP({
            visible: false,
            otherId : ""
        });
    }

    //UI = User Id
    const handleUIClick = (otherUserId:string, username:string, picture:string):void => {
        const chat:Chat = ChatsCollection.findOne({
            participants: {
                $all: [otherUserId, Meteor.userId()]
            }
        });
        console.log('chat', chat);
        // reprise du chat
        if (chat) {
            handleChatClick(chat._id);
        }
        // création d'un nouveau chat
        else {
            const chatId:string = ChatsCollection.insert({
                title: username,
                picture,
                participants: [otherUserId, Meteor.userId()],
                lastMessage: {
                    content: "",
                    createdAt: moment().toDate(),
                    type: MessageType.TEXT
                }
            });

            handleChatClick(chatId);
        }
    }

    const handleAvatarClick = (otherId:string):void => {
        setOP({
            visible: true,
            otherId
        });
    }

    const showImage = (imageUrl:string):void => {
        setBOVisible(prevState => {
            return {
                ...prevState,
                image: {
                    visible: true,
                    url: imageUrl
                }
            }
        })
    }

    const handleCloseBO = ():void => {
        setBOVisible(prevState => {
            return {
                ...prevState,
                image: {
                    visible: false,
                    url: ""
                },
                popup: {
                    visible: false,
                    title: ""
                }
            }
        })
    }

    const handleMsgClick = (msgId: string, type:string):void => {
        Session.set('wwc--message__id', msgId);

        setBOVisible(prevState => {
            return {
                ...prevState,
                popup: {
                    visible: true,
                    title: type==="text" ? "Supprimer le message ?" : "Supprimer l'image ?"
                }
            }
        })
    }

    const handleDeleteMsg = ():void => {
        const msgId:string = Session.get('wwc--message__id');
        Meteor.call('message.delete', msgId, (err, res) => {
            if(err){
                console.log("erreur", err);
            }
            else {
                console.log("res", res);
                handleCloseBO();
            }
        })
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
                        onUserItemClick={handleUIClick}
                    />
                    <Right 
                        OPVisible={OP.visible}
                        right 
                        messageVisible={messageVisible}
                        selectedChat={selectedChat}
                        onAvatarClick={handleAvatarClick} 
                        onMsgClick={handleMsgClick}
                    />

                    {BOVisible.popup.visible ? (
                        <BigOverlay>
                            <Popup 
                                cancel={handleCloseBO}
                                title={BOVisible.popup.title} 
                                onDelete={handleDeleteMsg}
                            />
                        </BigOverlay>
                    ) : null}

                    {BOVisible.image.visible ? (
                        <BigOverlay>
                            <ImageViewer 
                                imageUrl = {BOVisible.image.url}
                                onClose={handleCloseBO}
                            />
                        </BigOverlay>
                    ) : null }

                    {
                        OP.visible ? (
                            <OtherProfile
                                otherUserId={OP.otherId}
                                onClose={handleClose}
                                onShowImage={showImage}
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
