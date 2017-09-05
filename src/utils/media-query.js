import React, {Component} from 'react';
import PropTypes from 'prop-types'

export default class MediaQuery extends Component {

    static PropTypes = {
        children: PropTypes.func
    };

    state = {
        phone: false,
        phablet: false,
        tablet: false,
        desktop: false,
        wide: false,
    };

    constructor(...args) {
        super(...args);

        for (const key in this.mediaQueries) {
            const query = this.mediaQueries[key];

            const mq = window.matchMedia(query);

            mq.addListener(this.handleChange);
            this.breakpoints.set(key, mq);
        }
    }

    breakpoints = new Map();
    listeners = [];

    mediaQueries = {
        phone: '(max-width: 399px)',
        phablet: '(max-width: 767px) and (min-width: 400px)',
        tablet: '(max-width: 1023px) and (min-width: 768px)',
        desktop: '(max-width: 1535px) and (min-width: 1024px)',
        wide: '(min-width: 1536px)'
    };

    createState() {
        const nextState = {};

        for (let [key, mediaQuery] of this.breakpoints.entries()) {
            const { matches } = mediaQuery;
            nextState[key] = matches;
        }

        return nextState;
    }

    handleChange = () => {
        const nextState = this.createState();

        this.listeners.forEach(listener => listener(nextState));
    };

    subscribe(listener) {
        this.listeners.push(listener);

        return () => {
            const index = this.listeners.indexOf(listener);
            this.listeners.splice(index, 1);
        };
    }

    componentDidMount() {
        this.unsubscribe = this.subscribe((nextState) => {
            this.setState(nextState);
        });
    }

    componentWillUnMount() {
        this.unsubscribe();
    }

    render() {
        return this.props.children({...this.state});
    }
};
