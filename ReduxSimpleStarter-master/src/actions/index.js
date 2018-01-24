import React, { Component } from 'react';

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {name:'beena',id:1};
        this.changeName = this.changeName.bind(this);
    }

    changeName(e) {
        //console.log(data);
        this.setState({name:e.target.value});
    }

    render() {
        const {} = this.props;
        return (
            <div>React simple starter
                <input type='text' value={this.state.name} onChange={this.changeName}/>
            </div>
        );
    }
}
