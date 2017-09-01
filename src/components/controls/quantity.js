import React, {Component} from 'react';

export const Quantity = (props) => (
    <input type="text" maxLength="4" pattern="[0-9]*" value={props.value} />
);
