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
import UsersList from './UsersList';
import { User } from '../../api/models';

const Left = (props:any):JSX.Element => {
    const icons:any[] = [
        {
            name: "circle-notch",
            func: () => {}
        }, 
        { 
            name: "comment-alt",
            func: () => {showUList()}
        },
        {
            name: "ellipsis-v",
            func: () => {}
        }
    ];

    const { chats, onChatClick, selectedChat, OPVisible, picture } = props;
    const [LSVisible, setLSVisible] = React.useState<boolean>(false);
    const [UListVisible, setUListVisible] = React.useState<boolean>(false);
    const [pattern, setPattern] = React.useState<string>("");
    const [users2, setUsers] = React.useState<User[]>([]);

    const showUList = ():void => {
        setLSVisible(true);
        setUListVisible(true);
    }

    const userItemClick = (_id:string, username:string, picture:string):void => {
        toggleLS();
        props.onUserItemClick(_id, username, picture);
    }

    const handleUserSearch = (pattern:string):void => {
        setPattern(pattern);
        setUsers(Meteor.users.find({
            _id: {$ne: Meteor.userId()},
            username: {$regex: pattern, $options: 'i'}
        }, 
        {
            sort: {
                username: 1
            }
        }).fetch());
    }

    // LS = LeftSide
    const renderLSComponent = ():JSX.Element => {
        if(UListVisible){
            return (
                <>
                    <LSHeader title="Nouvelle Discussion" onLSClose={toggleLS} />
                    <Searchbar 
                        placeholder="Chercher Contact" 
                        onSearch={handleUserSearch}
                    />
                    <UsersList 
                        onUserItemClick={userItemClick} 
                        pattern={pattern}
                        users2={users2}
                    />
                </>
            )
        }
        return (
            <>
                <LSHeader title="Profil" onLSClose={toggleLS} />
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
            setUListVisible(false);
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
                        <Searchbar placeholder="Rechercher ou Démarrer une discussion" />
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