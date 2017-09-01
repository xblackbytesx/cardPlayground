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
    // describe('Saving the quantity on the server', () => {
    //
    //     describe('When the quantity is greater than the old quantity', () => {
    //
    //         it('should trigger an event', () => {
    //             expect(true).toBe(false);
    //         });
    //     });
    //
    //     describe('When saving has succeeded', () => {
    //         describe('when quantity is not zero', () => {
    //
    //             it('should trigger an event', () => {
    //                 expect(true).toBe(false);
    //             });
    //         });
    //
    //         describe('when quantity is zero', () => {
    //
    //             it('should trigger an event', () => {
    //                 expect(true).toBe(false);
    //             });
    //         });
    //     });
    //
    //     describe('When saving has failed', () => {
    //
    //         it('should trigger an event', () => {
    //             expect(true).toBe(false);
    //         });
    //     });
    //
    // });
    //
    // describe('Get quantity to increment', () => {
    //     describe('when model has no add quantity', () => {
    //         beforeAll(() => {
    //             wrapper = renderControlsContainer();
    //         });
    //
    //         it('should use the default quantity', () => {
    //             clickPlusButton(wrapper);
    //
    //             expect(wrapper.state().quantity).toBe(1);
    //         });
    //     });
    //
    //     describe('When model has add quantity', () => {
    //         beforeAll(() => {
    //             wrapper = renderControlsContainer();
    //         });
    //
    //         it('should use add quantity', () => {
    //             wrapper.setState({incrementAmount: 10});
    //             clickPlusButton(wrapper);
    //
    //             expect(wrapper.state().quantity).toBe(10);
    //         });
    //
    //     });
    // });
    //
    // describe('Decrement quantity', () => {
    //
    //     describe('when quantity is above zero', () => {
    //         beforeAll(() => {
    //             wrapper = renderControlsContainer();
    //         });
    //
    //         it('should decrement quantity', () => {
    //             wrapper.setState({quantity: 10});
    //             clickMinButton(wrapper);
    //
    //             expect(wrapper.state().quantity).toBe(9);
    //         });
    //     });
    //
    //     describe('when quantity is zero', () => {
    //         beforeAll(() => {
    //             wrapper = renderControlsContainer();
    //         });
    //
    //         it('should delete product from shopping list', () => {
    //             wrapper.setState({quantity: 1});
    //
    //             const instance = wrapper.instance();
    //             const spy = jest.spyOn(instance, 'deleteFromShoppingList').mockImplementation(() => true);
    //
    //             clickMinButton(wrapper);
    //
    //             expect(spy).toHaveBeenCalledTimes(1);
    //         });
    //     });
    //
    // });

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


        describe('when quantity is zero', () => {
            it('should delete product from shopping list', () => {
                const {Component, childSpy} = setup();
                const wrapper = mount(<Component quantity={10}/>);
                console.log(wrapper);

                wrapper.setState({isSaving: true});

                const button = wrapper.find(testhookId('min'));
                button.simulate('click');

                expect(childSpy).toHaveBeenLastCalledWith(
                    expect.objectContaining({quantity: 10}),
                );

                // const instance = wrapper.instance();
                // const spy = jest.spyOn(instance, 'deleteFromShoppingList').mockImplementation(() => true);
                //
                //
                // expect(spy).toHaveBeenCalledTimes(1);
            });
        });
    });

    it('clicking on the button opens and closes the menu', () => {
        const {Component, childSpy} = setup();
        const wrapper = mount(<Component />);
        const button = wrapper.find(testhookId('plus'));
        button.simulate('click');

        expect(childSpy).toHaveBeenLastCalledWith(
            expect.objectContaining({quantity: 1}),
        );
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
