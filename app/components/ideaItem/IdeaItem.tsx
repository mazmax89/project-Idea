import * as React from 'react';
import * as reactStyles from 'react-css-modules';

interface IIdeaItemProps {
    ideaData: object;
}
const style = require('./IdeaItemStyle.scss');
@reactStyles(style)
class IdeaItem extends React.Component<IIdeaItemProps, {}> {

    constructor(props: IIdeaItemProps) {
        super(props);
    }

    render() {
        let ideaData: any = this.props.ideaData;
        return (
            <div className={style.block}>
                <p>Idea name: {ideaData.idea_name}</p>
                <p>Idea description: {ideaData.idea_description}</p>
                <p>Created by: {ideaData.user_id}</p>
                <p>Created at: {ideaData.created_at}</p>
            </div>

        );
    }
}
export default IdeaItem;