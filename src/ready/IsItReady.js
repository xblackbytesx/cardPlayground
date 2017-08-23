import React, { Component } from 'react';

class IsItReady extends Component {

  shouldComponentUpdate() {
    return false;
  }

  render() {
    let props = this.props;
    let data = props.data;
    let warnings = props.testData.failingInDev.split(/^\*/gm).length - 1;
    let decision = data.percent === 100 && warnings === 0;
    let passing = data.percent === 100 ? 'All' : data.percent + '% of';

    return decision ? (
      <div className="IsItReady">
        <h1 className="IsItReadyText">Yes<i>{'\ud83c\udf89'}</i></h1>
        <p className="IsItReadyYes">
          It is ready!
        </p>
      </div>
    ) : (
      <div className="IsItReady">
        <h1 className="IsItReadyText">No</h1>
        <p>
          {passing} tests are passing and it's out to 100%
          <i>{'\u2705'}</i>
        </p>
        <p className="IsItReadyDetails">
          {warnings === 1 ?
            'but there is still 1 warning left to fix' :
            `but there are still ${warnings} warnings left to fix`}
        </p>
      </div>
    );

  }
}

export default IsItReady;
