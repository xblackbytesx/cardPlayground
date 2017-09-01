import React, {Component} from 'react';

export default class PlusButton extends Component {

    render() {
        return <input data-test="min" type="button" onClick={this.props.onClick} value="-"/>;
    }
}
