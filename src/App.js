import React, { Component } from 'react';
import Product from './components/product/product';
// import './styles/app.css';
import Ready from './ready';

class App extends Component {
    render() {
        return (
            <div>
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
