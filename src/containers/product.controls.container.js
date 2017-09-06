import React, {Component} from 'react';
import PropTypes from 'prop-types'

export default class ProductControlsContainer extends Component {

    static PropTypes = {
        children: PropTypes.func,
        quantity: PropTypes.number,
        onStateChange: PropTypes.func
    };

    static stateChangeEvents = {
        QUANTITY_INCREASED: 'quantity-increased',
        QUANTITY_DECREASED: 'quantity-decreased',
        QUANTITY_CHANGED: 'quantity-changed',
        QUANTITY_SAVED: 'quantity-saved',
        QUANTITY_ERROR: 'quantity-error',
        DELETED_FROM_SHOPPINGLIST: '',
    };

    static defaultProps = {
        onStateChange: () => {}
    };

    state = {
        quantity: 0,
        incrementAmount: 1,
        isSaving: false
    };

    constructor(...args) {
        super(...args);

        this.state = this.getState();
    }

    incrementQuantity = (state) => {
        return state.quantity + this.getQuantityToIncrement();
    };

    decrementQuantity = (state) => {
        return state.quantity - 1;
    };

    handlePlusEvent = () => {
        const incrementQuantity = this.handleQuantityMutation(this.incrementQuantity);
        this.setState(incrementQuantity, () => this.saveQuantity());
    };

    handleMinEvent = () => {
        const newQuantity = this.state.quantity - 1;

        if (newQuantity) {
            const decrementQuantity = this.handleQuantityMutation(this.decrementQuantity);
            this.setState(decrementQuantity, () => this.saveQuantity());
        } else {
            this.deleteFromShoppingList();
        }
    };

    /**
     * Handles quantity and sets it state
     *
     * @param action
     * @returns {function(*=)}
     */
    handleQuantityMutation(action) {
        return (prevState) => {
            const quantity = action(prevState);
            this.triggerQuantityDifferenceChange(quantity, prevState.quantity);

            return {
                quantity
            }
        };
    }

    triggerQuantityDifferenceChange(newQuantity, oldQuantity) {
        if (newQuantity > oldQuantity) {
            this.props.onStateChange(ProductControlsContainer.stateChangeEvents.QUANTITY_INCREASED, newQuantity);
        } else {
            this.props.onStateChange(ProductControlsContainer.stateChangeEvents.QUANTITY_DECREASED, newQuantity);
        }
    }

    getQuantityToIncrement() {
        return this.state.incrementAmount;
    }

    deleteFromShoppingList() {
        this.setState({quantity: 0});

        console.log('deleted!');
    }

    saveQuantity() {
        // this.setState({isSaving: true});
        // console.log('=======> saving...');

        setTimeout(() => {
            this.setState({isSaving: false});
        }, 2000);
        // return fetch().then(response => response.json())
        //     .then()
        //     .catch(err => console.log);
    }

    /**
     * This determines whether a prop is a "controlled prop" meaning it is
     * state which is controlled by the outside of this component rather
     * than within this component.
     *
     * @param key
     * @returns {boolean}
     */
    isControlledProp(key) {
        return this.props[key] !== undefined
    }

    /**
     * Gets the state based on internal state or props
     * If a state value is passed via props, then that
     * is the value given, otherwise it's retrieved from
     * stateToMerge
     *
     * This will perform a shallow merge of the given state object
     * with the state coming from props
     *
     * @param {Object} stateToMerge defaults to this.state
     * @return {Object} the state
     */
    getState(stateToMerge = this.state) {
        return Object.keys(stateToMerge).reduce((state, key) => {
            state[key] = this.isControlledProp(key)
                ? this.props[key]
                : stateToMerge[key];
            return state
        }, {})
    }

    /**
     * This is intended to be used to compose event handlers
     * They are executed in order until one of them calls
     * `event.preventDefault()`.
     *
     * @param fns the event hanlder functions
     * @returns the event handler to add to an element
     */
    composeEventHandlers(...fns) {
        return (event, ...args) => {
            return fns.some(fn => {
                fn && fn(event, ...args);
                return event.defaultPrevented
            });
        }
    }

    getPlusProps = ({onClick, ...rest} = {}) => {
        return {
            onClick: this.composeEventHandlers(onClick, this.handlePlusEvent),
            disabled: this.state.isSaving,
            ...rest,
        }
    };

    getMinProps = ({onClick, ...rest} = {}) => {
        return {
            onClick: this.composeEventHandlers(onClick, this.handleMinEvent),
            disabled: this.state.isSaving,
            ...rest,
        }
    };

    render() {
        return this.props.children({
            getPlusProps: this.getPlusProps,
            getMinProps: this.getMinProps,
            quantity: this.state.quantity
        });
    }
}
