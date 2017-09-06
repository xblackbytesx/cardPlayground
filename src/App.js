import React, {Component} from 'react';
import Product from './components/product/product';
import ProductControleContainer from './containers/product.controls.container';
// import Controls from './components/controls/controls';
// import Ready from './ready/index';
import PlusButton from './components/controls/plus.button';
import MinButton from './components/controls/min.button';
import {Quantity} from './components/controls/quantity';

import MediaQuery from './utils/media-query';

class App extends Component {

    onChange = (event, params) =>  {
        console.log(event, params);
    };

    render() {
        return (
            <div>
                <ProductControleContainer onStateChange={this.onChange} quantity={10}>
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

                <MediaQuery>
                    {({
                        phablet,
                        desktop,
                        tablet
                    }) => (
                        <div>
                            {phablet && <div> phablet breakpoint...</div>}
                            {tablet && <div> tablet breakpoint...</div>}
                            {desktop && <div>desktop... breakpoint...</div>}
                        </div>
                    )}
                </MediaQuery>

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
