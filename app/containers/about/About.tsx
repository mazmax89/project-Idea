import * as React from 'react';
import * as reactStyles from 'react-css-modules';

const style = require('./AboutStyle.scss');
@reactStyles(style)

export default class About extends React.Component<{}, {}> {

    public render() {
        return (
            <div className={style.About}>
                <h1 className={style.heading}>About app</h1>
                <div>
                    <p>Course project/ OOP 2017 </p>
                </div>
            </div>
        );
    }
}