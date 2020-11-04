import React from 'react';

import StyledRight from '../elements/StyledRight';
import RightImg from './RightImg';

const messageText:string = "Ouattesapp se connecte à votre téléphone pour synchroniser les messages. Pour réduire l'utilisation des données, connectez votre téléphone à un réseau wifi."

const Right = (props:any):JSX.Element => {
    return (
        <StyledRight>
            <RightImg right={props.right} messageText={messageText} />
        </StyledRight>
    )
}

export default Right;