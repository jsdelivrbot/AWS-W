import React, { Component } from 'react';

export default class ModifyExistingFeed extends Component {

    constructor(props) {
        super(props);
        this.state = {name: 'beena', id: 1};
        this.changeName = this.changeName.bind(this);
    }


    changeName(e) {

        this.setState({name: e.target.value});
    }

    render() {
        const {} = this.props;
        return (
            <div>
 <h2>second tab</h2>
                <p>sample</p>
            <p></p>
            </div>
        );
    }

}
