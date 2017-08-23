import React from 'react';
import ProgressBar from './ProgressBar';
import IsItReady from './IsItReady';
import Graph from './Graph';

const tooltipIcons = {
  passing: '\u2705',
  failingInDev: '\uD83D\uDEA7',
  failing: '\u274C',
};

const tooltipStatus = {
  passing: 'passing',
  failingInDev: 'passing, except dev-only behavior',
  failing: 'failing',
};

function Tooltip(props) {
  let contentStyle = {
    right: props.flip ? -15 : 'auto',
    left: props.flip ? 'auto' : -15
  };

  var statusRow = null;
  if (props.status) {
    let icon = tooltipIcons[props.status];
    let text = tooltipStatus[props.status];
    statusRow =
      <div className="TooltipStatus">
        <i>{icon}</i>
        {text}
      </div>;
  }

  return (
    <div className="Tooltip" style={{left: props.left, top: props.top}}>
      <div className="TooltipContent" style={contentStyle}>
        {props.content}
        {statusRow}
      </div>
    </div>
  );
}

class App extends React.Component {

  state = {
    tooltipData: null
  }

  handleMouseOver = (event, content, status) => {
    let rect = event.target.getBoundingClientRect();
    let left = Math.round(rect.left + (rect.width / 2) + window.scrollX);
    let top = Math.round(rect.top + window.scrollY);
    let flip = event.clientX > document.documentElement.clientWidth / 2;
    this.setState({tooltipData: {left, top, content, status, flip}});
  }

  handleMouseOut = (event) => {
    this.setState({tooltipData: null});
  }

  render() {
    let props = this.props;
    let tooltipData = this.state.tooltipData;
    let tooltip = tooltipData ? <Tooltip {...tooltipData} /> : null;

    return (
      <div>
        <ProgressBar data={props.mostRecent} />
        <IsItReady
          data={props.mostRecent}
          testData={props.testData}
        />
        <Graph
          width={props.width}
          graphData={props.graphData}
          onMouseOut={this.handleMouseOut}
          onMouseOver={this.handleMouseOver}
        />
        {tooltip}
      </div>
    );
  }

}

export default App;
