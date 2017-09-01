import React, {Component} from 'react';
import Product from './components/product/product';
import ProductControleContainer from './containers/product.controls.container';
// import Controls from './components/controls/controls';
// import Ready from './ready/index';
import PlusButton from './components/controls/plus.button';
import MinButton from './components/controls/min.button';
import {Quantity} from './components/controls/quantity';

class App extends Component {

    render() {
        return (
            <div>
                <ProductControleContainer quantity={10}>
                    {({
                        getPlusProps,
                        getMinProps,
                        quantity
                    }) => (
                        <div>
                            <PlusButton {...getPlusProps({
                                onClick: () => console.log('tweede click handler')
                            })}/>
                            <Quantity value={quantity}/>
                            <MinButton {...getMinProps()} />
                        </div>
                    )}
                </ProductControleContainer>

                <div className="lane">
                    <div className="card">
                        <Product/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
