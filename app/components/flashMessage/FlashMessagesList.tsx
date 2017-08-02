import * as React from 'react';
import FlashMessage from './FlashMessage';
import {connect} from 'react-redux';

interface ISignupFormProps {
    messages: any;
}


class FlashMessagesList extends React.Component<ISignupFormProps, any> {

    public render() {
        let messages = this.props.messages;
        if (this.props.messages !== undefined) {
            messages = this.props.messages.map((message: any) =>
                <FlashMessage key={message.id} message={message}/>,
            );
        }
        return (
            <div>{messages}</div>
        );
    }
}

function mapStatesToProps(state: any) {
    return {
        messages: state.flashMessages,
    };
}

export default connect(mapStatesToProps, null)(FlashMessagesList);