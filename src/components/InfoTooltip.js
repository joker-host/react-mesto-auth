import React from 'react';
import Error from '../images/Error.svg';
import Success from '../images/Success.svg';

const InfoTooltip = ({ isOpen, onClose, isSuccess }) => {

<<<<<<< HEAD
    return (
        <div className={`popup popup_type_tooltip ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container popup__container_type_tooltip">
                <img className="popup__image" src={Success} />
                <h2 className="popup__title popup__title_type_tooltip">Вы успешно зарегистрировались!</h2>
                <button type="button" className={`popup__close-icon popup__close-icon_tooltip`} onClick={onClose} />
            </div>
        </div>
    );
}

export default InfoTooltip;

{/* <div className={`popup popup_type_tooltip ${isOpen ? 'popup_opened' : ''}`}></div> */}
=======
    if (isOpen.data) {
        return (
            <div className={`popup popup_type_tooltip ${isOpen ? 'popup_opened' : ''}`}>
                <div className="popup__container popup__container_type_tooltip">
                    <img className="popup__image" src={Success} />
                    <h2 className="popup__title popup__title_type_tooltip">Вы успешно зарегистрировались!</h2>
                    <button type="button" className={`popup__close-icon popup__close-icon_tooltip`} onClick={onClose} />
                </div>
            </div>
        )
    } else {
        return (
            <div className={`popup popup_type_tooltip ${isOpen ? 'popup_opened' : ''}`}>
                <div className="popup__container popup__container_type_tooltip">
                    <img className="popup__image" src={Error} />
                    <h2 className="popup__title popup__title_type_tooltip">{isOpen.error}</h2>
                    <button type="button" className={`popup__close-icon popup__close-icon_tooltip`} onClick={onClose} />
                </div>
            </div>
        )
    }
}

export default InfoTooltip;
>>>>>>> 7afc69f4a567d553b150fc3c15db9316c357a23b
