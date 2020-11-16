import React from 'react';
import FontAwesome from 'react-fontawesome';
import { uploadFile } from '../../api/helpers';

import StyledAvatar from '../elements/StyledAvatar';

const Avatar = (props:any):JSX.Element => {

    const { inLS } = props;
    const [hover, setHover] = React.useState<boolean>(false);

    const showOverlay = ():void => {
        if(!hover){
            setHover(true);
        }
        return;
    }

    const hideOverlay = ():void => {
        if(hover){
            setHover(false);
        }
        return;
    }

    const handleOverlayClick = ():void => {
        const fileInput:HTMLElement = document.getElementById('avatarupload');
        fileInput.click();
    }

    const onInputChange = (e:React.ChangeEvent<HTMLInputElement>):void => {
        const file = e.target.files[0];
        if(file){
            uploadFile(file, false);
            hideOverlay();
        }
    }

    const renderOverlay = ():JSX.Element => {
        if(inLS && hover){
            return (
                <div
                    className="avatar--overlay"
                    onMouseLeave={hideOverlay}
                    onClick={handleOverlayClick}
                >
                    <FontAwesome 
                        name="camera"
                        className="overlay--icon"
                    />
                    <span className="overlay--text">CHANGER DE</span>
                    <span className="overlay--text">PHOTO DE</span>
                    <span className="overlay--text">PROFIL</span>
                </div>
            )
        }
    }

    return (
        <StyledAvatar large={props.large} big={props.big}>
            <img 
                src={props.avatar_url}
                alt="avatar"
                className="avatar--img"
                onClick={props.onAvatarClick}
                onMouseEnter={showOverlay}
            />
            <input 
                id="avatarupload"
                type="file"
                accept="image/*"
                onChange={onInputChange}
            />
            {renderOverlay()}
        </StyledAvatar>
    )
}

export default Avatar;