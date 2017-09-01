import React, {Component} from 'react';

export default class PlusButton extends Component {

    render() {
        const {
            disabled,
            onClick
        } = this.props;

        return <input data-test="plus" type="button" disabled={disabled} onClick={onClick} value="+"/>;
    }
}
