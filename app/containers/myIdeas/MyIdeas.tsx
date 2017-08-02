import * as React from 'react';
import * as reactStyles from 'react-css-modules';
import CreateIdea from '../../components/createIdea/CreateIdea'
import {connect} from 'react-redux';
import {createIdea} from '../../actions/ideaAction';

interface IMyIdeaProps {
    createIdea: (ideaData: object, authData: object) => any;
    auth: object;
}

const style = require('./myIdeasStyle.scss');
reactStyles(style);
class MyIdeas extends React.Component<IMyIdeaProps, {}> {

    public render(): JSX.Element {
        return (
            <div className={style.myIdeas}>
                <h1 className={style.heading}>Create Ideas</h1>
                <div className={style.block}>
                    <CreateIdea createIdea={this.props.createIdea} auth={this.props.auth}/>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state: any) {
    return {
        auth: state.auth,
    };
}

export default connect(mapStateToProps, { createIdea})(MyIdeas);
