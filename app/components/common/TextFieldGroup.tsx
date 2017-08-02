import * as React from 'react';
import {FormControl} from 'react-bootstrap';
import * as reactStyles from 'react-css-modules'
const style = require('./TextFieldGroupStyle.scss');

export interface ITextFieldGroupProps {
    field: string,
    label: string,
    error: string,
    type: string,
    onChanged: any
}
@reactStyles(style)
class TextFieldGroup extends React.Component<ITextFieldGroupProps, any> {

    constructor(props: ITextFieldGroupProps) {
        super(props);
        this.props = props;
    }

    public render() {
        return (
            <div>
                <FormControl className={style.formControl}
                             type={this.props.type}
                             name={this.props.field}
                             placeholder={this.props.label}
                             onChange={this.props.onChanged}
                             maxLength={32}
                />
                {this.props.error && <span className={style.warning}>{this.props.error}</span>}
            </div>
        );
    }
}

export default TextFieldGroup;