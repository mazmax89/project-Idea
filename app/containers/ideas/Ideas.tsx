import * as React from 'react';
import * as reactStyles from 'react-css-modules';
import {getAllIdeas} from '../../actions/ideaAction';
import {connect} from 'react-redux';
import IdeaItem from '../../components/ideaItemList/IdeaItemList';

interface IIdeasProps {
    getAllIdeas: () => any;
}

const style = require('./IdeasStyle.scss');
reactStyles(style);
class Ideas extends React.Component<IIdeasProps, any> {

    constructor(props: IIdeasProps) {
        super(props);
        this.state = {
            idea: [],
            errors: {},
        };
        this.init();
    }

    private init(): void {
        this.props.getAllIdeas().then(
            (data: any) => {
                this.setState({idea: data.data.idea});
            }, (data: any) => {
                this.setState({errors: data.response.data, isLoading: false});
            },
        );

    }

    public render(): JSX.Element {
        return (
            <div className={style.ideas}>
                <h1 className={style.heading}>All Ideas</h1>
                <div className={style.ideaList}>
                    <IdeaItem ideaData={this.state.idea}/>
                </div>
            </div>
        );
    }
}

export default connect(null, {getAllIdeas})(Ideas);