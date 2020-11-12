import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import StyledLeft from '../elements/StyledLeft';
import Avatar from './Avatar';
import Header from './Header';
import Status from './Status';
import Searchbar from './Searchbar';
import ChatList from './ChatList';
import LeftSide from './LeftSide';
import LSHeader from './LSHeader';
import LSForm from './LSForm';

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
    const { chats, onChatClick, selectedChat, OPVisible, picture } = props;
    const [LSVisible, setLSVisible] = React.useState<boolean>(false);

    // LS = LeftSide
    const renderLSComponent = ():JSX.Element => {
        return (
            <>
                <LSHeader onLSClose={toggleLS} />
                <div className="LS--avatar">
                    <Avatar     
                        inLS                    
                        big 
                        avatar_url={picture} 
                    />
                </div>
                <LSForm type="username" />
                <div className="LS--desc">
                    <span>Ce n'est pas votre nom d'utilisateur ou code pin. Ce nom sera visible auprès de vos contacts OuattesApp.</span>
                </div>
                <LSForm type="actu" />
            </>
        )
    };

    const toggleLS = ():void => {
        if(!LSVisible){
            setLSVisible(true);
        }
        else{
            setLSVisible(false);
        }
    }; 

    return (
        <StyledLeft OPVisible={OPVisible}>
            {
                !LSVisible ? (
                    <>
                        <Header icons={icons} iconClass="greyIcon">
                        <Avatar 
                            onAvatarClick={toggleLS} 
                            avatar_url={picture}
                        />
                        </Header>
                        <Status />
                        <Searchbar />
                        <ChatList 
                            chats={chats} 
                            onChatClick={onChatClick} 
                            selectedChat={selectedChat}
                        />
                    </>
                ) : (
                    <LeftSide>
                        {renderLSComponent()}
                    </LeftSide>
                )
            }
            
        </StyledLeft>
    )
}

export default withTracker(() => {
    return {
        picture: Meteor.user().profile.picture
    }
})(Left);