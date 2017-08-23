import React, { Component } from 'react';
import Product from './components/product/product';
import './styles/app.css';

class App extends Component {
  render() {
    return (
        <div className="lane">
            <div className="card">
                <Product />
            </div>
        </div>
    );
  }
}

export default App;
