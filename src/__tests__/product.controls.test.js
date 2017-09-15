import React from 'react';
import {mount} from 'enzyme'
import ProductControlsContainer from '../containers/product.controls.container';
import PlusButton from '../components/controls/plus.button';
import MinButton from '../components/controls/min.button';


describe('', () => {
    var wrapper;

    // describe('When setting the quantity with disabled controls', () => {
    //     beforeAll(() => {
    //         wrapper = renderControlsContainer();
    //     });
    //
    //     it('should not set the quantity', ()=> {
    //         clickPlusButton(wrapper);
    //         expect(wrapper.state().quantity).toBe(0);
    //     });
    // });
    //
    describe('Saving the quantity on the server', () => {
        describe('When the quantity is greater than the old quantity', () => {
            it('should trigger an quantity increased event', () => {
                const onChangeSpy = jest.fn();
                const wrapper = mount(
                    <ProductControlsContainer onStateChange={onChangeSpy}>
                        {({getPlusProps}) => (
                            <div>
                                <PlusButton {...getPlusProps()} />
                            </div>
                        )}
                    </ProductControlsContainer>,
                );

                const button = wrapper.find(testhookId('plus'));
                button.simulate('click');

                expect(onChangeSpy).toHaveBeenCalledTimes(1);
                expect(onChangeSpy).toHaveBeenLastCalledWith(ProductControlsContainer.stateChangeEvents.QUANTITY_INCREASED, 1);
            });
        });

        describe('When saving has succeeded', () => {
            describe('when quantity is not zero', () => {
                it('should trigger an event', () => {
                    const onChangeSpy = jest.fn();
                    const wrapper = mount(
                        <ProductControlsContainer onStateChange={onChangeSpy} quantity={10}>
                            {({getMinProps}) => (
                                <div>
                                    <MinButton {...getMinProps()} />
                                </div>
                            )}
                        </ProductControlsContainer>,
                    );

                    wrapper.instance().saveQuantity = jest.fn();
                    // console.log( wrapper.instance());
                    wrapper.setState({ quantity: 0});

                    const button = wrapper.find(testhookId('min'));
                    button.simulate('click');

                    expect(wrapper.instance().saveQuantity).toHaveBeenCalledTimes(1);
                });
            });

            describe('when quantity is zero', () => {
                it('should trigger an delete from shoppinglist event', () => {
                    const onChangeSpy = jest.fn();
                    const wrapper = mount(
                        <ProductControlsContainer onStateChange={onChangeSpy} quantity={1}>
                            {({getMinProps}) => (
                                <div>
                                    <MinButton {...getMinProps()} />
                                </div>
                            )}
                        </ProductControlsContainer>,
                    );

                    const button = wrapper.find(testhookId('min'));
                    button.simulate('click');

                    expect(onChangeSpy).toHaveBeenCalledTimes(1);
                    expect(onChangeSpy).toHaveBeenLastCalledWith(ProductControlsContainer.stateChangeEvents.DELETED_FROM_SHOPPINGLIST);

                });
            });
        });

        describe('When saving has failed', () => {
            it('should trigger an event', () => {
                const onChangeSpy = jest.fn();
                const fetch = () => new Promise((resolve, reject) => {
                    reject();
                });
                const wrapper = mount(
                    <ProductControlsContainer fetch={fetch} onStateChange={onChangeSpy} quantity={10}>
                        {({getMinProps}) => (
                            <div>
                                <MinButton {...getMinProps()} />
                            </div>
                        )}
                    </ProductControlsContainer>,
                );

                wrapper.instance().saveQuantity = jest.fn();
                const button = wrapper.find(testhookId('min'));
                button.simulate('click');

                expect(wrapper.instance().saveQuantity).toHaveBeenCalledTimes(1);
                expect(onChangeSpy).toHaveBeenLastCalledWith(ProductControlsContainer.stateChangeEvents.DELETED_FROM_SHOPPINGLIST);
            });
        });

    });

    describe('Get quantity to increment', () => {
        describe('when model has no add quantity', () => {
            it('should use the default quantity', () => {
                const {Component, childSpy} = setup();
                const wrapper = mount(<Component />);
                const button = wrapper.find(testhookId('plus'));
                button.simulate('click');

                expect(childSpy).toHaveBeenLastCalledWith(
                    expect.objectContaining({quantity: 1}),
                );
            });
        });

        describe('When model has add quantity', () => {
            it('should use add quantity', () => {
                const {Component, childSpy} = setup();
                const wrapper = mount(<Component incrementAmount={10} />);
                const button = wrapper.find(testhookId('plus'));

                button.simulate('click');

                expect(childSpy).toHaveBeenLastCalledWith(
                    expect.objectContaining({quantity: 10}),
                );
            });
        });
    });

    describe('Decrement quantity', () => {
        var wrapper;

        beforeAll(() => {

        });

        describe('when quantity is above zero', () => {
            it('should decrement quantity', () => {
                const { Component, childSpy} = setup();
                const wrapper = mount(<Component quantity={10} />);
                const button = wrapper.find(testhookId('min'));
                button.simulate('click');

                expect(childSpy).toHaveBeenLastCalledWith(
                  expect.objectContaining({ quantity: 9})
                );
            });
        });

        describe('when quantity is zero', () => {
            it('should delete product from shopping list', () => {
                const wrapper = mount(
                    <ProductControlsContainer quantity={1}>
                        {({getMinProps}) => (
                            <div>
                                <MinButton {...getMinProps()} />
                            </div>
                        )}
                    </ProductControlsContainer>,
                );

                const button = wrapper.find(testhookId('min'));
                wrapper.instance().deleteFromShoppingList = jest.fn();
                button.simulate('click');

                expect(wrapper.instance().deleteFromShoppingList).toHaveBeenCalledTimes(1);
            });
        });

    });

});

describe('Decrement quantity', () => {

    describe('when quantity is above zero', () => {

        it('should decrement quantity', () => {
            const {Component, childSpy} = setup();
            const wrapper = mount(<Component quantity={10}/>);
            const button = wrapper.find(testhookId('min'));
            button.simulate('click');

            expect(childSpy).toHaveBeenLastCalledWith(
                expect.objectContaining({quantity: 9}),
            );
        });


        // describe('when quantity is zero', () => {
        //     it('should delete product from shopping list', () => {
        //         const {Component, childSpy} = setup();
        //         const wrapper = mount(<Component quantity={10}/>);
        //
        //         wrapper.setState({isSaving: true});
        //
        //         const button = wrapper.find(testhookId('min'));
        //         button.simulate('click');
        //
        //         expect(childSpy).toHaveBeenLastCalledWith(
        //             expect.objectContaining({quantity: 10}),
        //         );
        //
        //         // const instance = wrapper.instance();
        //         // const spy = jest.spyOn(instance, 'deleteFromShoppingList').mockImplementation(() => true);
        //         //
        //         //
        //         // expect(spy).toHaveBeenCalledTimes(1);
        //     });
        // });
    });

    it('getPlusProps returns all given props', () => {
        const buttonProps = {'data-foo': 'bar'};
        const Button = jest.fn(props => <PlusButton {...props} />);
        mount(
            <ProductControlsContainer>
                {({getPlusProps}) => (
                    <div>
                        <Button {...getPlusProps(buttonProps)} />
                    </div>
                )}
            </ProductControlsContainer>,
        );
        expect(Button).toHaveBeenCalledTimes(1);

        // react objects..
        const context = expect.any(Object);
        const updater = expect.any(Object);

        expect(Button).toHaveBeenCalledWith(
            expect.objectContaining(buttonProps),
            context,
            updater,
        );
    });

});

function setup() {
    const childSpy = jest.fn(({getPlusProps, getMinProps}) =>
        (<div>
            <PlusButton {...getPlusProps()} />
            <MinButton {...getMinProps()} />
        </div>),
    );

    return {
        Component: (props) => (
            <ProductControlsContainer {...props}>
                {childSpy}
            </ProductControlsContainer>
        ),
        childSpy
    }
}

function testhookId(id) {
    return `[data-test="${id}"]`
}
