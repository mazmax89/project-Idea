import * as React from 'react';
import * as reactStyles from 'react-css-modules';
import {Button, Form, FormGroup} from 'react-bootstrap';
import validateInput from '../../../server/utils/validations/CreateIdea';
import TextFieldGroup from '../common/TextFieldGroup';

interface ICreateIdeaProps {
    createIdea: (ideaData: object, authData: object) => any;
    auth: object;

}
const style = require('./CreateIdeaStyle.scss');
@reactStyles(style)
class CreateIdea extends React.Component<ICreateIdeaProps, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            ideaName: '',
            ideaDescription: '',
            errors: {},
        };
        this.onChanged = this.onChanged.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    private onChanged(e: any) {
        let stateName: string = e.target.name;
        if (stateName === 'ideaName') {
            this.setState({ideaName: e.target.value});
        } else if (stateName === 'ideaDescription') {
            this.setState({ideaDescription: e.target.value});
        }
    }

    private isValid() {
        const {errors, isValid} = validateInput(this.state);

        if (!isValid) {
            this.setState({errors});
        }

        return isValid;
    }

    private onSubmit(e: any) {
        e.preventDefault();
        if (this.isValid()) {
            this.setState({errors: {}, isLoading: true});
            this.props.createIdea(this.state, this.props.auth).then(
                () => {

                }, (data: any) => {
                    this.setState({errors: data.response.data, isLoading: false});
                },
            );
        }
    }

    public render() {
        let errors = this.state.errors;
        return (
            <Form className={style.createIdea} horizontal onSubmit={this.onSubmit}>
                <div className={style.title}>
                    <h1>Create idea</h1>
                </div>
                <FormGroup className={style.formGroup} controlId='formHorizontalEmail'>
                    <TextFieldGroup
                        error={errors.ideaName}
                        label='Idea name'
                        onChanged={this.onChanged}
                        field='ideaName'
                        type='text'
                    />
                    <textarea name='ideaDescription' onChange={this.onChanged} placeholder='Idea description'
                              maxLength={255}/>
                    {errors && <span className={style.warning}>{errors.ideaDescription}</span>}
                    <Button className={style.btnDefault} type='submit'>
                        Create
                    </Button>
                </FormGroup>
            </Form>
        );
    }
}



export default CreateIdea;
