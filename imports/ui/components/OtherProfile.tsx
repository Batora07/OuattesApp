import React from 'react';
import FontAwesome from 'react-fontawesome';

import StyledOtherProfile from '../elements/StyledOtherProfile';
import { User } from '../../api/models';
import { findOtherUser } from '../../api/helpers';
import Header from './Header';
import Avatar from './Avatar';
import Actu from './Actu';
import ActuItem from './ActuItem';

const icons = [
    {
        name:"",
        func: () => {}
    },
    {
        name:"",
        func: () => {}
    },
    {
        name:"",
        func: () => {}
    }
]

const OtherProfile = (props:any):JSX.Element => {
    const {otherUserId, onClose, onShowImage} = props;

    const otherUser:User = findOtherUser(otherUserId);
    const {profile : {phone, picture, actu}, username } = otherUser;

    return (
        <StyledOtherProfile>
            {
                otherUser ? (
                    <>
                        <Header iconClass="greyIcon" icons={icons}>
                            <div className="OPH--heading">
                                <FontAwesome
                                    name="times"
                                    className="iconOtherProfile"
                                    onClick={onClose}
                                />
                                <span className="OPH--title">Infos</span>
                            </div>
                        </Header>
                        <div className="__scroll">
                            {/* OTHER PROFILE HEADER */}
                            <div className="OP--imageContainer">
                                <Avatar 
                                    onAvatarClick={() => onShowImage(picture)} 
                                    big 
                                    avatar_url={picture} 
                                />
                                {/* OTHER PROFILE IMAGE CONTAINER */}
                                <div className="OPIC--txtContainer">
                                    <span className="OPIC--title">{username}</span>
                                    <span className="OPIC--sbTitle">en ligne</span>
                                </div>
                            </div>
                            <Actu actu={actu} phone={phone} />
                            <ActuItem iconName="ban" content="Bloquer" />
                            <ActuItem iconName="thumbs-down" red content="Supprimer le Contact" />
                            <ActuItem iconName="trash" red content="Supprimer la discussion" />
                        </div>
                    </>
                ) : 
                null
            }
        </StyledOtherProfile>
    )
}

export default OtherProfile;