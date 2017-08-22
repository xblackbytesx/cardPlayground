import React, { Component } from 'react';
import cardImage from './img/products/bio-broccoli.jpg';
import './styles/app.css';

class App extends Component {
  render() {
    return (
      <div className="card">
          <div className="card-content">
              <div className="card-image">
                  <img src={cardImage} alt="AH Biologische broccoli" />
              </div>
              <div className="card-title">AH Biologische broccoli</div>
          </div>
      </div>
    );
  }
}

export default App;
