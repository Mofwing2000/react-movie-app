import React,{useEffect, useState} from 'react'
import './modal.scss';
function Modal(props) {

    const handleClose = () => {
        if(props.onClose)
            props.onClose();
    }

    return (
    <div className={`modal__content `}>
        <div className='modal__content__item'>
            {props.children}
            <div className='modal__content__item__close' onClick={handleClose}>
                <i className='bx bx-x'></i>
            </div>
        </div>
    </div>
  )
}
export default Modal