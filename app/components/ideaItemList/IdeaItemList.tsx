import * as React from 'react';
import * as reactStyles from 'react-css-modules';
import IdeaItem from '../ideaItem/IdeaItem';

interface IIdeaItemProps {
    ideaData: object[];
}
const style = require('./IdeaItemListStyle.scss');
@reactStyles(style)
class IdeaItemList extends React.Component<IIdeaItemProps, {}> {

    constructor(props: IIdeaItemProps) {
        super(props);
    }

    render() {
        let ideaData: object[] = this.props.ideaData;
        return (
            <div>
                {ideaData.map((idea: any) => {
                    return <IdeaItem ideaData = {idea} key={idea.id}/>
                })}
            </div>

        );
    }
}
export default IdeaItemList;