import React from 'react';

import StyledRight from '../elements/StyledRight';
import RightImg from './RightImg';
import MessageView from './MessageView';

const messageText:string = "Ouattesapp se connecte à votre téléphone pour synchroniser les messages. Pour réduire l'utilisation des données, connectez votre téléphone à un réseau wifi."

const Right = (props:any):JSX.Element => {
    const { right, messageVisible, selectedChat, onAvatarClick, OPVisible, onMsgClick } = props;
    return (
        <StyledRight OPVisible={OPVisible}>
            {messageVisible ? (
                <MessageView 
                    onAvatarClick={onAvatarClick} 
                    selectedChat={selectedChat} 
                    OPVisible={OPVisible}    
                    onMsgClick={onMsgClick}
                />
            ) : (
                <RightImg right={props.right} messageText={messageText} />
            )}
            
        </StyledRight>
    )
}

export default Right;