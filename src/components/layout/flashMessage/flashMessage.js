import React from 'react';
import * as layoutActions from '../../../store/layout/actions';
import { MdClose } from 'react-icons/md';
import { connect } from 'react-redux';


const flashMessage = (props) => {
    const { isFlashMessageOpen, message, styleProps, onClose } = props;
    return (
        <div className={`flash-message ${isFlashMessageOpen ? '' : 'js-hide'}`}>
            <span> {message}</span>
            <div className="flash-message__close-container" onClick={onClose}>
                <MdClose className="flash-message__close" />
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        isFlashMessageOpen: state.layout.isFlashMessageOpen,
        message: state.layout.flashMessage,
        styleProps: state.layout.flashMessageProps
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onClose: () => dispatch(layoutActions.closeFlashMessage()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(flashMessage)
