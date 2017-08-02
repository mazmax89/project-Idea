import * as React from 'react';
import * as reactStyles from 'react-css-modules'
const style = require('./FlashMessagesStyles.scss');

interface IFlashMessageProps {
    message: any;
}
@reactStyles(style)
class FlashMessage extends React.Component<IFlashMessageProps, any> {

    public render() {
        return (
            <div className={style.FlashMessageContainer}>
                {this.props.message.text}
                <button className={style.closeFlashMessage}>
                    <span>Close</span>
                </button>
            </div>
        );
    }
}

export default FlashMessage;