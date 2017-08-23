import React, {Component} from 'react';

import cardImage from '../../img/products/bio-broccoli.jpg';

class Product extends Component {
    render() {
        return (
            <div className="product">
                <div className="product-wrapper">
                    <figure className="product-image">
                        <div className="image-container">
                            <img src={cardImage} alt="AH Biologische broccoli" />
                        </div>
                    </figure>
                    <div className="product-title">AH Biologische broccoli</div>
                    <div className="product-meta"></div>
                </div>
            </div>
        );
    }
}

export default Product;
