import React from 'react'
import classNames from 'classnames';

import './modalStyle.css'

function Modal(props) {
    return (
        <>
            <div
                className={classNames('modal-backdrop', { open: props.isOpen })}
                onClick={props.onClose}
            >
                <div className="modal-container">
                    {props.children}
                </div>
            </div>
        </>
    )
}

export default Modal