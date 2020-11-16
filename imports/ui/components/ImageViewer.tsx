import React from 'react';
import FontAwesome from 'react-fontawesome';

import StyledImageViewer from '../elements/StyledImageViewer';

const ImageViewer = (props:any):JSX.Element => {
    
    const { imageUrl, onClose } = props;

    return (
        <StyledImageViewer>
            <div className="IV--close">
                <FontAwesome 
                    className="IV--icon"
                    name="times"
                    onClick={onClose}
                />
            </div>
            <div className="IV--imageContainer">
                <img 
                    src={imageUrl}
                    alt=""
                    className="IV--image"
                />
            </div>
        </StyledImageViewer>
    )
}

export default ImageViewer;