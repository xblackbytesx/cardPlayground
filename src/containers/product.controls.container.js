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
        DELETED_FROM_SHOPPINGLIST: 'deleted-from-shoppinglist',
    };

    static defaultProps = {
        onStateChange: () => {},
        fetch: () => {
            return new Promise(resolve => {
                setTimeout(() => resolve({
                    json: () => Promise.resolve({quantity: 11})
                }), 500);
            })
        }
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

    getQuantityToIncrement() {
        return this.state.incrementAmount;
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
     * Computes the next state
     *
     * @param action function that computes the new quantity
     * @returns Object the new product quantity
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

    handleSaveQuantitySuccess = (response) => {
        const {quantity} = response;

        if (quantity) {
            this.props.onStateChange(ProductControlsContainer.stateChangeEvents.QUANTITY_SAVED, quantity);
        } else {
            this.props.onStateChange(ProductControlsContainer.stateChangeEvents.DELETED_FROM_SHOPPINGLIST);
        }

        this.setState({
            quantity,
            isSaving: false
        });
    };

    handleSavenQuantityError = (error) => {
        this.props.onStateChange(ProductControlsContainer.stateChangeEvents.QUANTITY_ERROR, error);
    };

    triggerQuantityDifferenceChange(newQuantity, oldQuantity) {
        if (newQuantity > oldQuantity) {
            this.props.onStateChange(ProductControlsContainer.stateChangeEvents.QUANTITY_INCREASED, newQuantity);
        } else {
            this.props.onStateChange(ProductControlsContainer.stateChangeEvents.QUANTITY_DECREASED, newQuantity);
        }
    }

    deleteFromShoppingList() {
        this.setState({quantity: 0});
        this.props.onStateChange(ProductControlsContainer.stateChangeEvents.DELETED_FROM_SHOPPINGLIST);
    }

    saveQuantity() {
        this.setState({isSaving: true});

        return this.props.fetch()
            .then(response => response.json())
            .then(this.handleSaveQuantitySuccess)
            .catch(this.handleSavenQuantityError);
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
