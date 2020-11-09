import React from 'react';
import FontAwesome from 'react-fontawesome';
import { MessageType } from '../../api/models';

import StyledModal from '../elements/StyledModal';

const Modal = (props:any):JSX.Element => {
    const {selectedImage, onClose, onUpload} = props;

    return (
        <StyledModal>
            <div className="modal--header">
                <FontAwesome
                    className="modal--header__icon"
                    size="2x"
                    name="times"
                    onClick={onClose}
                />
                <span className="modal--header__title">
                    Aperçu
                </span>
            </div>
            <div className="modal--body">
                <img
                    style={{height: "auto", width: "auto", maxWidth: "500px", maxHeight:"460px"}}
                    alt="img"
                    src={selectedImage}
                />
                <div onClick={()=>onUpload("", MessageType.IMAGE)} className="modal--body__fab">
                    <FontAwesome
                        name="paper-plane"
                        size="3x"
                    />
                </div>
            </div>
            <div className="modal--footer">
                <div className="modal--footer__box">
                    <img
                        style={{width: "100%", height: "100%"}}
                        alt="img"
                        src={selectedImage}
                    />
                </div>
                <div className="modal--footer__box">
                    <FontAwesome 
                        size="2x"
                        name="plus"
                    />
                    <span>AJOUTER UN FICHIER</span>
                </div>
            </div>
        </StyledModal>
    )
}

export default Modal;